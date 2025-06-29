import React, { useEffect, useState } from "react";
import axios from "axios";

function Comments({ videoId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
    setComments(res.data);
  };

  const handlePost = async () => {
    await axios.post("http://localhost:5000/api/comments", {
      videoId,
      userUid: "demo-user", // ou auth.currentUser.uid
      text,
    });
    setText("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div style={{ background: "#222", color: "#fff", padding: "10px" }}>
      <h4>Commentaires</h4>
      <div>
        {comments.map((c, i) => (
          <p key={i}><strong>{c.userUid}</strong>: {c.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={text}
        placeholder="Commenter..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePost}>Envoyer</button>
    </div>
  );
}

export default Comments;
