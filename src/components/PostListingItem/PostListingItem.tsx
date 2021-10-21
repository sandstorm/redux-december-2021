import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../model/Post'
import './PostListingItem.scss'

type PostListingItemProps = {
  post: Post
}

const PostListingItem: FC<PostListingItemProps> = (props) => {
  return (
    <div className="post-listing-item">
      <h2>{props.post.title}</h2>
      <p className="subtitle">{props.post.creationDate}</p>
      <article>{props.post.content}</article>
      <Link to={`/edit/${props.post.id}`}>edit</Link>
    </div>
  )
}

export default PostListingItem
