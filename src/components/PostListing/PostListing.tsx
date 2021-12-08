import { useEffect, useState } from 'react'
import PostListingItem from '../PostListingItem/PostListingItem'
import { fetchPosts, Post } from '../../model/Post'
import { useLocation } from 'react-router-dom'
import './PostListing.scss'

const PostListing = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Array<Post> | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    // create abort controller to cancel in-flight
    const abortController = new AbortController()
    
    fetchPosts(setPosts, abortController.signal).finally(() => {
      if (!abortController.signal.aborted) {
        setIsLoading(false)
      }
    })

    return () => {
      abortController.abort()
    }
  }, [location.key])

  if (isLoading) {
    return <p>Loading Posts...</p>
  }

  if (posts !== undefined) {
    return (
      <div className="post-listing">
        <header>
          <h1>PostBin</h1>
        </header>
        <main>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <PostListingItem post={post} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    )
  }

  return <p>Unable to load posts!</p>
}

export default PostListing
