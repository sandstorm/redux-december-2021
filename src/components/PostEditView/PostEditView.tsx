import { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { fetchPost, Post, updatePost } from '../../model/Post'
import PostEditor from '../PostEditor/PostEditor'
import './PostEditView.scss'

const PostEditorView = () => {
  const { id } = useParams<{ id: Post['id'] }>()
  const [isLoading, setIsLoading] = useState(true)
  const [transientPost, setTransientPost] = useState<Post | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    fetchPost(id, setTransientPost).finally(() => {
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
          <PostEditor post={transientPost} onSave={updatePost} />
        </main>
      </div>
    )
  }

  return <Redirect to="/posts" />
}

export default PostEditorView
