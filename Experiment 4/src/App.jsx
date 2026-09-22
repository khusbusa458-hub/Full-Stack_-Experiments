import { useEffect, useRef, useState } from "react";
import Calendar from "./components/Calendar";
import PerformanceMonitor from "./components/PerformanceMonitor";
import PostForm from "./components/PostForm";
import "./App.css";

function App() {
  const renders = useRef(0);
  renders.current += 1;

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Design Review",
      start: "2026-09-07T10:00:00",
      end: "2026-09-07T11:00:00",
    },
    {
      id: "2",
      title: "Ship v2.3",
      start: "2026-09-08T14:00:00",
      end: "2026-09-08T15:00:00",
    },
    {
      id: "3",
      title: "1:1 with Sam",
      start: "2026-09-09T11:00:00",
      end: "2026-09-09T12:00:00",
    },
    {
      id: "4",
      title: "Write Proposal",
      start: "2026-09-10T13:00:00",
      end: "2026-09-10T14:00:00",
    },
    {
      id: "5",
      title: "Client Demo",
      start: "2026-09-11T15:00:00",
      end: "2026-09-11T16:00:00",
    },
    {
      id: "6",
      title: "Portfolio Review",
      start: "2026-09-12T10:00:00",
      end: "2026-09-12T11:00:00",
    },
    {
      id: "7",
      title: "Grocery Run",
      start: "2026-09-12T16:00:00",
      end: "2026-09-12T17:00:00",
    },
  ]);

  const [memoEnabled, setMemoEnabled] = useState(true);
  const [callbackEnabled, setCallbackEnabled] = useState(true);
  const [memoFilterEnabled, setMemoFilterEnabled] =
    useState(true);

  const [liveClock, setLiveClock] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  useEffect(() => {
    if (!liveClock) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [liveClock]);

  const resetCounters = () => {
    window.location.reload();
  };

  return (
    <div className="app">

      {/* HEADER */}
      <div className="header">
        <h1>Interactive Calendar</h1>

        <p>
          Drag events between days and toggle switches to see
          in real time what React.memo, useCallback, and useMemo
          do to rerenders.
        </p>

        {liveClock && (
          <div className="live-clock">
            🕒 {currentTime.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="controls">

        <label className="toggle-row">
          <span>React.memo on cards</span>

          <input
            type="checkbox"
            checked={memoEnabled}
            onChange={(e) =>
              setMemoEnabled(e.target.checked)
            }
          />
        </label>

        <label className="toggle-row">
          <span>useCallback for handlers</span>

          <input
            type="checkbox"
            checked={callbackEnabled}
            onChange={(e) =>
              setCallbackEnabled(e.target.checked)
            }
          />
        </label>

        <label className="toggle-row">
          <span>useMemo for agenda filter</span>

          <input
            type="checkbox"
            checked={memoFilterEnabled}
            onChange={(e) =>
              setMemoFilterEnabled(e.target.checked)
            }
          />
        </label>

        <label className="toggle-row">
          <span>Live clock</span>

          <input
            type="checkbox"
            checked={liveClock}
            onChange={(e) =>
              setLiveClock(e.target.checked)
            }
          />
        </label>

        <button
          className="reset-button"
          onClick={resetCounters}
        >
          Reset Counters
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-layout">

        {/* CALENDAR */}
        <div className="calendar-container">
          <Calendar
            events={events}
            setEvents={setEvents}
            memoEnabled={memoEnabled}
            callbackEnabled={callbackEnabled}
            memoFilterEnabled={memoFilterEnabled}
          />
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">

          {/* SCHEDULE POST */}
          <PostForm setEvents={setEvents} />

          {/* PERFORMANCE MONITOR */}
          <PerformanceMonitor
            renders={renders.current}
            eventCount={events.length}
            memoEnabled={memoEnabled}
            callbackEnabled={callbackEnabled}
            memoFilterEnabled={memoFilterEnabled}
          />

          {/* CURRENT STATUS */}
          <div className="performance-info">

            <p>
              React.memo:{" "}
              <strong>
                {memoEnabled ? "ON" : "OFF"}
              </strong>
            </p>

            <p>
              useCallback:{" "}
              <strong>
                {callbackEnabled ? "ON" : "OFF"}
              </strong>
            </p>

            <p>
              useMemo:{" "}
              <strong>
                {memoFilterEnabled ? "ON" : "OFF"}
              </strong>
            </p>

            <p>
              Live clock:{" "}
              <strong>
                {liveClock ? "ON" : "OFF"}
              </strong>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;