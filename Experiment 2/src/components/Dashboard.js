import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchPosts } from "../features/postsSlice";

import AddPost from "./AddPost";
import Analytics from "./Analytics";
import SearchBar from "./SearchBar";
import PostList from "./PostList";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1 className="title">Social Media Dashboard</h1>

      <Analytics />

      <div className="dashboard-content">
        <div className="left-panel">
          <AddPost />
        </div>

        <div className="right-panel">
          <SearchBar />
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;