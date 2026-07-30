import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/postsSlice";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector((state) =>
    Object.values(state.posts.entities || {})
  );

  const twitter = posts.filter((p) => p.platform === "Twitter");
  const linkedin = posts.filter((p) => p.platform === "LinkedIn");
  const facebook = posts.filter((p) => p.platform === "Facebook");
  const instagram = posts.filter((p) => p.platform === "Instagram");
  const drafts = posts.filter((p) => p.status === "Draft");

  const renderPosts = (title, list) => (
    <div className="group-card">
      <div className="group-header">
        <h3>{title}</h3>
        <span>{list.length}</span>
      </div>

      {list.length === 0 ? (
        <p className="empty">No posts available.</p>
      ) : (
        list.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-info">
              <h4>{post.title}</h4>

              <div className="badges">
                <span className="platform">{post.platform}</span>

                <span
                  className={
                    post.status === "Published"
                      ? "published"
                      : "draft"
                  }
                >
                  {post.status}
                </span>
              </div>
            </div>

            <div className="buttons">
              <button className="edit-btn">Edit</button>

              <button
                className="delete-btn"
                onClick={() => dispatch(deletePost(post.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="card">
      <h2 className="section-title">All Posts</h2>

      {renderPosts("Twitter Posts", twitter)}
      {renderPosts("LinkedIn Posts", linkedin)}
      {renderPosts("Instagram Posts", instagram)}
      {renderPosts("Facebook Posts", facebook)}
      {renderPosts("Draft Posts", drafts)}
    </div>
  );
}

export default PostList;