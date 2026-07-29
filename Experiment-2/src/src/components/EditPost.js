import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../features/postsSlice";
import { clearEditingPost } from "../features/uiSlice";

function EditPost() {
  const dispatch = useDispatch();

  const editingPost = useSelector((state) => state.ui.editingPost);

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setPlatform(editingPost.platform || "LinkedIn");
      setStatus(editingPost.status || "Draft");
    }
  }, [editingPost]);

  const handleSave = () => {
    if (!editingPost) {
      alert("Please select a post to edit.");
      return;
    }

    dispatch(
      updatePost({
        id: editingPost.id,
        title,
        platform,
        status,
        body: editingPost.body,
      })
    );

    dispatch(clearEditingPost());

    setTitle("");
    setPlatform("LinkedIn");
    setStatus("Draft");
  };

  const handleCancel = () => {
    dispatch(clearEditingPost());

    setTitle("");
    setPlatform("LinkedIn");
    setStatus("Draft");
  };

  return (
    <div className="card">
      <h2>Edit Post</h2>

      <label>Title</label>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>LinkedIn</option>
        <option>Twitter</option>
        <option>Instagram</option>
        <option>Facebook</option>
      </select>

      <label>Status</label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Draft</option>
        <option>Published</option>
      </select>

      <div className="button-group">
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPost;