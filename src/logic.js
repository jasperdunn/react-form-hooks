export function updateInputValue(event, setFormValues) {
  const target = event.target
  const name = target.name
  const value = target.type === 'checkbox' ? target.checked : target.value

  setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
}

export function validateForm(formValues, setFormErrors, formValidations) {
  const inputsToValidate = Object.keys(formValidations)
  if (inputsToValidate.length === 0) {
    return true
  }

  const updatedFormErrors = {}

  for (let i = 0; i < inputsToValidate.length; i++) {
    const inputName = inputsToValidate[i]
    updatedFormErrors[inputName] = getInputValidationErrors(
      formValues[inputName],
      formValidations[inputName]
    )
  }

  setFormErrors(updatedFormErrors)

  return (
    Object.values(updatedFormErrors).filter(value => value.length > 0)
      .length === 0
  )
}

export function validateInputValue(event, setFormErrors, formValidations) {
  const inputName = event.target.name

  if (!formValidations.hasOwnProperty(inputName)) {
    return
  }

  const inputValue = event.target.value

  setFormErrors(prevFormErrors => ({
    ...prevFormErrors,
    [inputName]: getInputValidationErrors(
      inputValue,
      formValidations[inputName]
    )
  }))
}

export function resetInputValue(name, setFormValues, initialFormValues) {
  const value = initialFormValues[name]

  setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
}

export function clearInputErrors(name, setFormErrors) {
  setFormErrors(prevFormErrors => ({
    ...prevFormErrors,
    [name]: []
  }))
}

function getInputValidationErrors(value, inputValidations) {
  const inputValidationErrors = inputValidations
    .map(validate => validate(value))
    .filter(error => error !== undefined)

  return inputValidationErrors
}
