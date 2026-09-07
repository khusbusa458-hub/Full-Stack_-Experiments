import { memo, useMemo, useRef } from "react";

function EventCard({ title, time, memoEnabled, onSelect }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const eventLabel = useMemo(() => {
    return `${title} • ${time}`;
  }, [title, time]);

  return (
    <div
      className="event-card"
      onClick={() => onSelect(title)}
    >
      <div className="event-card-title">
        {title}
      </div>

      <div className="event-card-time">
        {memoEnabled ? eventLabel : `${title} • ${time}`}
      </div>

      <div className="event-card-status">
        {memoEnabled ? "React.memo + useMemo" : "Normal render"}
      </div>

      <div className="event-card-renders">
        Renders: {renderCount.current}
      </div>
    </div>
  );
}

export const MemoEventCard = memo(EventCard);

export default EventCard;