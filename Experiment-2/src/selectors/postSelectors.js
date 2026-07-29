import { createSelector } from "reselect";
import { selectAllPosts } from "../features/postsSlice";

// Basic Selectors
export const getPosts = (state) => selectAllPosts(state);
export const getLoading = (state) => state.posts.loading;
export const getError = (state) => state.posts.error;
export const getSearch = (state) => state.ui.search;

// Filter Posts using Search
export const selectFilteredPosts = createSelector(
  [getPosts, getSearch],
  (posts, search) => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }
);

// Short Posts
export const selectShortPosts = createSelector(
  [getPosts],
  (posts) => posts.filter((post) => post.body.length < 100)
);

// Long Posts
export const selectLongPosts = createSelector(
  [getPosts],
  (posts) => posts.filter((post) => post.body.length >= 100)
);

// Total Posts
export const selectTotalPosts = createSelector(
  [getPosts],
  (posts) => posts.length
);

// Average Post Length
export const selectAveragePostLength = createSelector(
  [getPosts],
  (posts) => {
    if (posts.length === 0) return 0;

    const totalLength = posts.reduce(
      (sum, post) => sum + post.body.length,
      0
    );

    return Math.round(totalLength / posts.length);
  }
);