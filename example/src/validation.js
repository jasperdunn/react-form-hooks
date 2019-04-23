export function required(value) {
  return value === null || value === undefined || value === ''
    ? 'This field is required.'
    : null
}

export function email(value) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false
    ? 'Please enter a valid email address.'
    : null
}

export function minLength(value, min) {
  return value.length < min ? `Please use ${min} or more characters.` : null
}

export function alphanumeric(value) {
  return !(/[a-z]/.test(value) && /[0-9]/.test(value))
    ? 'Please use letters and numbers.'
    : null
}

export function passwordsMatch(value1, value2) {
  return value1 !== value2 ? "Passwords don't match" : null
}
