import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { postReducer } from './posts/posts'
import { combineReducers } from '@reduxjs/toolkit'

export function configureStore() {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(combineReducers({ posts: postReducer }), undefined, composedEnhancers)

  return store
}
