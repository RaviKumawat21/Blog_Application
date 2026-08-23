import React from 'react'
import { PostForm } from '../componants'

function AddPost() {
  return (
    <div style={{
      width: '100%',
      padding: 'var(--space-10) var(--space-6)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Page header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-2)',
          }}>
            Create New Post
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
          }}>
            Create and publish a new article to your blog.
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <PostForm />
        </div>
      </div>
    </div>
  )
}

export default AddPost