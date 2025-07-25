import React from "react";
import PlatformCard from "./PlatformCard.jsx";
import "./Platform.css";
import { useNavigate } from "react-router-dom";


import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

const Platform = () => {
  const navigate = useNavigate();

  const openYoutubeAnalysis = ()=>{
      navigate("/platform/youtube");
  };

  return (
    <div className="sentiment-page">
      <h1 className="title">Social Media Sentiment Analysis</h1>
      <p className="subtitle">
        Harness the power of AI to understand your audience sentiment across multiple platforms
      </p>

      <div className="card-container">
        <PlatformCard
          platform="YouTube"
          title="Live comment analysis"
          description="Analyze comments using advanced sentiment analysis to understand audience emotions and engagement patterns."
          icon={<FaYoutube color="red" size="25px" />}
          onClickFunction={openYoutubeAnalysis}
          isLive={true}
          isComingSoon={false}
          buttonClass="red"
        />
        <PlatformCard
          platform="Twitter"
          title="Tweet sentiment tracking"
          description="Analyze comments using advanced sentiment analysis to understand audience emotions and engagement patterns."
          icon={<FaTwitter color="skyblue"  size="25px"  />}
          isLive={false}
          isComingSoon={true}
          buttonClass="blue"
        />
        <PlatformCard
          platform="Instagram"
          title="Post & story insights"
          description="Analyze comments using advanced sentiment analysis to understand audience emotions and engagement patterns."
          icon={<FaInstagram color="pink"  size="25px"  />}
          isLive={false}
          isComingSoon={true}
          buttonClass="gradient"
        />
      </div>
    </div>
  );
};

export default Platform;
