import { useState, useMemo, ChangeEvent } from 'react'
import {
  setInputValue,
  resetInputValue,
  clearInputError,
  validateForm,
  validateInputValue,
  getInitialFormErrors,
} from './logic'

type FormValuesOutput = {
  /**
   * ```ts
   * { inputName: inputValue }
   * ```
   */
  formValues: object
  /**
   * Resets formValues to its initial state.
   */
  resetFormValues: () => void
  /**
   * Resets the specified input value to its initial state.
   */
  resetInputValue: (name: string) => void
  /**
   * Updates the specified input's value via an event handler or the inputs name and new value.
   */
  setInputValue: (
    input: string | ChangeEvent<HTMLInputElement>,
    value?: string | boolean
  ) => void
  setFormValues: React.Dispatch<React.SetStateAction<object>>
}

/**
 * Use this hook to manage your form values.
 * @param initialFormValues An object where each key is the input name, and each value is the initial value for that input.
 *
 * ```ts
 * const {
 *   formValues,
 *   setInputValue
 * } = useFormValues({
 *   email: '',
 *   password: '',
 *   confirmPassword: ''
 * })
 * ```
 */
export function useFormValues(initialFormValues: object): FormValuesOutput {
  const [formValues, setFormValues] = useState(initialFormValues)

  return {
    formValues,
    resetFormValues: (): void => setFormValues(initialFormValues),
    resetInputValue: (name: string): void =>
      resetInputValue(name, setFormValues, initialFormValues),
    setInputValue: (
      input: string | ChangeEvent<HTMLInputElement>,
      value?: string | boolean
    ): void => setInputValue(setFormValues, input, value),
    setFormValues,
  }
}

type FormErrorsOutput = {
  /**
   * ```ts
   * { inputName: inputError }
   * ```
   */
  formErrors: object
  numberOfErrors: number
  /**
   * @returns `formIsValid`
   */
  validateForm: (formValues: object) => boolean
  /**
   * @returns `inputIsValid`
   */
  validateInputValue: (
    input: string | ChangeEvent<HTMLInputElement>,
    value?: string | boolean
  ) => boolean
  clearFormErrors: () => void
  /**
   * Clears an input's error via an event handler or the input's name.
   */
  clearInputError: (input: string | ChangeEvent<HTMLInputElement>) => void
  setInputError: (name: string, error: string | JSX.Element) => void
}

/**
 * Use this hook with `useFormValues` to manage your form errors.
 * @param formValidations An object where each key is the input name, and the value is an array of validation functions for that input.
 *
 * ```ts
 * const {
 * formErrors,
 *  validateForm,
 * } = useFormErrors({
 *  email: [required, email],
 *  password: [required, alphanumeric, (value) => minLength(value, 6)],
 *  confirmPassword: [
 *    required,
 *    (value) => passwordsMatch(value, formValues.password),
 *  ],
 * })
 * ```
 */
export function useFormErrors(formValidations = {}): FormErrorsOutput {
  const initialFormErrors = useMemo(
    () => getInitialFormErrors(formValidations),
    [formValidations]
  )

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  return {
    formErrors,
    numberOfErrors: Object.values<string>(formErrors).filter(
      (error) => Boolean(error) === true
    ).length,
    validateForm: (formValues: object): boolean =>
      validateForm(formValues, setFormErrors, formValidations),
    validateInputValue: (
      input: string | ChangeEvent<HTMLInputElement>,
      value?: string | boolean
    ): boolean =>
      validateInputValue(setFormErrors, formValidations, input, value),
    clearFormErrors: (): void => setFormErrors(initialFormErrors),
    clearInputError: (input: string | ChangeEvent<HTMLInputElement>): void =>
      clearInputError(input, setFormErrors),
    setInputError: (name: string, error: string | JSX.Element): void =>
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [name]: error,
      })),
  }
}
