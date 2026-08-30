import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, authentication = true }) {
    const navigate    = useNavigate()
    const authStatus  = useSelector((state) => state.auth.status)
    const initialized = useSelector((state) => state.auth.initialized)

    useEffect(() => {
        // Wait until App.jsx has finished the session check before redirecting.
        // Without this guard, AuthLayout sees authStatus=false while the check
        // is still in flight and incorrectly redirects logged-in users to /login.
        if (!initialized) return;

        if (authentication && !authStatus) {
            // Protected route — user is not logged in → send to login
            navigate('/login')
        } else if (!authentication && authStatus) {
            // Guest-only route (login/signup) — user is already logged in → send home
            navigate('/')
        }
    }, [authStatus, initialized, navigate, authentication])

    // Show a minimal spinner while the session check is in progress
    if (!initialized) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-family)',
            }}>
                Loading…
            </div>
        )
    }

    return <>{children}</>
}