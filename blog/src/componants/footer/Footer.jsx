import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const footerLinks = {
  Company: [
    { label: 'Features',          to: '/' },
    { label: 'Pricing',           to: '/' },
    { label: 'Affiliate Program', to: '/' },
    { label: 'Press Kit',         to: '/' },
  ],
  Support: [
    { label: 'Account',          to: '/' },
    { label: 'Help',             to: '/' },
    { label: 'Contact Us',       to: '/' },
    { label: 'Customer Support', to: '/' },
  ],
  Legals: [
    { label: 'Terms & Conditions', to: '/' },
    { label: 'Privacy Policy',     to: '/' },
    { label: 'Licensing',          to: '/' },
  ],
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--space-12) 0 var(--space-8)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 var(--space-6)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--space-10)',
          marginBottom: 'var(--space-10)',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <Logo />
            </div>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '260px',
            }}>
              A modern platform for sharing ideas and stories with the world.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="section-label">{title}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="link-hover" style={{ fontSize: 'var(--text-sm)' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Built with ❤️ using React & Appwrite
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer