import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./components/Dashboard";
import { fetchPosts } from "./features/postsSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return <Dashboard />;
}

export default App;