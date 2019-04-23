export function submit(event, setFormValidationErrors, formValues) {
  event.preventDefault()

  const numberOfFieldErrors = setFormValidationErrors(formValues)
  if (numberOfFieldErrors > 0) {
    return
  }
  signIn()
}

function signIn() {
  alert('Validation successful!')
}
