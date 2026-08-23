import React, { useEffect, useState } from 'react'
import { PostForm } from '../componants'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost]  = useState(null)
    const { slug }         = useParams()
    const navigate         = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (!post) return null

    return (
        <div style={{
            width: '100%',
            padding: 'var(--space-10) var(--space-6)',
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Page header */}
                <div style={{ marginBottom: 'var(--space-8)' }}>
                    <h1 style={{
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--color-text-primary)',
                        lineHeight: 'var(--leading-tight)',
                        marginBottom: 'var(--space-2)',
                    }}>
                        Edit Post
                    </h1>
                    <p style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
                    }}>
                        Update and republish your article.
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
                    <PostForm post={post} />
                </div>
            </div>
        </div>
    )
}

export default EditPost