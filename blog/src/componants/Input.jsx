import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props
}, ref) {
  const id = useId()
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        className={`input-field ${className}`}
        {...props}
      />
    </div>
  )
})

export default Input