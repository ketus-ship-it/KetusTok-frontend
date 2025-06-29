import React, { useRef, useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

function VideoEditor() {
  const [video, setVideo] = useState(null);
  const [music, setMusic] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef();

  const loadFFmpeg = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    await loadFFmpeg();

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video));
    ffmpeg.FS('writeFile', 'music.mp3', await fetchFile(music));

    await ffmpeg.run(
      '-i', 'input.mp4',
      '-i', 'music.mp3',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-shortest',
      'output.mp4'
    );

    const data = ffmpeg.FS('readFile', 'output.mp4');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    setOutput(url);
    setLoading(false);
  };

  return (
    <div>
      <h2>🎬 Montage Vidéo KetusTok</h2>
      <p>Sélectionne une vidéo et une musique :</p>

      <input type="file" accept="video/mp4" onChange={(e) => setVideo(e.target.files[0])} />
      <input type="file" accept="audio/mp3" onChange={(e) => setMusic(e.target.files[0])} />

      <button onClick={handleEdit} disabled={loading}>
        {loading ? 'Traitement...' : 'Fusionner Vidéo + Musique'}
      </button>

      {output && (
        <div>
          <h3>🎉 Vidéo Générée</h3>
          <video ref={videoRef} controls width="300" src={output}></video>
          <a href={output} download="montage.mp4">📥 Télécharger</a>
        </div>
      )}
    </div>
  );
}

export default VideoEditor;
