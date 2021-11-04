import { useEffect, useState } from 'react'
import PostListingItem from '../PostListingItem/PostListingItem'
import { createBlankPost, fetchPosts, Post } from '../../model/Post'
import { useLocation } from 'react-router-dom'
import './PostListing.scss'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/configureStore'
import { postSlice, selectors } from '../../store/posts/posts'

const mapStateToProps = (state: RootState) => {
  return {
    posts: selectors.getPosts(state),
    firstPost: selectors.getFirstPost(state),
  }
}

const mapDispatchToProps = {
  addPost: postSlice.actions.addPost,
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

  console.log({ firstPost: props.firstPost })

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
