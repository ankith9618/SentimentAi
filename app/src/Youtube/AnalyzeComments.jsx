import React, { useState, useEffect } from "react";
import "./AnalyzeComments.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getComments, formatDateRelative } from '../Utilities/Utilityfunctions';


const AnalyzeComments = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    const [fetchedComments, setFetchedComments] = useState([]);

    const location = useLocation();
    const videoParams = new URLSearchParams(location.search);
    const videoId = videoParams.get("videoId") || null;
    const filter = videoParams.get("filter") || "Newest";
    const limit = parseInt(videoParams.get("limit") || "100");

    const fetchAllComments = async (videoId) => {
        const comments = await getComments(videoId, filter, limit);
        comments.forEach((item) => {
            item.lastUpdated = formatDateRelative(item.lastUpdated);
            item.sentiment = "all";
        });
        setFetchedComments((fetchedComments) => comments);
    };

    useEffect(() => {
        if (!videoId) {
            navigate("/youtube");
        } else {
            fetchAllComments(videoId);
        }
    }, [videoId]);


    const commentsToDisplay = activeTab === "all"
        ? fetchedComments
        : fetchedComments.filter(comment => comment.sentiment === activeTab);


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

                <div className="tab-buttons">
                    {["positive", "neutral", "negative", "all"].map((type) => (
                        <button
                            key={type}
                            className={`tab-button ${activeTab === type ? "active" : ""}`}
                            onClick={() => setActiveTab(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)} Comments
                        </button>
                    ))}
                </div>
            </div>

            <div className="right-panel">
                <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Comments</h3>
                <div className={`comments-count ${activeTab}`}>{commentsToDisplay.length}</div>
                <ul className="comment-list">
                    {commentsToDisplay.length === 0 ? (
                        <li>No comments to display</li>
                    ) : (
                        commentsToDisplay.map((comment, index) => {
                            if (!comment || typeof comment !== "object") {
                                console.warn("Invalid comment at index", index, comment);
                                return <li key={index}>[Invalid comment]</li>;
                            }

                            return (
                                <li key={index} className="comment-item">
                                    <div className="comment-content">
                                        <span className="comment-author">{comment.author|| 'N/A'}</span>
                                        <div className="comment-text">{comment.text ||'N/A'}</div>
                                    </div>
                                    <div className="comment-time">{comment?.lastUpdated || comment.publishedAt}</div>
                                </li>
                            );
                        })
                    )}
                </ul>

            </div>
        </div>
    );
};

export default AnalyzeComments;
