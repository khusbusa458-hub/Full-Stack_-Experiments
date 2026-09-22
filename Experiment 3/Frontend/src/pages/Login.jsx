import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login(username, password);

      console.log("Login successful:", data);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "editor") {
        navigate("/editor");
      } else if (data.user.role === "user") {
        navigate("/user");
      } else {
        setError("Unknown user role.");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #eef2ff, #f8fafc)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.10)",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "10px",
            }}
          >
            🔐
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            Secure Portal
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            JWT Authentication & RBAC
          </p>
        </div>


        <form onSubmit={handleLogin}>

          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "7px",
            }}
          >
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Enter username"
            autoComplete="username"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "9px",
              marginBottom: "18px",
              fontSize: "15px",
            }}
          />


          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "7px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            autoComplete="current-password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "9px",
              marginBottom: "20px",
              fontSize: "15px",
            }}
          />


          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              ⚠️ {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "9px",
              background: loading
                ? "#94a3b8"
                : "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>

        </form>


        <div
          style={{
            marginTop: "30px",
            padding: "18px",
            background: "#f8fafc",
            borderRadius: "10px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              fontSize: "15px",
            }}
          >
            Demo Accounts
          </h3>

          <p style={{ fontSize: "13px" }}>
            <strong>Admin:</strong> admin / admin123
          </p>

          <p style={{ fontSize: "13px" }}>
            <strong>Editor:</strong> editor / editor123
          </p>

          <p
            style={{
              fontSize: "13px",
              marginBottom: 0,
            }}
          >
            <strong>User:</strong> user / user123
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;