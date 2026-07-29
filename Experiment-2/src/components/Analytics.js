import React from "react";
import { useSelector } from "react-redux";

function Analytics() {
  const posts = useSelector((state) =>
    Object.values(state.posts.entities || {})
  );

  const total = posts.length;
  const published = posts.filter(
    (p) => p.status === "Published"
  ).length;
  const draft = posts.filter(
    (p) => p.status === "Draft"
  ).length;

  return (
    <div className="card">
      <h2>Posts Summary</h2>

      <p><strong>Total Posts:</strong> {total}</p>

      <p><strong>Published:</strong> {published}</p>

      <p><strong>Draft:</strong> {draft}</p>
    </div>
  );
}

export default Analytics;