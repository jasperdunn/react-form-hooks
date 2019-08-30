import React from 'react'
import { string, func, arrayOf } from 'prop-types'

InputText.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  value: string,
  onChange: func.isRequired,
  onBlur: func,
  errors: arrayOf(string)
}

export default function InputText({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  errors
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
      <br />
      {errors && errors.length > 0 && (
        <ul
          data-testid={`${name}-errors`}
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
