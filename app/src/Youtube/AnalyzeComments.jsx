import React, { useState, useEffect } from "react";
import "./AnalyzeComments.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getComments, formatDateRelative } from "../Utilities/Utilityfunctions";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../Components/Loader.jsx";
import BarGraph from "../Components/BarGraph.jsx";

const TABS = ["positive", "neutral", "negative", "question", "all"];

const AnalyzeComments = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [categorizedComments, setCategorizedComments] = useState({
    all: [],
    positive: [],
    negative: [],
    neutral: [],
    question: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("auth") === "success") {
      const email = params.get("email");
      alert(`✅ Authorized as ${email}. Now you can post replies.`);
      window.history.replaceState({}, document.title, "/analyze-comments");
    }
  }, [location]);

  const videoParams = new URLSearchParams(location.search);
  const videoId = videoParams.get("videoId") || null;
  const filter = videoParams.get("filter") || "Newest";
  const limit = parseInt(videoParams.get("limit") || "100");

  const fetchAndCategorizeComments = async (videoId) => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          scope:
            "openid profile email https://www.googleapis.com/auth/youtube.force-ssl",
        },
      });

      const comments = await getComments(videoId, filter, limit, token);

      const categories = {
        all: [],
        positive: [],
        negative: [],
        neutral: [],
        question: [],
      };
      comments.forEach((comment) => {
        categories.all.push(comment);
        comment.lastUpdated = formatDateRelative(comment.lastUpdated);
        if (comment.tag && categories[comment.tag]) {
          categories[comment.tag].push(comment);
        }
      });

      setCategorizedComments(categories);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!videoId) {
      navigate("/youtube");
    } else {
      fetchAndCategorizeComments(videoId);
    }
  }, [videoId]);

  const commentsToDisplay = categorizedComments[activeTab] || [];

  // update reply text for each comment
  const handleReplyChange = (index, value) => {
    const newComments = [...commentsToDisplay];
    newComments[index].reply = value;

    setCategorizedComments({
      ...categorizedComments,
      [activeTab]: newComments,
    });
  };

  // post reply
  const handleReplyPost = async (comment, index) => {
    if (!comment.reply || !user?.email) {
      alert("Please type a reply and ensure you are logged in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/youtube/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          parentId: comment.commentId,
          text: comment.reply,
          userEmail: user.email,
          returnTo: window.location.href,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 401 && data.requiresGoogleAuth) {
        // redirect to Google OAuth
        window.location.href = data.authUrl;
        return;
      }

      if (res.ok) {
        alert("Reply posted ✅");
        handleReplyChange(index, "");
      } else {
        alert("Failed to post reply: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err.message);
      alert("Error posting reply");
    }
  };

  return (
    <div className="sentiment-container">
      <div className="left-panel">
        <div className="video-box">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </div>
        <div style={{ width: "450px", margin: "0 auto" }}>
          <h2>Sentiment Overview</h2>
          <BarGraph
            data={[
              { positive: categorizedComments.positive.length },
              { negative: categorizedComments.negative.length },
              { neutral: categorizedComments.neutral.length },
              { questions: categorizedComments.question.length },
              { all: categorizedComments.all.length },
            ]}
          />
        </div>
      </div>

      <div className="right-panel">
        <div className="tab-buttons">
          {TABS.map((type) => (
            <button
              key={type}
              className={`tab-button ${activeTab === type ? "active" : ""}`}
              onClick={() => setActiveTab(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <h3 className={`${activeTab}`}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Comments
        </h3>
        <div className={`comments-count ${activeTab}`}>
          {commentsToDisplay.length}
        </div>

        {isLoading ? (
          <div className="comments-loader">
            <Loader message="Please wait while we load the comments..." />
          </div>
        ) : (
          <ul className="comment-list">
            {commentsToDisplay.length === 0 ? (
              <li>No comments to display</li>
            ) : (
              commentsToDisplay.map((comment, index) => (
                <li key={index} className="comment-item">
                  <div className="comment-content">
                    <span className="comment-author">
                      {comment.author || "N/A"}
                    </span>
                    <div className="comment-text">{comment.text || "N/A"}</div>
                  </div>
                  <div className="comment-time">
                    {comment.lastUpdated || comment.publishedAt || "N/A"}
                  </div>

                  {/* Reply box */}
                  <div className="reply">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={comment.reply || ""}
                      onChange={(e) =>
                        handleReplyChange(index, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleReplyPost(comment, index)}
                      disabled={!comment.reply}
                    >
                      Reply
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnalyzeComments;
