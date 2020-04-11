import React from 'react'
import { string, func, node } from 'prop-types'

InputText.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  value: string,
  onChange: func.isRequired,
  onBlur: func,
  error: node,
}

export default function InputText({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div style={{ margin: '20px 0' }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        id={name}
        data-testid={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && (
        <>
          <br />
          <div
            data-testid={`${name}-error`}
            style={{
              color: 'red',
              margin: '8px 0',
              padding: 0,
              listStyle: 'none',
            }}
          >
            {error}
          </div>
        </>
      )}
    </div>
  )
}
