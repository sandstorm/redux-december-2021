import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { postsLoadingSlice } from './posts/loading'
import { postSlice } from './posts/posts'

const rootReducer = combineReducers({
  posts: postSlice.reducer,
  postsLoading: postsLoadingSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
