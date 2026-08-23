import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
  options,
  label,
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
      <select
        id={id}
        ref={ref}
        className={`input-field ${className}`}
        style={{ cursor: 'pointer' }}
        {...props}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-primary)' }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select
