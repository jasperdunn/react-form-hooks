import React from 'react'
import { string, func, arrayOf, shape, node } from 'prop-types'

InputRadioGroup.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  value: string,
  onChange: func.isRequired,
  options: arrayOf(
    shape({ label: string.isRequired, value: string.isRequired })
  ).isRequired,
  error: node,
}

export default function InputRadioGroup({
  name,
  label,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '6px' }}>{label}</div>
      <div style={{ marginLeft: '16px' }}>
        {options.map((option) => {
          return (
            <span key={option.value} style={{ marginRight: '6px' }}>
              <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
              <input
                id={`${name}-${option.value}`}
                name={name}
                type="radio"
                value={option.value}
                checked={option.value === value}
                onChange={onChange}
              />
            </span>
          )
        })}
      </div>
      {error && (
        <div
          style={{
            color: 'red',
            margin: '8px 0',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
