import { FC, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'
import { deletePost, Post } from '../../model/Post'
import './PostListingItem.scss'

type PostListingItemProps = {
  post: Post
  index: number
}

const PostListingItem: FC<PostListingItemProps> = (props) => {
  const history = useHistory()

  const handleEditClick = useCallback(() => {
    history.push(`/edit/${props.post.id}`)
  }, [props.post.id, history])

  const handleDeleteClick = useCallback(() => {
    deletePost(props.post.id).then(() => {
      history.push('/posts')
    })
  }, [props.post.id, history])

  return (
    <div className="post-listing-item">
      <h2>{props.post.title}</h2>
      <p className="subtitle">{props.post.creationDate}</p>
      <article>{props.post.content}</article>
      <div className="action-button-container">
        <button type="button" onClick={handleEditClick} title="edit post">
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button type="button" onClick={handleDeleteClick} title="delete post">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  )
}

export default PostListingItem
