import { useEffect, useState } from 'react'
import PostListingItem from '../PostListingItem/PostListingItem'
import { Post } from '../../model/Post'
import './PostListing.scss'

const fetchPosts = async (setPosts: (posts: Array<Post>) => void) => {
  // should json validate here
  try {
    const posts = (await (await fetch('http://localhost:3007/posts')).json()) as Array<Post>

    setPosts(posts)
  } catch (e) {}
}

const PostListing = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Array<Post> | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    fetchPosts(setPosts).finally(() => {
      setIsLoading(false)
    })
  }, [])

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
            {posts.map((post) => (
              <li key={post.id}>
                <PostListingItem post={post} />
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
