import React from 'react'
import { string, func, arrayOf, shape } from 'prop-types'

InputRadioGroup.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  value: string,
  onChange: func.isRequired,
  options: arrayOf(
    shape({ label: string.isRequired, value: string.isRequired })
  ).isRequired,
  errors: arrayOf(string)
}

export default function InputRadioGroup({
  id,
  label,
  value,
  onChange,
  options,
  errors
}) {
  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '6px' }}>{label}</div>
      <div style={{ marginLeft: '16px' }}>
        {options.map(option => {
          return (
            <span key={option.value} style={{ marginRight: '6px' }}>
              <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
              <input
                id={`${id}-${option.value}`}
                name={id}
                type="radio"
                value={option.value}
                checked={option.value === value}
                onChange={onChange}
              />
            </span>
          )
        })}
      </div>
      {errors && errors.length > 0 && (
        <ul
          style={{
            color: 'red',
            margin: '8px 0',
            padding: 0,
            listStyle: 'none'
          }}
        >
          {errors.map((error, index) => (
            <li key={index}>- {error}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
