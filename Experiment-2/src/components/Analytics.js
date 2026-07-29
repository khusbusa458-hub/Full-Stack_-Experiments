import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function Analytics() {
  const posts = useSelector((state) =>
    Object.values(state.posts.entities || {})
  );

  const summary = useMemo(() => {
  return {
    total: posts.length,
    published: posts.filter(
      (p) => p.status === "Published"
    ).length,
    draft: posts.filter(
      (p) => p.status === "Draft"
    ).length,
  };
}, [posts]);

  return (
    <div className="card">
      <h2>Posts Summary</h2>

      <p><strong>Total Posts:</strong> {summary.total}</p>

      <p><strong>Published:</strong> {summary.published}</p>

      <p><strong>Draft:</strong> {summary.draft}</p>
    </div>
  );
}

export default Analytics;