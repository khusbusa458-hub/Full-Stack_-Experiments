import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    return [
      {
        id: 1,
        title: "Launch the new profile template",
        body: "Update company profile with the latest branding.",
        platform: "LinkedIn",
        status: "Published",
      },
      {
        id: 2,
        title: "Draft a social media audit guide",
        body: "Prepare an audit guide for all social media accounts.",
        platform: "Twitter",
        status: "Draft",
      },
      {
        id: 3,
        title: "Share internship opportunities",
        body: "Publish internship opportunities for students.",
        platform: "Facebook",
        status: "Published",
      },
      {
        id: 4,
        title: "Weekly project update",
        body: "Post weekly progress report for the development team.",
        platform: "LinkedIn",
        status: "Draft",
      },
    ];
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: {
      reducer: postsAdapter.addOne,
      prepare(post) {
        return {
          payload: {
            id: Date.now(),
            ...post,
          },
        };
      },
    },

    updatePost(state, action) {
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },

    deletePost: postsAdapter.removeOne,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        postsAdapter.setAll(state, action.payload);
      })

      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to fetch posts";
      });
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;