import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
// API imports
import { query, mutate } from '../graphql/client';
import {
  GET_POST_QUERY,
  POSTS_QUERY,
  SEARCH_BLOGS_QUERY,
  SEARCH_TITLES_QUERY,
} from '../graphql/queries';
import {
  POST_MUTATION,
  REMOVE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from '../graphql/mutations';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const posts = await query('getAllPosts', POSTS_QUERY);

    return posts;
  } catch (error) {
    console.log(error);

    return;
  }
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  try {
    const post = await query('getPost', GET_POST_QUERY, {
      post: id,
    });

    return post;
  } catch (error) {
    console.log(error);

    return;
  }
});

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ post }, { rejectWithValue }) => {
    try {
      await mutate('updatePost', UPDATE_POST_MUTATION, {
        post: post,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ post }, { rejectWithValue }) => {
    try {
      await mutate('addPost', POST_MUTATION, { post });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (queryString) => {
    let result = [];

    try {
      const posts =
        (await query) <
        ('searchPosts',
        SEARCH_TITLES_QUERY,
        {
          post: queryString,
        });

      result = posts;
    } catch (error) {
      console.log(error);
    }

    return result;
  }
);

export const removePost = createAsyncThunk(
  'posts/deletePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      await mutate('RemovePost', REMOVE_POST_MUTATION, {
        post: postId,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const searchPostsByBlog = createAsyncThunk(
  'posts/searchPostsByBlogs',
  async (queryString) => {
    let result = [];

    try {
      const posts = await query('getBlogPost', SEARCH_BLOGS_QUERY, {
        blog: queryString,
      });

      result = posts;
    } catch (error) {
      console.log(error);
    }

    return result;
  }
);

export const initialState = {
  posts: [],
  loading: false,
  error: undefined,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(editPost.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(editPost.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(addPost.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addPost.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(searchPosts.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(searchPosts.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(searchPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(searchPostsByBlog.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(searchPostsByBlog.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(searchPostsByBlog.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const postsStateSelector = (state) => state.posts;

export const postsSelector = () =>
  createSelector(postsStateSelector, (state) => state.posts);

export const postsLoadingSelector = () =>
  createSelector(postsStateSelector, (state) => state.loading);

export default postsSlice.reducer;
