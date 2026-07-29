import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/uiSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.ui.search);

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
}

export default SearchBar;