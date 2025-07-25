import React, { useState } from 'react';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './YoutubeCommentsAnalyzer.css';
import VideoPreview from './VideoPreview';


const CommentsAnalyser = () => {
    const navigate = useNavigate();
    const [videoId, setVideoId] = useState('');
    const [filter, setFilter] = useState('');
    const [limit, setLimit] = useState('');
    const [darkMode, setDarkMode] = useState(true);

    const handleAnalyze = () => {
         navigate(`/platform/youtube/analyze?videoId=${videoId}&filter=${filter}&limit=${limit}`);
    };

    const extractVideoId = urlOrId => {
        try {
            const url = new URL(urlOrId);
            return url.searchParams.get('v');
        } catch {
            return urlOrId;
        }
    };

    return (
        <div className={`comments-page ${darkMode ? 'dark' : 'light'}`}>
            <div className="header">
                <h1>YouTube Comment Analyzer</h1>
            </div>

            <p className="subtitle">Extract and analyze YouTube comments with powerful filtering options</p>

            <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <div><FaSun color='yellow' /> Light Mode </div> : <div color="white"> <FaMoon /> Dark Mode</div>}
            </button>
            <div className="analyzer-card">
                <h2>YouTube Comment Analyzer</h2>
                <input
                    type="text"
                    placeholder="Enter YouTube URL or Video ID"
                    className="input"
                    value={videoId}
                    onChange={e => setVideoId(e.target.value)}
                />
                <div className="dropdowns">
                    <select className="dropdown" value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="time">Newest</option>
                        <option value="relevance">Popular</option>
                    </select>
                    <select className="dropdown" value={limit} onChange={e => setLimit(e.target.value)}>
                        <option value="">Select comment limit</option>
                        <option value="100">100 comments</option>
                        <option value="200">200 comments</option>
                        <option value="500" disabled>500 comments (Premium)</option>
                        <option value="1000" disabled>1000 comments (Premium)</option>
                    </select>
                </div>

                <VideoPreview videoId={videoId} />
                <button
                    className="analyze-btn"
                    disabled={!videoId || !limit}
                    onClick={handleAnalyze}
                >
                        Analyze Comments
                </button>
            </div>

        </div >
    );
};

export default CommentsAnalyser;
