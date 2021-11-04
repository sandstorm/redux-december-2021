import { FC, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'
import { deletePost, Post } from '../../model/Post'
import './PostListingItem.scss'
import { RootState } from '../../store/configureStore'
import { selectors } from '../../store/posts/posts'
import { connect, ConnectedProps } from 'react-redux'

type OwnProps = {
  postId: Post['id']
  index: number
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    post: selectors.getPostById(state, ownProps),
  }
}

const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & OwnProps

const PostListingItem: FC<Props> = (props) => {
  const history = useHistory()

  const handleEditClick = useCallback(() => {
    history.push(`/edit/${props.postId}`)
  }, [props.postId, history])

  const handleDeleteClick = useCallback(() => {
    deletePost(props.postId).then(() => {
      history.push('/posts')
    })
  }, [props.postId, history])

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

export default connector(PostListingItem)
