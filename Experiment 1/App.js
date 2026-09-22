import React, { useState } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [fileName, setFileName] = useState("");

  const limits = {
    Twitter: 280,
    Instagram: 2200,
    LinkedIn: 3000,
    Facebook: 5000,
  };

  const limit = limits[platform];
  const hashtags = (post.match(/#/g) || []).length;
  const remaining = limit - post.length;

  return (
    <div className="container">
      <h2>Dynamic Post Composer</h2>

      <textarea
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <br />
      <br />

      <label>Select Platform:</label>
      <br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
        <option>Facebook</option>
      </select>

      <br />
      <br />

      <label>Upload Media:</label>
      <br />

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
          }
        }}
      />

      {fileName && (
        <p className="file-name">
          <b>Selected File:</b> {fileName}
        </p>
      )}

      <hr />

      <div className="info">
        <p><b>Characters:</b> {post.length}/{limit}</p>
        <p><b>Remaining:</b> {remaining}</p>
        <p><b>Hashtags:</b> {hashtags}/5</p>
      </div>

      {post.length > limit ? (
        <p className="error">❌ Character limit exceeded!</p>
      ) : (
        <p className="success">✅ Character limit is valid.</p>
      )}

      {hashtags > 5 ? (
        <p className="warning">⚠ Too many hashtags!</p>
      ) : (
        <p className="success">✅ Hashtag count is valid.</p>
      )}

      <button disabled={post.length > limit}>
        Publish Post
      </button>
    </div>
  );
}

export default App;