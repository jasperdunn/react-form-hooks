import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import {
  InputValue,
  InputError,
  FormValidations,
  InputValidation,
  FormErrors,
  FormValues,
} from './types'

export function setInputValue<V extends FormValues>(
  setFormValues: Dispatch<SetStateAction<V>>,
  input:
    | keyof V
    | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  value?: InputValue
): void {
  let name: string
  let updatedValue = value

  if (typeof input === 'string') {
    name = input
  } else {
    const target = (input as ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >).target
    name = target.name
    updatedValue =
      target.type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : target.value
  }

  setFormValues((prevFormValues: V) => ({
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

export function validateForm<E extends string>(
  formValues: FormValues,
  setFormErrors: Dispatch<SetStateAction<FormErrors<E>>>,
  formValidations?: FormValidations<E>
): boolean {
  if (!formValidations) {
    return true
  }

  const inputsToValidate = Object.keys(formValidations)
  if (inputsToValidate.length === 0) {
    return true
  }

  const updatedFormErrors = {} as Record<string, InputError>

  for (let i = 0; i < inputsToValidate.length; i++) {
    const inputName = inputsToValidate[i]
    updatedFormErrors[inputName] = getFirstInputValidationError(
      formValues[inputName],
      (formValidations as Record<string, InputValidation[]>)[inputName]
    )
  }

  setFormErrors(updatedFormErrors)

  return (
    Object.values<InputError>(updatedFormErrors).filter((error: InputError) =>
      Boolean(error)
    ).length === 0
  )
}

export function validateInputValue<E extends string>(
  setFormErrors: Dispatch<SetStateAction<FormErrors<E>>>,
  input:
    | E
    | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  formValidations?: FormValidations<E>,
  value?: InputValue
): boolean {
  if (!formValidations) {
    return true
  }

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
    (formValidations as Record<string, InputValidation[]>)[inputName]
  )

  setFormErrors((prevFormErrors: FormErrors<E>) => ({
    ...prevFormErrors,
    [inputName]: error,
  }))

  return Boolean(error) === false
}

export function resetInputValue<V extends FormValues>(
  name: keyof V,
  setFormValues: Dispatch<SetStateAction<V>>,
  initialFormValues: V
): void {
  const value = initialFormValues[name]

  setFormValues((prevFormValues: V) => ({
    ...prevFormValues,
    [name]: value,
  }))
}

export function clearInputError<E extends string>(
  input:
    | E
    | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setFormErrors: Dispatch<SetStateAction<FormErrors<E>>>
): void {
  const name = typeof input === 'string' ? input : input.target.name

  setFormErrors((prevFormErrors: FormErrors<E>) => ({
    ...prevFormErrors,
    [name]: undefined,
  }))
}
