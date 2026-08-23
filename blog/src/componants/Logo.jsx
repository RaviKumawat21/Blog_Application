import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link
      to="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      <span style={{
        width: 34,
        height: 34,
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
        flexShrink: 0,
      }}>✍</span>
      <span style={{
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-bold)',
        color: 'var(--color-text-primary)',
        letterSpacing: '-0.02em',
      }}>
        Blog<span style={{ color: 'var(--color-primary)' }}>App</span>
      </span>
    </Link>
  )
}

export default Logo