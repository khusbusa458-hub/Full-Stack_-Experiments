import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/postsSlice";
import platformsReducer from "../features/platformsSlice";
import uiReducer from "../features/uiSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer,
    ui: uiReducer,
  },
});