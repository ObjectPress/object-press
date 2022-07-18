import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query, mutate } from '../graphql/client';
import { BLOGS_QUERY } from '../graphql/queries';
import { REMOVE_BLOG_MUTATION, BLOG_MUTATION } from '../graphql/mutations';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (payload, { rejectWithValue }) => {
    try {
      const blogs = await query('getAllBlogs', BLOGS_QUERY, {});

      return blogs;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const removeBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      await mutate('RemoveBlog', REMOVE_BLOG_MUTATION, {
        blog: blogId,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async ({ blog }, { rejectWithValue }) => {
    try {
      (await mutate)('AddBlog', BLOG_MUTATION, {
        blog,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const initialState = {
  blogs: [],
  loading: false,
  error: undefined,
  fetched: false,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, { payload }) => {
      state.blogs = payload;
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(fetchBlogs.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(removeBlog.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(removeBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(removeBlog.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(createBlog.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(createBlog.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export const blogsStateSelector = (state) => state.blogs;

export const blogsSelector = () =>
  createSelector(blogsStateSelector, (state) => state.blogs);

export const blogsLoadingSelector = () =>
  createSelector(blogsStateSelector, (state) => state.loading);

export const blogsFetchedSelector = () =>
  createSelector(blogsStateSelector, (state) => state.fetched);

export default blogsSlice.reducer;
