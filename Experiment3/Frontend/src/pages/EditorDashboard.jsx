import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function EditorDashboard() {
  const { user, token, logout } = useAuth();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState("General");
  const [status, setStatus] = useState("Published");

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Unable to load posts:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPostCategory("General");
    setStatus("Published");
    setEditingPost(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const postData = {
      title,
      content,
      category: postCategory,
      status,
    };

    try {
      let response;

      if (editingPost) {
        response = await fetch(
          `http://localhost:5000/api/posts/${editingPost.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          }
        );
      } else {
        response = await fetch(
          "http://localhost:5000/api/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      alert(
        editingPost
          ? "Post updated successfully!"
          : "Post created successfully!"
      );

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setPostCategory(post.category || "General");
    setStatus(post.status || "Published");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category)),
  ];

  const filteredPosts = posts.filter((post) => {
    const searchMatch =
      post.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      post.content
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      post.category === category;

    return searchMatch && categoryMatch;
  });

  const publishedCount = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const draftCount = posts.filter(
    (post) => post.status === "Draft"
  ).length;

  return (
    <div className="editor-page">

      {/* HEADER */}

      <header className="editor-header">

        <div className="brand">
          <div className="brand-icon">✏️</div>

          <div>
            <h2>Secure Portal</h2>
            <span>Editor Workspace</span>
          </div>
        </div>

        <div className="header-right">

          <div className="profile">
            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user?.username}</strong>
              <small>Editor</small>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* HERO */}

      <section className="editor-hero">

        <div>
          <span className="eyebrow">
            ✏️ CONTENT CREATOR
          </span>

          <h1>
            Welcome, {user?.username}! 👋
          </h1>

          <p>
            Create, manage and publish engaging
            content for your portal.
          </p>

          <button
            className="create-main-btn"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Create New Post
          </button>
        </div>

        <div className="hero-icon">
          ✍️
        </div>

      </section>


      {/* STATISTICS */}

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon">📚</div>

          <div>
            <span>Total Posts</span>
            <strong>{posts.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🟢</div>

          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>

          <div>
            <span>Drafts</span>
            <strong>{draftCount}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔐</div>

          <div>
            <span>Permission</span>
            <strong>EDITOR</strong>
          </div>
        </div>

      </section>


      {/* CREATE / EDIT FORM */}

      {showForm && (

        <section className="composer">

          <div className="composer-header">

            <div>
              <span className="eyebrow">
                CONTENT EDITOR
              </span>

              <h2>
                {editingPost
                  ? "Edit Post"
                  : "Create New Post"}
              </h2>

              <p>
                {editingPost
                  ? "Update your existing content."
                  : "Create something valuable for your audience."}
              </p>
            </div>

            <button
              className="close-btn"
              onClick={resetForm}
            >
              ×
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="field">

                <label>Post Title</label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter an engaging title..."
                  maxLength="100"
                />

                <small>
                  {title.length}/100
                </small>

              </div>


              <div className="field">

                <label>Category</label>

                <select
                  value={postCategory}
                  onChange={(e) =>
                    setPostCategory(e.target.value)
                  }
                >
                  <option>General</option>
                  <option>Announcement</option>
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Events</option>
                  <option>News</option>
                </select>

              </div>

            </div>


            <div className="field">

              <label>Status</label>

              <div className="status-options">

                <label className="status-option">

                  <input
                    type="radio"
                    value="Published"
                    checked={status === "Published"}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  />

                  🟢 Published

                </label>

                <label className="status-option">

                  <input
                    type="radio"
                    value="Draft"
                    checked={status === "Draft"}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  />

                  📝 Draft

                </label>

              </div>

            </div>


            <div className="field">

              <label>Post Content</label>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="Write your content here..."
                maxLength="2000"
                rows="8"
              />

              <small>
                {content.length}/2000
              </small>

            </div>


            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="publish-btn"
              >
                {editingPost
                  ? "💾 Save Changes"
                  : "🚀 Publish Post"}
              </button>

            </div>

          </form>

        </section>

      )}


      {/* CONTENT LIBRARY */}

      <main className="content-area">

        <div className="content-heading">

          <div>
            <span className="eyebrow">
              CONTENT LIBRARY
            </span>

            <h2>Manage Your Content</h2>

            <p>
              Create and edit portal content.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchPosts}
          >
            🔄 Refresh
          </button>

        </div>


        {/* SEARCH */}

        <div className="toolbar">

          <div className="search-box">
            🔍

            <input
              placeholder="Search posts..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="category-buttons">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "category active"
                    : "category"
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        {/* POSTS */}

        {filteredPosts.length === 0 ? (

          <div className="empty">

            <div>📭</div>

            <h3>No posts found</h3>

            <p>
              Try another search or create a new post.
            </p>

          </div>

        ) : (

          <div className="post-grid">

            {filteredPosts.map((post) => (

              <article
                className="post-card"
                key={post.id}
              >

                <div className="post-top">

                  <span className="category-tag">
                    {post.category}
                  </span>

                  <span
                    className={
                      post.status === "Draft"
                        ? "draft"
                        : "published"
                    }
                  >
                    ● {post.status}
                  </span>

                </div>


                <h3>{post.title}</h3>

                <p>
                  {post.content.length > 150
                    ? post.content.substring(0, 150) + "..."
                    : post.content}
                </p>


                <div className="post-footer">

                  <span>
                    👤 {post.author}
                  </span>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      startEdit(post)
                    }
                  >
                    ✏️ Edit
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>


      {/* CSS */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .editor-page {
          min-height: 100vh;
          background: #f6f8fc;
          color: #172033;
          font-family: Arial, sans-serif;
        }

        .editor-header {
          height: 75px;
          background: white;
          border-bottom: 1px solid #e8ebf2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
        }

        .brand,
        .header-right,
        .profile {
          display: flex;
          align-items: center;
        }

        .brand {
          gap: 12px;
        }

        .brand-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #fff7ed;
          display: grid;
          place-items: center;
          font-size: 21px;
        }

        .brand h2 {
          margin: 0;
          font-size: 18px;
        }

        .brand span {
          color: #8992a5;
          font-size: 11px;
        }

        .header-right {
          gap: 20px;
        }

        .profile {
          gap: 9px;
        }

        .profile small {
          display: block;
          color: #8992a5;
          margin-top: 2px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ea580c;
          color: white;
          display: grid;
          place-items: center;
          font-weight: bold;
        }

        .logout-btn {
          border: none;
          background: #fee2e2;
          color: #dc2626;
          padding: 9px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .editor-hero {
          margin: 30px 5% 20px;
          padding: 35px;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            #7c2d12,
            #ea580c
          );
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .eyebrow {
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 1.5px;
          color: #ea580c;
        }

        .editor-hero .eyebrow {
          color: #fed7aa;
        }

        .editor-hero h1 {
          font-size: 32px;
          margin: 10px 0;
        }

        .editor-hero p {
          color: #ffedd5;
          margin-bottom: 22px;
        }

        .hero-icon {
          font-size: 70px;
        }

        .create-main-btn {
          border: none;
          background: white;
          color: #c2410c;
          padding: 12px 18px;
          border-radius: 9px;
          font-weight: bold;
          cursor: pointer;
        }

        .stats {
          margin: 0 5% 30px;
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 18px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e8ebf2;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .stat-icon {
          width: 45px;
          height: 45px;
          background: #fff7ed;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 20px;
        }

        .stat-card span {
          display: block;
          color: #8992a5;
          font-size: 12px;
        }

        .stat-card strong {
          display: block;
          margin-top: 5px;
          font-size: 18px;
        }

        .composer {
          margin: 0 5% 30px;
          background: white;
          border: 1px solid #e8ebf2;
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0,0,0,.05);
        }

        .composer-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .composer-header h2 {
          margin: 7px 0;
        }

        .composer-header p {
          color: #8992a5;
          margin: 0;
        }

        .close-btn {
          width: 35px;
          height: 35px;
          border: none;
          border-radius: 50%;
          background: #f1f5f9;
          font-size: 22px;
          cursor: pointer;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .field {
          margin-bottom: 20px;
        }

        .field label {
          display: block;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #dce1eb;
          border-radius: 9px;
          outline: none;
          font-family: inherit;
        }

        .field textarea {
          resize: vertical;
        }

        .field small {
          display: block;
          text-align: right;
          color: #9ca3af;
          margin-top: 5px;
        }

        .status-options {
          display: flex;
          gap: 15px;
        }

        .status-option {
          border: 1px solid #e0e5ee;
          padding: 10px 15px;
          border-radius: 9px;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .cancel-btn,
        .publish-btn {
          padding: 11px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .cancel-btn {
          background: white;
          border: 1px solid #dce1eb;
        }

        .publish-btn {
          border: none;
          background: #ea580c;
          color: white;
        }

        .content-area {
          margin: 0 5% 50px;
        }

        .content-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }

        .content-heading h2 {
          margin: 5px 0;
        }

        .content-heading p {
          color: #8992a5;
        }

        .refresh-btn {
          border: none;
          background: #ea580c;
          color: white;
          padding: 11px 17px;
          border-radius: 8px;
          cursor: pointer;
        }

        .toolbar {
          background: white;
          border: 1px solid #e8ebf2;
          border-radius: 13px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .search-box {
          display: flex;
          gap: 8px;
          border: 1px solid #dce1eb;
          padding: 10px;
          border-radius: 9px;
        }

        .search-box input {
          border: none;
          outline: none;
          width: 100%;
        }

        .category-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 13px;
        }

        .category {
          border: 1px solid #e0e5ee;
          background: white;
          padding: 7px 13px;
          border-radius: 20px;
          cursor: pointer;
        }

        .category.active {
          background: #ea580c;
          color: white;
          border-color: #ea580c;
        }

        .post-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 20px;
        }

        .post-card {
          background: white;
          border: 1px solid #e8ebf2;
          border-radius: 15px;
          padding: 22px;
          transition: .2s;
        }

        .post-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 10px 25px rgba(0,0,0,.07);
        }

        .post-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .category-tag {
          background: #fff7ed;
          color: #ea580c;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
        }

        .published {
          color: #16a34a;
          font-size: 10px;
          font-weight: bold;
        }

        .draft {
          color: #ca8a04;
          font-size: 10px;
          font-weight: bold;
        }

        .post-card h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }

        .post-card p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 13px;
          min-height: 65px;
        }

        .post-footer {
          border-top: 1px solid #edf0f5;
          padding-top: 14px;
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #8992a5;
        }

        .edit-btn {
          border: none;
          background: #fff7ed;
          color: #ea580c;
          padding: 7px 11px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
        }

        .empty {
          background: white;
          border: 1px solid #e8ebf2;
          border-radius: 15px;
          text-align: center;
          padding: 70px;
        }

        .empty div {
          font-size: 45px;
        }

        @media(max-width: 1000px) {
          .stats {
            grid-template-columns: 1fr 1fr;
          }

          .post-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media(max-width: 650px) {
          .stats,
          .post-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .hero-icon {
            display: none;
          }

          .profile {
            display: none;
          }
        }

      `}</style>

    </div>
  );
}

export default EditorDashboard;