import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import UserDashboard from "./pages/UserDashboard";

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function Unauthorized() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>403 - Access Denied</h1>
      <p>
        You do not have permission to access this page.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* EDITOR */}

        <Route
          path="/editor"
          element={
            <ProtectedRoute
              roles={["admin", "editor"]}
            >
              <EditorDashboard />
            </ProtectedRoute>
          }
        />

        {/* VIEWER */}

        <Route
          path="/user"
          element={
            <ProtectedRoute
              roles={[
                "admin",
                "editor",
                "user"
              ]}
            >
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* UNAUTHORIZED */}

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* DEFAULT */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;