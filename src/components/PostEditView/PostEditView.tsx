import { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Post } from '../../model/Post'
import PostEditor from '../PostEditor/PostEditor'

const fetchPosts = async (id: Post['id'], setTransientPost: (post?: Post) => void) => {
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

const PostEditorView = () => {
  const { id } = useParams<{ id: Post['id'] }>()
  const [isLoading, setIsLoading] = useState(true)
  const [transientPost, setTransientPost] = useState<Post | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    fetchPosts(id, setTransientPost).finally(() => {
      setIsLoading(false)
    })
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (transientPost !== undefined) {
    return (
      <div className="post-editor-view">
        <header>
          <h1>Edit Post</h1>
        </header>
        <main>
          <PostEditor post={transientPost} />
        </main>
      </div>
    )
  }

  return <Redirect to="/posts" />
}

export default PostEditorView
