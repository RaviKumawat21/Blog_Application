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
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="page-section">
      <Container>
        {/* Featured image */}
        <div style={{
          width: '100%',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: 'var(--space-8)',
          position: 'relative',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            style={{ width: '100%', display: 'block', maxHeight: '480px', objectFit: 'cover' }}
          />

          {/* Author actions */}
          {isAuthor && (
            <div style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              display: 'flex',
              gap: 'var(--space-2)',
            }}>
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="success" size="sm">Edit</Button>
              </Link>
              <Button variant="danger" size="sm" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>

        {/* Post content */}
        <article style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-8)',
          }}>
            {post.title}
          </h1>

          <div style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
          }}
            className="browser-css"
          >
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  );
}