import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../model/Post'

type PostState = {
  byId: Record<Post['id'], Post>
  ids: Array<Post['id']>
}

const initialState: PostState = {
  byId: {},
  ids: [],
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload
      return {
        byId: {
          ...state.byId,
          [post.id]: post,
        },
        ids: [...state.ids, post.id],
      }
    },
  },
})

// Primitive
const getPosts = (state: { posts: PostState }) => state.posts.ids.map((id) => state.posts.byId[id])

// Memoized
const getFirstPost = createSelector([getPosts], (posts) => posts[0])

export const selectors = {
  getPosts,
  getFirstPost,
}
