import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function PostManager() {
  const { user, token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState("Published");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API = "http://localhost:5000/api/posts";

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const isAdmin = user?.role === "admin";
  const canManage =
    user?.role === "admin" ||
    user?.role === "editor";

  const loadPosts = async () => {
    try {
      const response = await axios.get(API, {
        headers,
      });

      setPosts(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load posts."
      );
    }
  };

  useEffect(() => {
    if (token) {
      loadPosts();
    }
  }, [token]);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        posts.map(
          (post) => post.category || "General"
        )
      ),
    ];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        post.content
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ||
        post.status === filterStatus;

      const matchesCategory =
        filterCategory === "All" ||
        post.category === filterCategory;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    posts,
    search,
    filterStatus,
    filterCategory,
  ]);

  const publishedCount = posts.filter(
    (p) => p.status === "Published"
  ).length;

  const draftCount = posts.filter(
    (p) => p.status === "Draft"
  ).length;

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("General");
    setStatus("Published");
    setEditingId(null);
    setPreview(false);
  };

  const submitPost = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim() || !content.trim()) {
      setError(
        "Please enter both title and content."
      );
      return;
    }

    setLoading(true);

    const data = {
      title: title.trim(),
      content: content.trim(),
      category,
      status,
    };

    try {
      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          data,
          { headers }
        );

        setMessage(
          "Post updated successfully."
        );
      } else {
        await axios.post(API, data, {
          headers,
        });

        setMessage(
          "Post published successfully."
        );
      }

      resetForm();
      await loadPosts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Operation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const editPost = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category || "General");
    setStatus(post.status || "Published");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deletePost = async (id) => {
    if (!isAdmin) {
      setError(
        "Only administrators can delete posts."
      );
      return;
    }

    const confirmed = window.confirm(
      "Delete this post permanently?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API}/${id}`,
        { headers }
      );

      setMessage(
        "Post deleted successfully."
      );

      await loadPosts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete post."
      );
    }
  };

  return (
    <div className="cms">

      {/* HERO */}

      <section className="cms-hero">

        <div>

          <div className="cms-eyebrow">
            CONTENT MANAGEMENT
          </div>

          <h1>
            Create. Manage. Publish.
          </h1>

          <p>
            Build and manage high-quality
            content for your application.
          </p>

        </div>

        <div className="cms-user">

          <div className="cms-avatar">
            {user?.username
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>
              {user?.username}
            </strong>

            <span>
              {user?.role} access
            </span>
          </div>

        </div>

      </section>

      {/* STATISTICS */}

      <section className="cms-stats">

        <div className="cms-stat">
          <span>📚</span>

          <div>
            <small>Total Content</small>
            <strong>{posts.length}</strong>
          </div>
        </div>

        <div className="cms-stat">
          <span>🟢</span>

          <div>
            <small>Published</small>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="cms-stat">
          <span>📝</span>

          <div>
            <small>Drafts</small>
            <strong>{draftCount}</strong>
          </div>
        </div>

        <div className="cms-stat">
          <span>🛡️</span>

          <div>
            <small>Your Access</small>
            <strong>
              {user?.role === "admin"
                ? "Admin"
                : "Editor"}
            </strong>
          </div>
        </div>

      </section>

      {/* MESSAGES */}

      {message && (
        <div className="cms-success">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="cms-error">
          ⚠ {error}
        </div>
      )}

      {/* CREATOR */}

      {canManage && (

        <section className="cms-composer">

          <div className="cms-composer-header">

            <div>

              <span>
                {editingId
                  ? "EDIT CONTENT"
                  : "NEW CONTENT"}
              </span>

              <h2>
                {editingId
                  ? "Update your post"
                  : "Create a new post"}
              </h2>

            </div>

            {editingId && (
              <button
                className="cms-cancel-top"
                onClick={resetForm}
              >
                Cancel editing
              </button>
            )}

          </div>

          <form onSubmit={submitPost}>

            <div className="cms-title-area">

              <label>
                Post title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Write a powerful title..."
                maxLength={100}
              />

              <span>
                {title.length}/100
              </span>

            </div>

            <div className="cms-options">

              <div>
                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
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

              <div>
                <label>Publication status</label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option>
                    Published
                  </option>

                  <option>
                    Draft
                  </option>
                </select>
              </div>

            </div>

            <div className="cms-editor">

              <div className="cms-editor-toolbar">

                <span>
                  CONTENT EDITOR
                </span>

                <span>
                  {content.length}/2000
                </span>

              </div>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="Start writing your content here..."
                maxLength={2000}
              />

            </div>

            {/* PREVIEW */}

            {preview && (

              <div className="cms-preview">

                <div className="cms-preview-label">
                  LIVE PREVIEW
                </div>

                <span className="cms-preview-category">
                  {category}
                </span>

                <h2>
                  {title ||
                    "Your post title"}
                </h2>

                <p>
                  {content ||
                    "Your post content will appear here."}
                </p>

                <div className="cms-preview-footer">
                  <span>
                    👤 {user?.username}
                  </span>

                  <span>
                    {status}
                  </span>
                </div>

              </div>
            )}

            <div className="cms-actions">

              <button
                type="button"
                className="cms-preview-button"
                onClick={() =>
                  setPreview(!preview)
                }
              >
                👁{" "}
                {preview
                  ? "Hide Preview"
                  : "Preview"}
              </button>

              <button
                type="submit"
                className="cms-publish-button"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                    ? "✓ Update Post"
                    : "🚀 Publish Post"}
              </button>

            </div>

          </form>

        </section>

      )}

      {/* CONTENT LIBRARY */}

      <section className="cms-library">

        <div className="cms-library-header">

          <div>

            <span>
              CONTENT LIBRARY
            </span>

            <h2>
              Your Posts
            </h2>

          </div>

          <div className="cms-library-count">
            {filteredPosts.length} results
          </div>

        </div>

        {/* FILTERS */}

        <div className="cms-filters">

          <div className="cms-search">
            🔎

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search posts..."
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
          >
            <option>All</option>
            <option>Published</option>
            <option>Draft</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value)
            }
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

        </div>

        {/* POSTS */}

        <div className="cms-post-grid">

          {filteredPosts.length === 0 ? (

            <div className="cms-empty">
              <div>📭</div>
              <h3>No content found</h3>
              <p>
                Try changing your search or filters.
              </p>
            </div>

          ) : (

            filteredPosts.map((post) => (

              <article
                className="cms-post"
                key={post.id}
              >

                <div className="cms-post-top">

                  <span>
                    {post.category ||
                      "General"}
                  </span>

                  <b
                    className={
                      post.status === "Published"
                        ? "cms-published"
                        : "cms-draft"
                    }
                  >
                    {post.status}
                  </b>

                </div>

                <h3>
                  {post.title}
                </h3>

                <p>
                  {post.content}
                </p>

                <div className="cms-post-meta">

                  <div className="cms-author">

                    <div>
                      {post.author
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <span>

                      <strong>
                        {post.author}
                      </strong>

                      <small>
                        {post.authorRole}
                      </small>

                    </span>

                  </div>

                  <time>
                    {post.updatedAt
                      ? new Date(
                          post.updatedAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : ""}
                  </time>

                </div>

                <div className="cms-post-actions">

                  <button
                    onClick={() =>
                      editPost(post)
                    }
                  >
                    ✏ Edit
                  </button>

                  {isAdmin && (

                    <button
                      className="cms-delete"
                      onClick={() =>
                        deletePost(post.id)
                      }
                    >
                      🗑 Delete
                    </button>

                  )}

                </div>

              </article>

            ))

          )}

        </div>

      </section>

    </div>
  );
}

export default PostManager;