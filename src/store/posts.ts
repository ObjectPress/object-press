import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { Post, PostState, NewPost, UpdatePost } from 'types';
// API imports
import { RootState } from './index';
import { query, mutate } from '../graphql/client';
import {
  GET_POST_QUERY,
  POSTS_QUERY,
  SEARCH_BLOGS_QUERY,
  SEARCH_TITLES_QUERY,
} from 'graphql/queries';
import {
  POST_MUTATION,
  REMOVE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from 'graphql/mutations';

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    try {
      const posts = await query<void, Post[]>(
        'getAllPosts',
        POSTS_QUERY,
        undefined
      );

      return posts;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }
);

export const fetchPost = createAsyncThunk<Post, string>(
  'posts/fetchPost',
  async (id) => {
    try {
      const post = await query<{ post: string }, Post>(
        'getPost',
        GET_POST_QUERY,
        {
          post: id,
        }
      );

      return post;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }
);

export const editPost = createAsyncThunk<
  void,
  { post: UpdatePost },
  { rejectValue: string }
>('posts/editPost', async ({ post }, { rejectWithValue }) => {
  try {
    await mutate<{ post: UpdatePost }, void>(
      'updatePost',
      UPDATE_POST_MUTATION,
      {
        post: post,
      }
    );
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const addPost = createAsyncThunk<
  void,
  { post: NewPost },
  { rejectValue: string }
>('posts/addPost', async ({ post }, { rejectWithValue }) => {
  try {
    await mutate<{ post: NewPost }, void>('addPost', POST_MUTATION, { post });
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const searchPosts = createAsyncThunk<Post[], string>(
  'posts/searchPosts',
  async (queryString) => {
    let result = [];

    try {
      const posts = await query<{ post: string }, Post[]>(
        'searchPosts',
        SEARCH_TITLES_QUERY,
        {
          post: queryString,
        }
      );

      result = posts;
    } catch (error) {
      console.log(error);
    }

    return result;
  }
);

export const removePost = createAsyncThunk<
  void,
  { postId: string },
  { rejectValue: string }
>('posts/deletePost', async ({ postId }, { rejectWithValue }) => {
  try {
    await mutate<{ post: string }, undefined>(
      'RemovePost',
      REMOVE_POST_MUTATION,
      {
        post: postId,
      }
    );
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const searchPostsByBlog = createAsyncThunk<Post[], string>(
  'posts/searchPostsByBlogs',
  async (queryString) => {
    let result = [];

    try {
      const posts = await query<{ blog: string }, Post[]>(
        'getBlogPost',
        SEARCH_BLOGS_QUERY,
        {
          blog: queryString,
        }
      );

      result = posts;
    } catch (error) {
      console.log(error);
    }

    return result;
  }
);

export const initialState: PostState = {
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

export const postsStateSelector = (state: RootState) => state.posts;

export const postsSelector = () =>
  createSelector(postsStateSelector, (state) => state.posts);

export const postsLoadingSelector = () =>
  createSelector(postsStateSelector, (state) => state.loading);

export default postsSlice.reducer;
