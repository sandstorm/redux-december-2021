import { createSlice } from '@reduxjs/toolkit'
import { fetchPosts } from './posts'

type PostLoadingState = boolean

const initialState: PostLoadingState = false

export const postsLoadingSlice = createSlice({
  name: 'postsLoading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (_state, _action) => true)
      .addCase(fetchPosts.fulfilled, (_state, _action) => false)
      .addCase(fetchPosts.rejected, (_state, _action) => false)
  },
})

const getPostsLoading = (state: { postsLoading: PostLoadingState }) => state.postsLoading

export const selectors = {
  getPostsLoading,
}
