import React, { useState } from "react";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase";

function UploadVideo({ onUploadComplete }) {
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!videoFile) {
      alert("Choisis un fichier vidéo !");
      return;
    }

    const storageRef = ref(storage, `videos/${videoFile.name}-${Date.now()}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        alert("Erreur upload: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(0);
          setVideoFile(null);
          onUploadComplete(downloadURL);
        });
      }
    );
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "rgba(255,255,255,0.1)",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!videoFile}>
        Upload
      </button>
      {progress > 0 && <p>Upload: {Math.round(progress)}%</p>}
    </div>
  );
}

export default UploadVideo;
