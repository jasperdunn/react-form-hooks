export function setInputValue(input, value, setFormValues) {
  let name = input
  let newValue = value

  if (input.nativeEvent && input.nativeEvent instanceof Event) {
    name = input.target.name
    const target = input.target
    newValue = target.type === 'checkbox' ? target.checked : target.value
  }

  setFormValues(prevFormValues => ({ ...prevFormValues, [name]: newValue }))
}

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

export function validateInputValue(
  input,
  value,
  setFormErrors,
  formValidations
) {
  let inputName = input
  let inputValue = value

  if (input.nativeEvent && input.nativeEvent instanceof Event) {
    inputName = input.target.name
    inputValue = input.target.value
  }

  if (!formValidations.hasOwnProperty(inputName)) {
    return false
  }

  const errors = getInputValidationErrors(
      inputValue,
      formValidations[inputName]
    )

  setFormErrors(prevFormErrors => ({
    ...prevFormErrors,
    [inputName]: errors
  }))

  return errors.length === 0
}

export function resetInputValue(name, setFormValues, initialFormValues) {
  const value = initialFormValues[name]

  setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
}

export function clearInputErrors(input, setFormErrors) {
  const name = typeof input === 'string' ? input : input.target.name

  setFormErrors(prevFormErrors => ({
    ...prevFormErrors,
    [name]: []
  }))
}

export function getInitialFormErrors(formValidations) {
  const formInputNames = Object.keys(formValidations)
  const initialFormErrors = {}

  for (let a = 0; a < formInputNames.length; a++) {
    initialFormErrors[formInputNames[a]] = []
  }

  return initialFormErrors
}

function getInputValidationErrors(value, inputValidations) {
  const inputValidationErrors = inputValidations
    .map(validate => validate(value))
    .filter(error => error !== undefined)

  return inputValidationErrors
}
