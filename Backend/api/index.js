import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { prompt } from "./prompt.js";
import cors from "cors";
import { expressjwt } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";



dotenv.config();
const app = express();
const port = 5000;

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://sentimentai-6281.web.app",
];
app.use(cors({
  origin: (origin, callback) => {
   
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const gemini = new GoogleGenAI(process.env.GEMINI_API_KEY);
const BASE_URL = "https://youtube.googleapis.com/youtube/v3";


const userTokens = new Map();


app.get("/auth/google", (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    `client_id=${client_id}` +
    `&redirect_uri=${redirect_uri}` +
    `&response_type=code` +
    `&scope=` +
    encodeURIComponent(
      "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload email profile"
    ) +
    `&access_type=offline` +
    `&prompt=consent select_account` +


    res.redirect(authUrl);
});


const checkJwt = expressjwt({
  secret: expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
  }),
  audience: "https://sentiment-analysis-api",
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

app.get("/protected", (req, res) => {
  res.json({ msg: "You accessed a protected endpoint!", user: req.auth });
});

app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const data = await tokenRes.json();

  if (!data.access_token) {
    return res.status(400).send("Failed to exchange code for tokens");
  }

  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${data.access_token}` }
  });
  const userInfo = await userInfoRes.json();
  const userEmail = userInfo.email;

  userTokens.set(userEmail, {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000
  });

  // console.log("Stored Tokens for", userEmail, ":", userTokens.get(userEmail));

  res.redirect(`https://sentimentai-6281.web.app/?auth=success&email=${encodeURIComponent(userEmail)}`);

});


async function getValidAccessToken(userEmail) {
  const tokens = userTokens.get(userEmail);
  if (!tokens) throw new Error("User not authenticated");

  if (Date.now() < tokens.expires_at - 60000) {
    return tokens.access_token;
  }

  const refreshRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token"
    })
  });

  const newData = await refreshRes.json();
  if (!newData.access_token) throw new Error("Failed to refresh token");

  userTokens.set(userEmail, {
    ...tokens,
    access_token: newData.access_token,
    expires_at: Date.now() + newData.expires_in * 1000
  });

  // console.log("🔄 Refreshed Access Token for", userEmail, ":", newData.access_token);
  return newData.access_token;
}




/**
 * Get comments
 */
async function getComments(videoId, filter, limit) {
  const MAX_COMMENTS = limit;
  const allComments = [];
  let pageToken = "";

  try {
    while (allComments.length < MAX_COMMENTS) {
      const url = `${BASE_URL}/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}&maxResults=100&pageToken=${pageToken}&textFormat=plainText`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        console.error("API Error:", data.error);
        break;
      }

      const comments = data.items.map((item) => {
        const snippet = item.snippet.topLevelComment.snippet;
        return {
          author: snippet.authorDisplayName,
          text: snippet.textDisplay,
          likes: snippet.likeCount,
          publishedAt: snippet.publishedAt,
          lastUpdated: snippet.updatedAt,
          commentId: item.snippet.topLevelComment.id,
        };
      });
      const remaining = MAX_COMMENTS - allComments.length;
      allComments.push(...comments.slice(0, remaining));

      if (!data.nextPageToken || allComments.length >= MAX_COMMENTS) {
        break;
      }

      pageToken = data.nextPageToken;
    }
    return allComments;
  } catch (error) {
    console.error("Fetch error:", error);
    return allComments;
  }
}

/**
 * Gemini call
 */
async function requestGemini(comments) {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt(comments),
  });
  return response.text;
}



app.post("/youtube/getComments", async (req, res) => {
  const { videoId, limit, filter } = req.body;
  if (!videoId || !limit || !filter)
    return res
      .status(400)
      .json({ error: "the parameters provided are not valid" });
  let comments = await getComments(videoId, filter, limit);
  return res.status(200).json({ comments });
});

app.post("/youtube/comments/response", async (req, res) => {
  try {
    const { videoId, limit, filter } = req.body;
    if (!videoId || !limit || !filter)
      return res
        .status(400)
        .json({ error: "the parameters provided are not valid" });

    let comments = await getComments(videoId, filter, limit);
    const data = await requestGemini(comments);

    let cleanedData = data
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const analyzedComments = JSON.parse(cleanedData);

    for (let i = 0; i < comments.length; i++) {
      comments[i].tag = analyzedComments[i].tag;
      comments[i].reply = analyzedComments[i].reply;
    }

    return res.status(200).json({ comments});
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
});

app.post("/youtube/reply", async (req, res) => {
  try {
    const { parentId, text, userEmail, returnTo } = req.body;
    if (!userEmail) return res.status(400).send("User email required");

    const tokens = userTokens.get(userEmail);

    if (!tokens) {
      const client_id = process.env.CLIENT_ID;
      const redirect_uri = process.env.REDIRECT_URI;
      const scope =
        "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload email profile";

      const authUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        `client_id=${client_id}` +
        `&redirect_uri=${redirect_uri}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(scope)}` +
        `&access_type=offline` +
        `&prompt=consent select_account` +
        (returnTo ? `&state=${encodeURIComponent(returnTo)}` : "");

      return res.status(401).json({
        requiresGoogleAuth: true,
        authUrl,
      });
    }

    const access_token = await getValidAccessToken(userEmail);

    const ytRes = await fetch(
      "https://www.googleapis.com/youtube/v3/comments?part=snippet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            parentId: parentId,
            textOriginal: text,
          },
        }),
      }
    );

    const data = await ytRes.json();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to post reply");
  }
});


app.listen(port, () => {
  console.log("App started at http://localhost:5000");
});
