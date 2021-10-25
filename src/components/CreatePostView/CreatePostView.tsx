import { useMemo } from 'react'
import { createBlankPost, postPost } from '../../model/Post'
import PostEditor from '../PostEditor/PostEditor'

const CreatePostView = () => {
  const newPost = useMemo(() => createBlankPost(), [])

  return (
    <div className="post-editor-view">
      <header>
        <h1>Create Post</h1>
      </header>
      <main>
        <PostEditor post={newPost} onSave={postPost} />
      </main>
    </div>
  )
}

export default CreatePostView
