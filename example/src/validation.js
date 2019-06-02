export function required(value) {
  if (value === null || value === undefined || value === '') {
    return 'This field is required.'
  }
}

export function email(value) {
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

export function minLength(value, min) {
  if (value.length < min) {
    return `Please use ${min} or more characters.`
  }
}

export function alphanumeric(value) {
  if ((/[a-z]/.test(value) && /[0-9]/.test(value)) === false) {
    return 'Please use letters and numbers.'
  }
}

export function passwordsMatch(value1, value2) {
  if (value1 !== value2) {
    return "Passwords don't match"
  }
}
