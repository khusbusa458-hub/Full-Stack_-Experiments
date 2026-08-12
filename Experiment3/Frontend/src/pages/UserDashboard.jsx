import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function UserDashboard() {
  const { user, token, logout } = useAuth();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category)),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      post.content
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="viewer-page">

      {/* HEADER */}

      <header className="viewer-header">

        <div className="brand">
          <div className="brand-icon">🔐</div>

          <div>
            <h2>Secure Portal</h2>
            <span>Viewer Workspace</span>
          </div>
        </div>

        <div className="header-right">

          <div className="profile">
            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user?.username}</strong>
              <small>Viewer</small>
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

      <section className="viewer-hero">

        <div>

          <span className="eyebrow">
            👁 READ-ONLY ACCESS
          </span>

          <h1>
            Welcome, {user?.username}! 👋
          </h1>

          <p>
            Explore the latest published content
            from the Secure Portal.
          </p>

        </div>

        <div className="hero-icon">
          📚
        </div>

      </section>


      {/* STATS */}

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon">📚</div>

          <div>
            <span>Total Posts</span>
            <strong>{posts.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>

          <div>
            <span>Categories</span>
            <strong>
              {Math.max(categories.length - 1, 0)}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔐</div>

          <div>
            <span>Access</span>
            <strong>VIEW ONLY</strong>
          </div>
        </div>

      </section>


      {/* CONTENT */}

      <main className="content-area">

        <div className="content-heading">

          <div>
            <span className="eyebrow">
              CONTENT LIBRARY
            </span>

            <h2>Explore Posts</h2>

            <p>
              Read published content from the portal.
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
              type="text"
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

        {loading ? (

          <div className="empty">
            <div className="loading">
              ⏳
            </div>

            <h3>Loading posts...</h3>
          </div>

        ) : filteredPosts.length === 0 ? (

          <div className="empty">

            <div className="empty-icon">
              📭
            </div>

            <h3>No posts found</h3>

            <p>
              Try changing your search or category.
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

                  <span className="published">
                    ● Published
                  </span>

                </div>

                <h3>
                  {post.title}
                </h3>

                <p>
                  {post.content.length > 150
                    ? post.content.substring(0, 150) +
                      "..."
                    : post.content}
                </p>

                <div className="post-footer">

                  <span>
                    👤 {post.author}
                  </span>

                  <button
                    onClick={() =>
                      setSelectedPost(post)
                    }
                  >
                    Read More →
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>


      {/* MODAL */}

      {selectedPost && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedPost(null)
          }
        >

          <div
            className="post-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={() =>
                setSelectedPost(null)
              }
            >
              ×
            </button>

            <span className="category-tag">
              {selectedPost.category}
            </span>

            <h2>
              {selectedPost.title}
            </h2>

            <div className="modal-author">
              👤 Published by{" "}
              <strong>
                {selectedPost.author}
              </strong>
            </div>

            <p>
              {selectedPost.content}
            </p>

            <div className="read-only">
              👁 Viewer read-only mode
            </div>

          </div>

        </div>

      )}


      {/* CSS */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .viewer-page {
          min-height: 100vh;
          background: #f6f8fc;
          color: #172033;
          font-family: Arial, sans-serif;
        }

        .viewer-header {
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
          background: #eef2ff;
          display: grid;
          place-items: center;
          font-size: 21px;
        }

        .brand h2 {
          margin: 0;
          font-size: 18px;
        }

        .brand span {
          font-size: 11px;
          color: #8992a5;
        }

        .header-right {
          gap: 20px;
        }

        .profile {
          gap: 9px;
        }

        .profile small {
          display: block;
          color: #8a94a6;
          margin-top: 2px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #4f46e5;
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

        .viewer-hero {
          margin: 30px 5% 20px;
          padding: 35px;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            #312e81,
            #4f46e5
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
          color: #8b95ff;
        }

        .viewer-hero .eyebrow {
          color: #c7d2fe;
        }

        .viewer-hero h1 {
          font-size: 32px;
          margin: 10px 0;
        }

        .viewer-hero p {
          margin: 0;
          color: #dbeafe;
        }

        .hero-icon {
          font-size: 70px;
          opacity: .9;
        }

        .stats {
          margin: 0 5% 30px;
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 18px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e8ebf2;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stat-icon {
          width: 45px;
          height: 45px;
          background: #eef2ff;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 21px;
        }

        .stat-card span {
          display: block;
          color: #8992a5;
          font-size: 12px;
        }

        .stat-card strong {
          display: block;
          margin-top: 5px;
          font-size: 20px;
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
          font-size: 25px;
        }

        .content-heading p {
          margin: 0;
          color: #8992a5;
        }

        .refresh-btn {
          border: none;
          background: #4f46e5;
          color: white;
          padding: 11px 17px;
          border-radius: 8px;
          cursor: pointer;
        }

        .toolbar {
          background: white;
          padding: 16px;
          border: 1px solid #e8ebf2;
          border-radius: 13px;
          margin-bottom: 20px;
        }

        .search-box {
          border: 1px solid #dce1eb;
          border-radius: 9px;
          padding: 10px 13px;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .search-box input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
        }

        .category-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
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
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
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
          margin-bottom: 17px;
        }

        .category-tag {
          background: #eef2ff;
          color: #4f46e5;
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

        .post-card h3 {
          font-size: 18px;
          margin: 0 0 10px;
        }

        .post-card p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 13px;
          min-height: 65px;
        }

        .post-footer {
          border-top: 1px solid #edf0f5;
          margin-top: 18px;
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #8992a5;
        }

        .post-footer button {
          border: none;
          background: transparent;
          color: #4f46e5;
          font-weight: bold;
          cursor: pointer;
        }

        .empty {
          background: white;
          border-radius: 15px;
          text-align: center;
          padding: 70px;
          border: 1px solid #e8ebf2;
        }

        .empty-icon {
          font-size: 50px;
        }

        .loading {
          font-size: 40px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,.55);
          display: grid;
          place-items: center;
          padding: 20px;
          z-index: 100;
        }

        .post-modal {
          background: white;
          max-width: 650px;
          width: 100%;
          border-radius: 18px;
          padding: 35px;
          position: relative;
        }

        .post-modal h2 {
          font-size: 28px;
          margin: 18px 0 10px;
        }

        .post-modal p {
          color: #4b5563;
          line-height: 1.8;
          margin-top: 25px;
        }

        .modal-author {
          color: #8992a5;
          font-size: 13px;
        }

        .close-modal {
          position: absolute;
          right: 18px;
          top: 15px;
          border: none;
          background: #f1f5f9;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
        }

        .read-only {
          background: #f1f5f9;
          padding: 12px;
          border-radius: 8px;
          color: #64748b;
          font-size: 12px;
        }

        @media(max-width: 900px) {
          .post-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stats {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 600px) {
          .post-grid {
            grid-template-columns: 1fr;
          }

          .viewer-hero {
            padding: 25px;
          }

          .hero-icon {
            display: none;
          }

          .header-right .profile {
            display: none;
          }
        }

      `}</style>

    </div>
  );
}

export default UserDashboard;