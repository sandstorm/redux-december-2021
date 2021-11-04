import { useEffect } from 'react'
import PostListingItem from '../PostListingItem/PostListingItem'
import { createBlankPost } from '../../model/Post'
import './PostListing.scss'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/configureStore'
import { fetchPosts, postSlice, selectors } from '../../store/posts/posts'
import { selectors as postsLoadingSelectors } from '../../store/posts/loading'

const mapStateToProps = (state: RootState) => {
  return {
    postIds: selectors.getPostIds(state),
    firstPost: selectors.getFirstPost(state),
    postsLoading: postsLoadingSelectors.getPostsLoading(state),
  }
}

const mapDispatchToProps = {
  addPost: postSlice.actions.addPost,
  fetchPosts,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const PostListing = (props: Props) => {
  useEffect(() => {
    props.fetchPosts()

    // eslint-disable-next-line
  }, [])

  if (props.postsLoading) {
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
          {props.postIds.map((id, index) => (
            <li key={id}>
              <PostListingItem postId={id} index={index} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default connector(PostListing)
