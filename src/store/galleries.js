import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query, mutate } from '../graphql/client';
import { GALLERIES_QUERY, GALLERY_QUERY } from '../graphql/queries';
import {
  GALLERY_MUTATION,
  REMOVE_GALLERY_MUTATION,
} from '../graphql/mutations';

export const fetchGalleries = createAsyncThunk(
  'galleries/fetchGalleries',
  async (payload, { rejectWithValue }) => {
    try {
      const galleries = await query('getGalleryList', GALLERIES_QUERY, {});

      return galleries;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const fetchGallery = createAsyncThunk(
  'galleries/fetchGallery',
  async (gallery, { rejectWithValue }) => {
    try {
      const galleryData = await query('getGallery', GALLERY_QUERY, {
        gallery,
      });

      return galleryData;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createGallery = createAsyncThunk(
  'galleries/createGallery',
  async ({ gallery }, { rejectWithValue }) => {
    try {
      await mutate('addGallery', GALLERY_MUTATION, {
        gallery,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const removeGallery = createAsyncThunk(
  'galleries/removeGallery',
  async (gallery, { rejectWithValue }) => {
    try {
      await mutate('removeGallery', REMOVE_GALLERY_MUTATION, {
        gallery,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const initialState = {
  galleries: [],
  loading: false,
  error: undefined,
  fetched: false,
};

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGalleries.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchGalleries.fulfilled, (state, { payload }) => {
      state.galleries = payload;
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(fetchGalleries.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(fetchGallery.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchGallery.fulfilled, (state, { payload }) => {
      state.galleries = payload;
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(fetchGallery.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(createGallery.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createGallery.fulfilled, (state, { payload }) => {
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(createGallery.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export const galleriesStateSelector = (state) => state.galleries;

export const galleriesSelector = () =>
  createSelector(galleriesStateSelector, (state) => state.galleries);

export const galleriesLoadingSelector = () =>
  createSelector(galleriesStateSelector, (state) => state.loading);

export const galleriesFetchedSelector = () =>
  createSelector(galleriesStateSelector, (state) => state.fetched);

export default galleriesSlice.reducer;
