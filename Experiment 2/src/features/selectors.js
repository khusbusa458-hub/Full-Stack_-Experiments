import { createSelector } from "reselect";
import { selectAllPosts } from "./postsSlice";

export const selectPublishedPosts = createSelector(
  [selectAllPosts],
  (posts) => posts.filter((post) => post.status === "Published")
);

export const selectDraftPosts = createSelector(
  [selectAllPosts],
  (posts) => posts.filter((post) => post.status === "Draft")
);