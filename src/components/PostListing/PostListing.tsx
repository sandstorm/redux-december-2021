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
    fetchPosts(setPosts).finally(() => {
      setIsLoading(false)
    })
  }, [location.key])

  if (isLoading) {
    return <p>Loading Post...</p>
  }

  if (posts !== undefined) {
    return (
      <div className="post-listing">
        <header>
          <h1>PostBin</h1>
        </header>
        <main>
          <ul>
            {posts.map((post, index) => (
              <li key={post.id}>
                <PostListingItem post={post} index={index} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    )
  }

  return <p>Unable to load post!</p>
}

export default PostListing
