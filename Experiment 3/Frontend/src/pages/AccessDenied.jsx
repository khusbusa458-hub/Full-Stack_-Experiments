import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div className="access-denied">
      <div className="denied-card">
        <div className="denied-icon">🔒</div>

        <h1>Access Denied</h1>

        <p>
          You do not have permission to access this page.
        </p>

        <Link to="/">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AccessDenied;