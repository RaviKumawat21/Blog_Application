import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate   = useNavigate()
  const location   = useLocation()

  const navItems = [
    { name: 'Home',      slug: '/',          active: true },
    { name: 'Login',     slug: '/login',     active: !authStatus },
    { name: 'Sign Up',   slug: '/signup',    active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus  },
    { name: 'Add Post',  slug: '/add-post',  active: authStatus  },
  ]

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(21, 24, 39, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <Container>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          height: 'var(--header-h)',
          gap: 'var(--space-4)',
        }}>
          {/* Logo */}
          <div style={{ flexShrink: 0, marginRight: 'var(--space-2)' }}>
            <Logo />
          </div>

          {/* Nav links */}
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            listStyle: 'none',
            marginLeft: 'auto',
          }}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`nav-btn ${location.pathname === item.slug ? 'nav-btn-active' : ''}`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li style={{ marginLeft: 'var(--space-2)' }}>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header