import React from 'react'
import appwriteServices from '../appwrite/config.js'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <article
        className="card"
        style={{
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          background: 'var(--color-surface-raised)',
        }}>
          <img
            src={appwriteServices.getFilePreview(featuredImage)}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform var(--transition-slow)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Body */}
        <div style={{ padding: 'var(--space-4) var(--space-5)' }}>
          <h2 style={{
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-tight)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-primary)',
            marginTop: 'var(--space-3)',
            fontWeight: 'var(--font-medium)',
          }}>
            Read more →
          </p>
        </div>
      </article>
    </Link>
  )
}

export default PostCard