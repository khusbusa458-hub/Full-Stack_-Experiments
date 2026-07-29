import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/postsSlice";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    const search = state.ui.search.toLowerCase();

    return Object.values(state.posts.entities || {}).filter((post) =>
      post.title.toLowerCase().includes(search)
    );
  });

  return (
    <div className="card">
      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div className="post-row" key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.platform}</p>
              <small>{post.status}</small>
            </div>

            <button
              className="delete-btn"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;