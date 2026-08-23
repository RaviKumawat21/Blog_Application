import React from 'react'

/**
 * Button — semantic variant system
 * variant: 'primary' | 'ghost' | 'danger' | 'success'
 * size:    'sm' | 'md' | 'lg'
 * full:    boolean — stretches to full width
 *
 * Legacy props bgColor / textColor still work for backward compat with PostForm.
 */
function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  full = false,
  // legacy props from PostForm
  bgColor,
  textColor,
  className = '',
  ...props
}) {
  // If legacy bgColor prop is passed, fall back to original inline style approach
  if (bgColor) {
    return (
      <button
        type={type}
        className={`btn ${full ? 'btn-full' : ''} ${className}`}
        style={{ background: bgColor.replace('bg-', ''), color: textColor ? textColor.replace('text-', '') : '#fff' }}
        {...props}
      >
        {children}
      </button>
    )
  }

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''
  const variantClass = `btn-${variant}`

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${full ? 'btn-full' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button