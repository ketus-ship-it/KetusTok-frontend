import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function ChatBox({ fromUid, toUid }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get(`http://localhost:5000/api/messages/${fromUid}/${toUid}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    const message = { from: fromUid, to: toUid, text };
    socket.emit("send_message", message);
    await axios.post("http://localhost:5000/api/messages", message);
    setText("");
  };

  useEffect(() => {
    fetchMessages();
    socket.on("receive_message", (msg) => {
      if ((msg.from === fromUid && msg.to === toUid) || (msg.from === toUid && msg.to === fromUid)) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receive_message");
  }, [fromUid, toUid]);

  return (
    <div style={{ background: "#eee", padding: "10px", borderRadius: "8px" }}>
      <h4>Chat avec {toUid}</h4>
      <div>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.from === fromUid ? "Moi" : "Lui"}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={text}
        placeholder="Message..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}

export default ChatBox;
