import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { postSlice } from './posts/posts'

const rootReducer = combineReducers({
  posts: postSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
