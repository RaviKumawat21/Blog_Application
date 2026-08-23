import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input } from "./index.js";
import authService from "../appwrite/auth.js";
import Logo from "./Logo.jsx";

function Login() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data.email, data.password);
      if (session) {
        const userData = await authService.getCurrentuser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: 'var(--space-8) var(--space-4)',
    }}>
      <div className="auth-card">
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
          <Logo />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--space-2)',
        }}>
          Welcome back
        </h1>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
        }}>
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            style={{
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-medium)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-primary)'}
          >
            Sign up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: 'var(--color-danger-muted)',
            border: '1px solid var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            marginBottom: 'var(--space-5)',
          }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Please enter a valid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: true })}
          />
          <Button type="submit" variant="primary" full style={{ marginTop: 'var(--space-2)' }}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
