import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../componants'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) setPosts(posts.documents)
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div style={{ width: '100%', padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <Container>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}>
            <span style={{ fontSize: '3rem' }}>✍</span>
            <h1 style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-text-primary)',
            }}>
              No posts yet
            </h1>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              maxWidth: '360px',
            }}>
              Log in to read and create amazing blog posts.
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="page-section">
      <Container>
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-8)',
        }}>
          Latest Posts
        </h1>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home