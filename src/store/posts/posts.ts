import { AnyAction } from '@reduxjs/toolkit'
import { Post } from '../../model/Post'

type PostState = {
  byId: Record<Post['id'], Post>
  ids: Array<Post['id']>
}

const initialState: PostState = {
  byId: {},
  ids: [],
}

const ADD_POST = 'posts/addPost'
export const addPost = (post: Post) => ({
  payload: { post },
  type: ADD_POST,
})

type PostAction = ReturnType<typeof addPost>

export const postReducer = (state: PostState = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case ADD_POST: {
      const { post } = action.payload
      return {
        byId: {
          ...state.byId,
          [post.id]: post,
        },
        ids: [...state.ids, post.id],
      }
    }

    default: {
      return state
    }
  }
}
