import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: 1, name: "Facebook" },
    { id: 2, name: "Instagram" },
    { id: 3, name: "Twitter" },
    { id: 4, name: "LinkedIn" },
  ],
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,

  reducers: {
    addPlatform: (state, action) => {
      state.list.push(action.payload);
    },

    deletePlatform: (state, action) => {
      state.list = state.list.filter(
        (platform) => platform.id !== action.payload
      );
    },
  },
});

export const { addPlatform, deletePlatform } = platformsSlice.actions;

export default platformsSlice.reducer;