import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../model/Post'

type PostState = {
  byId: Record<Post['id'], Post>
  ids: Array<Post['id']>
}

const initialState: PostState = {
  byId: {},
  ids: [],
}

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const posts = (await (await fetch('http://localhost:3007/posts')).json()) as Array<Post>
  return posts
})

export const deletePost = createAsyncThunk('posts/delete', async (id: Post['id']) => {
  await fetch(`http://localhost:3007/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return { id }
})

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, _action) => state)
      .addCase(fetchPosts.fulfilled, (_state, action) => {
        const posts = action.payload
        const ids = posts.map((p) => p.id) as Array<Post['id']>

        return {
          ids,
          byId: posts.reduce(
            (acc, post) => ({
              ...acc,
              [post.id]: post,
            }),
            {}
          ),
        }
      })
      .addCase(fetchPosts.rejected, (state, _action) => state)
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload
        const { [id]: _, ...byId } = state.byId

        return {
          ids: state.ids.filter((postId) => postId !== id),
          byId,
        }
      })
  },
})

// Primitive
const getPosts = (state: { posts: PostState }) => state.posts.ids.map((id) => state.posts.byId[id])
const getPostIds = (state: { posts: PostState }) => state.posts.ids
const getPostById = (state: { posts: PostState }, props: { postId: Post['id'] }) => state.posts.byId[props.postId]

// Memoized
const getFirstPost = createSelector([getPosts], (posts) => posts[0])

export const selectors = {
  getPosts,
  getFirstPost,
  getPostById,
  getPostIds,
}
