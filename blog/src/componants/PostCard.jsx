import React, { useState } from 'react'
import appwriteServices from '../appwrite/config.js'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, featureImage, authorName, $createdAt }) {
  const imageId = featuredImage || featureImage;
  const imageUrl = imageId ? appwriteServices.getFileView(imageId) : null;
  const [imageError, setImageError] = useState(false);

  const formattedDate = $createdAt
    ? new Date($createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        }}
      >
        {/* Image / Thumbnail Container */}
        <div style={{
          width: '100%',
          height: '180px',
          overflow: 'hidden',
          background: 'var(--color-surface-raised)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}>
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              gap: 'var(--space-2)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Article</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div style={{
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}>
          <div>
            {(authorName || formattedDate) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-2)',
              }}>
                {authorName && <span>{authorName}</span>}
                {authorName && formattedDate && <span>•</span>}
                {formattedDate && <span>{formattedDate}</span>}
              </div>
            )}

            <h2 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--leading-tight)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              margin: 0,
            }}>
              {title}
            </h2>
          </div>

          <div style={{
            marginTop: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-primary)',
            fontWeight: 'var(--font-medium)',
          }}>
            <span>Read article</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard