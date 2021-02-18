import React from 'react'
import { InputError } from '@jasperdunn/react-form-hooks'

type InputTextProps = {
  name: string
  label: string
  type: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  error: InputError
}

export function InputText({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
}: InputTextProps): JSX.Element {
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
