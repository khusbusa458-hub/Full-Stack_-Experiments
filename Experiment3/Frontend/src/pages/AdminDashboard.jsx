import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PostManager from "../components/PostManager";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState("dashboard");

  return (
    <div className="editor-portal">

      {/* SIDEBAR */}

      <aside className="editor-sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            🛡️
          </div>

          <div>
            <h2>SecurePortal</h2>
            <span>ADMIN CONSOLE</span>
          </div>

        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">

          <button
            className={
              active === "dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={
              active === "content"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("content")}
          >
            📝 Manage Content
          </button>

          <button
            className={
              active === "users"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("users")}
          >
            👥 Users & Roles
          </button>

          <button
            className={
              active === "security"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("security")}
          >
            🔐 Security
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="security-card">

            <div className="security-icon">
              🟢
            </div>

            <div>
              <strong>System Secure</strong>
              <span>JWT + RBAC active</span>
            </div>

          </div>

          <button
            className="sidebar-logout"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="editor-main">

        <header className="editor-topbar">

          <div>
            <span className="breadcrumb">
              PORTAL / ADMIN
            </span>

            <h1>
              {active === "dashboard"
                ? "Admin Dashboard"
                : active === "content"
                  ? "Content Management"
                  : active === "users"
                    ? "Users & Roles"
                    : "Security Center"}
            </h1>
          </div>

          <div className="topbar-user">

            <div className="notification">
              🔔
            </div>

            <div className="user-avatar">
              A
            </div>

            <div className="topbar-user-info">

              <strong>
                {user?.username}
              </strong>

              <span>
                🛡️ Administrator
              </span>

            </div>

          </div>

        </header>

        {/* DASHBOARD */}

        {active === "dashboard" && (

          <>

            <section className="editor-welcome">

              <div>

                <span>
                  ADMINISTRATOR ACCESS
                </span>

                <h2>
                  Welcome back, {user?.username} 👋
                </h2>

                <p>
                  You have full control over
                  content, users and system
                  permissions.
                </p>

              </div>

              <div className="welcome-illustration">
                🛡️
              </div>

            </section>

            <section className="stats-grid">

              <div className="stat-card">

                <div className="stat-icon blue">
                  📝
                </div>

                <div>
                  <span>Total Content</span>
                  <strong>2</strong>
                  <small>All system posts</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon green">
                  👥
                </div>

                <div>
                  <span>Users</span>
                  <strong>3</strong>
                  <small>Registered accounts</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon orange">
                  🔐
                </div>

                <div>
                  <span>Roles</span>
                  <strong>3</strong>
                  <small>Admin, Editor, User</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon purple">
                  🟢
                </div>

                <div>
                  <span>System Status</span>
                  <strong>Active</strong>
                  <small>All services running</small>
                </div>

              </div>

            </section>

            <section className="dashboard-grid">

              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <span>ADMIN TOOLS</span>

                    <h3>
                      Quick Actions
                    </h3>
                  </div>

                  <span>⚡</span>

                </div>

                <div className="quick-actions">

                  <button
                    onClick={() =>
                      setActive("content")
                    }
                  >

                    <div>📝</div>

                    <span>
                      <strong>
                        Create Content
                      </strong>

                      <small>
                        Publish a new post
                      </small>
                    </span>

                    <b>→</b>

                  </button>

                  <button
                    onClick={() =>
                      setActive("users")
                    }
                  >

                    <div>👥</div>

                    <span>
                      <strong>
                        Manage Users
                      </strong>

                      <small>
                        View users and roles
                      </small>
                    </span>

                    <b>→</b>

                  </button>

                  <button
                    onClick={() =>
                      setActive("security")
                    }
                  >

                    <div>🔐</div>

                    <span>
                      <strong>
                        Security Center
                      </strong>

                      <small>
                        Check authentication
                      </small>
                    </span>

                    <b>→</b>

                  </button>

                </div>

              </div>

              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <span>ACCESS CONTROL</span>

                    <h3>
                      Role Permissions
                    </h3>
                  </div>

                  <span>🛡️</span>

                </div>

                <div className="access-list">

                  <div>
                    <span>Administrator</span>
                    <strong>FULL ACCESS</strong>
                  </div>

                  <div>
                    <span>Editor</span>
                    <strong>CREATE / EDIT</strong>
                  </div>

                  <div>
                    <span>Viewer</span>
                    <strong>VIEW ONLY</strong>
                  </div>

                </div>

                <div className="permission-note">

                  <span>✓</span>

                  <p>
                    RBAC is active. Permissions
                    are enforced by the backend.
                  </p>

                </div>

              </div>

            </section>

          </>

        )}

        {/* CONTENT */}

        {active === "content" && (
          <PostManager />
        )}

        {/* USERS */}

        {active === "users" && (

          <section className="dashboard-card">

            <div className="card-header">

              <div>
                <span>ACCESS MANAGEMENT</span>

                <h3>
                  Users & Roles
                </h3>
              </div>

              <span>👥</span>

            </div>

            <div className="recent-posts">

              <div className="recent-post">

                <div className="recent-post-icon">
                  🛡️
                </div>

                <div className="recent-post-info">

                  <strong>admin</strong>

                  <span>
                    Administrator
                  </span>

                </div>

                <span className="published-badge">
                  FULL ACCESS
                </span>

              </div>

              <div className="recent-post">

                <div className="recent-post-icon">
                  ✏️
                </div>

                <div className="recent-post-info">

                  <strong>editor</strong>

                  <span>
                    Content Editor
                  </span>

                </div>

                <span className="published-badge">
                  EDIT ACCESS
                </span>

              </div>

              <div className="recent-post">

                <div className="recent-post-icon">
                  👤
                </div>

                <div className="recent-post-info">

                  <strong>user</strong>

                  <span>
                    Viewer
                  </span>

                </div>

                <span className="draft-badge">
                  VIEW ONLY
                </span>

              </div>

            </div>

          </section>

        )}

        {/* SECURITY */}

        {active === "security" && (

          <section className="dashboard-card">

            <div className="card-header">

              <div>
                <span>SECURITY CENTER</span>

                <h3>
                  Authentication & Authorization
                </h3>
              </div>

              <span>🔐</span>

            </div>

            <div className="report-grid">

              <div>
                <strong>✓</strong>
                <span>JWT Authentication</span>
              </div>

              <div>
                <strong>✓</strong>
                <span>RBAC Authorization</span>
              </div>

              <div>
                <strong>✓</strong>
                <span>Protected Routes</span>
              </div>

              <div>
                <strong>✓</strong>
                <span>Role Validation</span>
              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default AdminDashboard;