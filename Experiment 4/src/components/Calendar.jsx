import { useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventCard, { MemoEventCard } from "./EventCard";

function Calendar({
  events,
  setEvents,
  memoEnabled,
  callbackEnabled,
  memoFilterEnabled,
}) {
  /*
   * useMemo demonstration:
   * When enabled, the processed event list is memoized.
   * When disabled, it is recalculated on every render.
   */
  const processedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });
  }, [events]);

  const displayEvents = memoFilterEnabled
    ? processedEvents
    : [...events].sort((a, b) => {
        return new Date(a.start) - new Date(b.start);
      });

  /*
   * useCallback demonstration:
   * Stable handlers are created when useCallback is enabled.
   */
  const memoizedSelectHandler = useCallback((title) => {
    alert(`Selected event: ${title}`);
  }, []);

  const memoizedDropHandler = useCallback(
    (info) => {
      setEvents((previousEvents) =>
        previousEvents.map((event) => {
          if (event.id === info.event.id) {
            return {
              ...event,
              start: info.event.start,
              end: info.event.end,
            };
          }

          return event;
        })
      );

      alert(`${info.event.title} was moved successfully.`);
    },
    [setEvents]
  );

  const memoizedClickHandler = useCallback((info) => {
    alert(`Selected event: ${info.event.title}`);
  }, []);

  const handleEventClick = callbackEnabled
    ? memoizedClickHandler
    : (info) => {
        alert(`Selected event: ${info.event.title}`);
      };

  const handleEventDrop = callbackEnabled
    ? memoizedDropHandler
    : (info) => {
        setEvents((previousEvents) =>
          previousEvents.map((event) => {
            if (event.id === info.event.id) {
              return {
                ...event,
                start: info.event.start,
                end: info.event.end,
              };
            }

            return event;
          })
        );

        alert(`${info.event.title} was moved successfully.`);
      };

  const renderEventContent = (eventInfo) => {
    const event = eventInfo.event;

    const time = event.start
      ? event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    const CardComponent = memoEnabled
      ? MemoEventCard
      : EventCard;

    const selectHandler = callbackEnabled
      ? memoizedSelectHandler
      : (title) => {
          alert(`Selected event: ${title}`);
        };

    return (
      <CardComponent
        title={event.title}
        time={time}
        memoEnabled={memoEnabled}
        onSelect={selectHandler}
      />
    );
  };

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
      ]}
      initialView="timeGridWeek"
      initialDate="2026-09-07"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      editable={true}
      selectable={true}
      eventResizableFromStart={true}
      height="700px"
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      allDaySlot={false}
      events={displayEvents}
      eventClick={handleEventClick}
      eventDrop={handleEventDrop}
      eventContent={renderEventContent}
    />
  );
}

export default Calendar;