import { useState } from "react";

function PostForm({ setEvents }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: title,
      start: `${date}T${time}`,
    };

    setEvents((previousEvents) => [
      ...previousEvents,
      newEvent,
    ]);

    alert(`"${title}" scheduled successfully.`);

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <div className="post-form">
      <h2>Schedule New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit">
          Schedule Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;