import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addPost({
        title,
        body,
        platform,
        status,
      })
    );

    setTitle("");
    setBody("");
    setPlatform("LinkedIn");
    setStatus("Draft");
  };

  return (
    <div className="card">
      <h2>Add New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter Post Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="4"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="LinkedIn">LinkedIn</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Twitter">Twitter</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <button type="submit" className="save-btn">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;