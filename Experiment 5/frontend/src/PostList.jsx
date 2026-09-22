import React, { useState } from 'react';

const WORD_LIMITS = {
  Twitter: 50,
  Instagram: 100,
  Facebook: 200
};

const PostList = ({ posts, onDelete, onUpdate, onError }) => {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleEditClick = (post) => {
    setEditingId(post.id);
    setEditContent(post.content);
    if (onError) onError(null);
  };

  const handleSaveClick = (id, platform) => {
    const trimmed = editContent.trim();
    if (!trimmed) {
      if (onError) onError("Post content cannot be empty.");
      return;
    }
    const limit = WORD_LIMITS[platform];
    const words = countWords(trimmed);
    if (limit && words > limit) {
      if (onError) onError(`Word limit reached for ${platform}! Maximum allowed is ${limit} words.`);
      return;
    }
    if (onError) onError(null);
    onUpdate(id, { platform, content: trimmed });
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    if (onError) onError(null);
  };

  if (posts.length === 0) {
    return <div className="no-posts">No posts yet. Start composing!</div>;
  }

  return (
    <div className="post-list">
      <h2>Recent Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <span className={`platform-badge ${post.platform.toLowerCase()}`}>
              {post.platform}
            </span>
            <div className="post-actions">
              {editingId === post.id ? (
                <>
                  <button className="action-btn save" onClick={() => handleSaveClick(post.id, post.platform)}>Save</button>
                  <button className="action-btn cancel" onClick={handleCancelClick}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="action-btn edit" onClick={() => handleEditClick(post)}>Edit</button>
                  <button className="action-btn delete" onClick={() => onDelete(post.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
          
          <div className="post-body">
            {editingId === post.id ? (
              <textarea 
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="4"
                className="edit-textarea"
              />
            ) : (
              <p>{post.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
