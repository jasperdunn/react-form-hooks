export function required(value) {
  if (value === null || value === undefined || value === '') {
    return 'This field is required.'
  }
}

export function email(value) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
    return 'Please enter a valid email address.'
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
