import React from 'react'
import { string, func, arrayOf } from 'prop-types'

InputText.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  value: string,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  errors: arrayOf(string)
}

export default function InputText({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  errors
}) {
  return (
    <div style={{ margin: '20px 0' }}>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <br />
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
