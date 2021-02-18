import React from 'react'
import { InputError } from '@jasperdunn/react-form-hooks'

type InputRadioGroupProps = {
  name: string
  label: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  options: { label: string; value: string }[]
  error: InputError
}

export function InputRadioGroup({
  name,
  label,
  value,
  onChange,
  options,
  error,
}: InputRadioGroupProps): JSX.Element {
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
