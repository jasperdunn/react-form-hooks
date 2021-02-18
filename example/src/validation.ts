import { InputValue, InputError } from '@jasperdunn/react-form-hooks'

export function required(value: InputValue): InputError {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 0 ||
    value === false ||
    (typeof value === 'string' && value.length === 0)
  ) {
    return 'This field is required.'
  }
}

export function email(value: string): InputError {
  const errorMessage = 'Please enter a valid email address.'

  const lengthIsValid = value.length >= 1 && value.length <= 254

  if (!lengthIsValid) {
    return errorMessage
  }

  const looksLikeAnEmail = /^.+@.+\..+$/.test(value)
  if (!looksLikeAnEmail) {
    return errorMessage
  }
}

export function minLength(value: string, min: number): InputError {
  if (value.length < min) {
    return `Please use ${min} or more characters.`
  }
}

export function alphanumeric(value: string): InputError {
  if ((/[a-z]/.test(value) && /[0-9]/.test(value)) === false) {
    return 'Please use letters and numbers.'
  }
}

export function equals(
  value1: InputValue,
  value2: InputValue,
  errorMessage: InputError
): InputError {
  if (value1 !== value2) {
    return errorMessage
  }
}
