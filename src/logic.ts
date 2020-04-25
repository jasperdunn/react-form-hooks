import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import {
  InputValue,
  InputError,
  FormValidations,
  InputValidation,
  FormErrors,
} from './types'

export function setInputValue<F>(
  setFormValues: Dispatch<SetStateAction<F>>,
  input: string | ChangeEvent<HTMLInputElement>,
  value?: InputValue
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

  setFormValues((prevFormValues: F) => ({
    ...prevFormValues,
    [name]: updatedValue,
  }))
}

function getFirstInputValidationError(
  value: InputValue,
  inputValidations: Array<InputValidation>
): InputError {
  for (let a = 0; a < inputValidations.length; a++) {
    const error = inputValidations[a](value)
    if (error) {
      return error
    }
  }

  return undefined
}

export function isFormValid<F, E extends FormErrors>(
  formValues: F,
  setFormErrors: Dispatch<SetStateAction<E>>,
  formValidations: FormValidations
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

  setFormErrors(updatedFormErrors as E)

  return (
    Object.values<InputError>(updatedFormErrors).filter((error: InputError) =>
      Boolean(error)
    ).length === 0
  )
}

export function isInputValid<E>(
  setFormErrors: Dispatch<SetStateAction<E>>,
  formValidations: FormValidations,
  input: string | ChangeEvent<HTMLInputElement>,
  value?: InputValue
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

  setFormErrors((prevFormErrors: E) => ({
    ...prevFormErrors,
    [inputName]: error,
  }))

  return Boolean(error) === false
}

export function resetInputValue<F>(
  name: string,
  setFormValues: Dispatch<SetStateAction<F>>,
  initialFormValues: F
): void {
  const value = initialFormValues[name]

  setFormValues((prevFormValues: F) => ({
    ...prevFormValues,
    [name]: value,
  }))
}

export function clearInputError<F>(
  input: string | ChangeEvent<HTMLInputElement>,
  setFormErrors: Dispatch<SetStateAction<F>>
): void {
  const name = typeof input === 'string' ? input : input.target.name

  setFormErrors((prevFormErrors: F) => ({
    ...prevFormErrors,
    [name]: undefined,
  }))
}

export function getInitialFormErrors<E>(formValidations: FormValidations): E {
  const formInputNames = Object.keys(formValidations)
  const initialFormErrors = {} as E

  for (let a = 0; a < formInputNames.length; a++) {
    initialFormErrors[formInputNames[a]] = undefined
  }

  return initialFormErrors
}
