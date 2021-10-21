import { v4 as uuid } from 'uuid'

export type Post = {
  id: string
  content: string
  title: string
  creationDate: string
}

export const createBlankPost = (): Post => ({
  id: uuid(),
  creationDate: new Date().toISOString(),
  title: '',
  content: '',
})
