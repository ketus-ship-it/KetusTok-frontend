import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import VideoCard from "./components/VideoCard";
import UploadVideo from "./components/UploadVideo";
import ChatBox from "./components/ChatBox";
import VideoEditor from './components/VideoEditor';
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([
    {
      username: "ketusvibes",
      caption: "Regarde ce move 🔥",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      username: "herbflow",
      caption: "Mon remix maison 🎶",
      src: "https://www.w3schools.com/html/movie.mp4",
    },
     {
    _id: "111", // simulé
    username: "ketusvibes",
    caption: "Regarde ce move 🔥",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  ]);

useEffect(() => {
  const fetchFeed = async () => {
    const res = await axios.get(`http://localhost:5000/api/feed/${user.uid}`);
    setVideos(res.data);
  };
  if (user) fetchFeed();
}, [user]);



  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Erreur lors de la connexion : " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const addVideo = (videoURL) => {
    const newVideo = {
      username: user.displayName,
      caption: "Nouvelle vidéo uploadée 🎉",
      src: videoURL,
    };
    setVideos((prev) => [newVideo, ...prev]);
  };



  if (!user) {
    return (
      <div className="loginPage">
        <h2>Bienvenue sur KetusTok</h2>
        <button onClick={handleLogin}>Se connecter avec Google</button>
      </div>
    );
  }


  return (
    <div className="App">
       <h2>KetusTok - Messagerie Privée</h2>
<h1>KetusTok 🎥</h1>
      <VideoEditor />
      {/* Simule deux utilisateurs pour le test */}
      <ChatBox fromUid="ketus123" toUid="ami456" />
      <Header user={user} onLogout={handleLogout} />
      <UploadVideo onUploadComplete={addVideo} />
      <main className="videoFeed">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            username={video.username}
            caption={video.caption}
            src={video.src}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
