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

export const postReducer = (state: PostState = initialState, action: AnyAction) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}
