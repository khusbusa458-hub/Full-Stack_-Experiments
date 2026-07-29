import React from "react";
import AddPost from "./AddPost";
import SearchBar from "./SearchBar";
import Analytics from "./Analytics";
import PostList from "./PostList";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Social Media Dashboard</h1>

      <div className="top-grid">

        <div>
          <AddPost />
        </div>

        <div>
          <Analytics />
        </div>

      </div>

      <SearchBar />

      <PostList />

    </div>
  );
}

export default Dashboard;