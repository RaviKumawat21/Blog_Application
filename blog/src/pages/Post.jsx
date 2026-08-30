import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../componants";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug }        = useParams();
  const navigate        = useNavigate();
  const userData        = useSelector((state) => state.auth.userData);
  const isAuthor        = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          if (post.featuredImage) appwriteService.deleteFile(post.featuredImage);
          navigate('/');
        }
      });
    }
  };

  if (!post) return null;

  const imageUrl = post.featuredImage
    ? appwriteService.getFileView(post.featuredImage)
    : null;

  // Format date from Appwrite's $createdAt
  const formattedDate = post.$createdAt
    ? new Date(post.$createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div style={{
      width: '100%',
      padding: 'var(--space-8) var(--space-4)',
      minHeight: 'calc(100vh - 160px)',
    }}>
      <Container>
        {/* ── Max-width content wrapper ───────────────────────────────── */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>

          {/* ── Back Navigation ─────────────────────────────────────────── */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <Link
              to="/all-posts"
              style={{
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                fontWeight: 'var(--font-semibold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to posts
            </Link>
          </div>

          {/* ── Featured image ──────────────────────────────────────────── */}
          {imageUrl && (
            <div style={{
              width: '100%',
              maxHeight: '300px',
              height: 'auto',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: 'var(--space-8)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={imageUrl}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'contain',
                  background: 'rgba(0, 0, 0, 0.25)',
                  display: 'block',
                }}
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* ── Post header: title + meta + actions ─────────────────────── */}
          <header style={{ marginBottom: 'var(--space-8)' }}>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-text-primary)',
              lineHeight: '1.2',
              marginBottom: 'var(--space-5)',
              letterSpacing: '-0.025em',
            }}>
              {post.title}
            </h1>

            {/* Author / Date row + Edit/Delete */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              paddingBottom: 'var(--space-6)',
              borderBottom: '1px solid var(--color-border)',
            }}>

              {/* Author info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                {/* Clean avatar */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}>
                  {(post.authorName || (isAuthor && userData?.name) || 'Author')[0].toUpperCase()}
                </div>

                <div>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                    lineHeight: 1.25,
                  }}>
                    {post.authorName || (isAuthor ? userData?.name : 'Community Author')}
                  </p>
                  {formattedDate && (
                    <p style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      margin: '2px 0 0 0',
                    }}>
                      Published on {formattedDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Edit / Delete — only for author */}
              {isAuthor && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </header>

          {/* ── Article body ────────────────────────────────────────────── */}
          <article
            className="browser-css"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1.0625rem',
              lineHeight: '1.85',
              paddingBottom: 'var(--space-12)',
              letterSpacing: '0.01em',
            }}
          >
            {parse(post.content)}
          </article>

        </div>
      </Container>
    </div>
  );
}