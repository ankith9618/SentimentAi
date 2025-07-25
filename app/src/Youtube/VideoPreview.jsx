import React from "react";
import "./VideoPreview.css";

const VideoPreview = ({ videoId, width = "350", height = "200" }) => {
  if (!videoId) return <p>No video ID provided</p>;

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-preview" >
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

export default VideoPreview;
