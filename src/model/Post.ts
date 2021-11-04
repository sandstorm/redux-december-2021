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

export const fetchPost = async (id: Post['id'], setTransientPost: (post?: Post) => void) => {
  try {
    const response = await fetch(`http://localhost:3007/posts/${id}`)

    if (response.status < 400) {
      const post = (await response.json()) as Post
      setTransientPost(post)
    }
  } catch (e) {
    console.error(e)
  }
}

export const updatePost = async (post: Post) => {
  try {
    const response = await fetch(`http://localhost:3007/posts/${post.id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })

    console.log(response)
  } catch (e) {}
}

export const postPost = async (post: Post) => {
  try {
    const response = await fetch('http://localhost:3007/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })

    console.log(response)
  } catch (e) {}
}

export const deletePost = async (postId: Post['id']) => {
  try {
    const response = await fetch(`http://localhost:3007/posts/${postId}`, {
      method: 'DELETE',
    })

    console.log(response)
  } catch (e) {}
}
