import { useEffect, useState } from 'react'
import PostListingItem from '../PostListingItem/PostListingItem'
import { createBlankPost, fetchPosts, Post } from '../../model/Post'
import { useLocation } from 'react-router-dom'
import './PostListing.scss'
import { RootState } from '../..'
import { addPost } from '../../store/posts/posts'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: RootState) => {
  const { posts } = state
  return {
    posts: posts.ids.map((id) => posts.byId[id]),
  }
}

const mapDispatchToProps = {
  addPost,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const PostListing = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Array<Post> | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    fetchPosts(setPosts).finally(() => {
      setIsLoading(false)
    })
  }, [location.key])

  if (isLoading) {
    return <p>Loading Post...</p>
  }

  return (
    <div className="post-listing">
      <header>
        <h1>PostBin</h1>
      </header>
      <main>
        <button onClick={() => props.addPost(createBlankPost())}>Add post</button>
        <ul>
          {props.posts.map((post, index) => (
            <li key={post.id}>
              <PostListingItem post={post} index={index} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default connector(PostListing)
