import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/uiSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.ui.search);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <select>
        <option>All Platforms</option>
        <option>LinkedIn</option>
        <option>Twitter</option>
        <option>Facebook</option>
        <option>Instagram</option>
      </select>

      <select>
        <option>All Status</option>
        <option>Published</option>
        <option>Draft</option>
      </select>

      <select>
        <option>Sort by Title</option>
        <option>Sort by Platform</option>
        <option>Sort by Status</option>
      </select>

      <button
        className="reset-btn"
        onClick={() => dispatch(setSearch(""))}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default SearchBar;