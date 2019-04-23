/**
 * @description Updates the value of any type of form input.
 * @param {*} event
 * @param {*} setFormValues Function from the useFormValues hook
 */
export function updateInputValue(event, setFormValues) {
  const target = event.target
  const name = target.name
  const value = target.type === 'checkbox' ? target.checked : target.value

  setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
}

export function setFormValidationErrors(
  formValues,
  setFormErrors,
  formValidations
) {
  const inputsToValidate = Object.keys(formValidations)
  if (inputsToValidate.length === 0) {
    return
  }

  const updatedFormErrors = {}

  for (let i = 0; i < inputsToValidate.length; i++) {
    const inputName = inputsToValidate[i]
    updatedFormErrors[inputName] = validateInputValue(
      formValues[inputName],
      formValidations[inputName]
    )
  }

  setFormErrors({
    ...updatedFormErrors
  })

  return Object.values(updatedFormErrors).filter(value => value.length > 0)
    .length
}

export function setInputValidationErrors(
  event,
  setFormErrors,
  formValidations
) {
  const inputName = event.target.name

  if (!formValidations.hasOwnProperty(inputName)) {
    return
  }

  const inputValue = event.target.value

  setFormErrors(prevFormErrors => ({
    ...prevFormErrors,
    [inputName]: validateInputValue(inputValue, formValidations[inputName])
  }))
}

/**
 * @description Validates the input value via an array of validation functions
 * @param {*} inputValue value to validate
 * @param {Array} inputValidations validation functions
 * @returns {Array} validationErrors
 */
export function validateInputValue(inputValue, inputValidations) {
  const validationErrors = inputValidations
    .map(validate => validate(inputValue))
    .filter(error => error !== null && error !== undefined)

  return validationErrors
}

export function resetInputValue(inputName, setFormValues) {
  setFormValues(prevFormValues => ({ ...prevFormValues, [inputName]: '' }))
}

export function clearInputErrors(inputName, setFormErrors) {
  setFormErrors(prevFormErrors => ({
    ...prevFormErrors,
    [inputName]: []
  }))
}
