import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../componants'
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents)
    })
  }, [])

  return (
    <div className="page-section">
      <Container>
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-8)',
        }}>
          All Posts
        </h1>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
            No posts found.
          </p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts