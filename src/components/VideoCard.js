import React, { useRef } from "react";
import "./VideoCard.css";
import axios from "axios";

function VideoCard({ username, caption, src }) {
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  
};

const handleFollow = async () => {
  await axios.post("http://localhost:5000/api/follow", {
    followerUid: user.uid,
    targetUid: videoOwnerUid,
  });
  alert("Abonnement mis à jour !");
};

// ... dans le composant
const handleLike = async () => {
  await axios.post(`http://localhost:5000/api/videos/${videoId}/like`, {
    uid: "demo-user", // ou auth.currentUser.uid
  });
  alert("Like mis à jour !");

};


  return (
    <div className="videoCard" onClick={handleVideoClick}>
      <video ref={videoRef} src={src} loop autoPlay muted className="video" />
      <div className="videoCard__info">
        <h4>@{username}</h4>
        <p>{caption}</p>
      </div>
      <div className="videoCard__actions">
        <button>❤️</button>
        <button onClick={() => alert("Commente !")}>💬</button>
        <button>🔗</button>
      </div>
    </div>
  );
}

<Comments videoId={videoId} />


export default VideoCard; 
