import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  theme: "light",
  editingPost: null,
  filter: "All",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },

    toggleTheme(state) {
      state.theme =
        state.theme === "light" ? "dark" : "light";
    },

    setEditingPost(state, action) {
      state.editingPost = action.payload;
    },

    clearEditingPost(state) {
      state.editingPost = null;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const {
  setSearch,
  toggleTheme,
  setEditingPost,
  clearEditingPost,
  setFilter,
} = uiSlice.actions;

export default uiSlice.reducer;