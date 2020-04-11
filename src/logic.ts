import { ChangeEvent } from 'react'

export function setInputValue(
  setFormValues: React.Dispatch<object>,
  input: string | ChangeEvent<HTMLInputElement>,
  value?: string | boolean
): void {
  let name: string
  let updatedValue = value

  if (typeof input === 'string') {
    name = input
  } else {
    const target = input.target
    name = target.name
    updatedValue = target.type === 'checkbox' ? target.checked : target.value
  }

  setFormValues((prevFormValues: object) => ({
    ...prevFormValues,
    [name]: updatedValue,
  }))
}

export function updateInputValue(
  event: ChangeEvent<HTMLInputElement>,
  setFormValues: React.Dispatch<object>
): void {
  const target = event.target
  const name = target.name
  const value = target.type === 'checkbox' ? target.checked : target.value

  setFormValues((prevFormValues: object) => ({
    ...prevFormValues,
    [name]: value,
  }))
}

function getFirstInputValidationError(
  value: string | boolean | undefined,
  inputValidations: Array<
    (value: string | boolean | undefined) => string | JSX.Element | undefined
  >
): string | JSX.Element | void {
  for (let a = 0; a < inputValidations.length; a++) {
    const error = inputValidations[a](value)
    if (error) {
      return error
    }
  }
}

export function validateForm(
  formValues: object,
  setFormErrors: React.Dispatch<object>,
  formValidations: object
): boolean {
  const inputsToValidate = Object.keys(formValidations)
  if (inputsToValidate.length === 0) {
    return true
  }

  const updatedFormErrors = {}

  for (let i = 0; i < inputsToValidate.length; i++) {
    const inputName = inputsToValidate[i]
    updatedFormErrors[inputName] = getFirstInputValidationError(
      formValues[inputName],
      formValidations[inputName]
    )
  }

  setFormErrors(updatedFormErrors)

  return (
    Object.values<string>(updatedFormErrors).filter((value) => Boolean(value))
      .length === 0
  )
}

export function validateInputValue(
  setFormErrors: React.Dispatch<object>,
  formValidations: object,
  input: string | ChangeEvent<HTMLInputElement>,
  value?: string | boolean
): boolean {
  let inputName: string
  let inputValue = value

  if (typeof input === 'string') {
    inputName = input
  } else {
    inputName = input.target.name
    inputValue = input.target.value
  }

  if (!Object.prototype.hasOwnProperty.call(formValidations, inputName)) {
    return false
  }

  const error = getFirstInputValidationError(
    inputValue,
    formValidations[inputName]
  )

  setFormErrors((prevFormErrors: object) => ({
    ...prevFormErrors,
    [inputName]: error,
  }))

  return Boolean(error) === false
}

export function resetInputValue(
  name: string,
  setFormValues: React.Dispatch<object>,
  initialFormValues: object
): void {
  const value = initialFormValues[name]

  setFormValues((prevFormValues: object) => ({
    ...prevFormValues,
    [name]: value,
  }))
}

export function clearInputError(
  input: string | ChangeEvent<HTMLInputElement>,
  setFormErrors: React.Dispatch<object>
): void {
  const name = typeof input === 'string' ? input : input.target.name

  setFormErrors((prevFormErrors: object) => ({
    ...prevFormErrors,
    [name]: undefined,
  }))
}

export function getInitialFormErrors(formValidations: object): {} {
  const formInputNames = Object.keys(formValidations)
  const initialFormErrors = {}

  for (let a = 0; a < formInputNames.length; a++) {
    initialFormErrors[formInputNames[a]] = undefined
  }

  return initialFormErrors
}
