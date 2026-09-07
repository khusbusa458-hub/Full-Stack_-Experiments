function PerformanceMonitor({
  renders,
  eventCount,
  memoEnabled,
  callbackEnabled,
  memoFilterEnabled,
}) {
  return (
    <div className="performance-monitor">
      <h2>Render Monitor</h2>

      <div className="render-stats">
        <div className="stat-card">
          <span className="stat-number">
            {renders}
          </span>

          <span className="stat-label">
            Total Renders
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-number">
            {eventCount}
          </span>

          <span className="stat-label">
            Event Cards
          </span>
        </div>
      </div>

      <div className="optimization-status">
        <h3>Optimization Status</h3>

        <div className="status-row">
          <span>Component</span>
          <strong>
            {memoEnabled ? "Optimized" : "Non-optimized"}
          </strong>
        </div>

        <div className="status-row">
          <span>Function</span>
          <strong>
            {callbackEnabled ? "Optimized" : "Non-optimized"}
          </strong>
        </div>

        <div className="status-row">
          <span>Return Value</span>
          <strong>
            {memoFilterEnabled ? "Optimized" : "Non-optimized"}
          </strong>
        </div>
      </div>

      <div className="rerender-info">
        <h3>Re-render Monitoring</h3>

        <p>
          Total re-renders: <strong>{renders}</strong>
        </p>

        <p>
          Cards monitored: <strong>{eventCount}</strong>
        </p>

        <p>
          React.memo:{" "}
          <strong>{memoEnabled ? "ON" : "OFF"}</strong>
        </p>

        <p>
          useCallback:{" "}
          <strong>{callbackEnabled ? "ON" : "OFF"}</strong>
        </p>

        <p>
          useMemo:{" "}
          <strong>
            {memoFilterEnabled ? "ON" : "OFF"}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default PerformanceMonitor;