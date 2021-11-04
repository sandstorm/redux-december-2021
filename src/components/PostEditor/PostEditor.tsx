import { ChangeEvent, FormEvent, MouseEvent, FC, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Post } from '../../model/Post'
import './PostEditor.scss'

type PostEditorProps = {
  post: Post
  onSave: (post: Post) => void
}

const PostEditor: FC<PostEditorProps> = (props) => {
  const history = useHistory()
  const [title, setTitle] = useState(props.post.title)
  const [content, setContent] = useState(props.post.content)

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    },
    [setTitle]
  )

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value)
    },
    [setContent]
  )

  const handleCancelClick = useCallback(() => {
    history.push('/posts')
  }, [history])

  const handleSaveClick = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    props.onSave({
      ...props.post,
      title,
      content,
    })

    history.push('/posts')
  }

  return (
    <form className="post-editor" onSubmit={handleSaveClick}>
      <label htmlFor="title">title</label>
      <input id="title" title="title" value={title} onChange={handleTitleChange} />
      <label htmlFor="content">content</label>
      <textarea title="content" value={content} onChange={handleContentChange} rows={10} />
      <button type="button" title="cancel" onClick={handleCancelClick}>
        CANCEL
      </button>
      <button type="submit" title="save" onClick={handleSaveClick}>
        SAVE
      </button>
    </form>
  )
}

export default PostEditor
