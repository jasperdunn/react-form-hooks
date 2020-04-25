import { useState, useMemo, ChangeEvent } from 'react'
import {
  setInputValue,
  resetInputValue,
  clearInputError,
  isFormValid,
  isInputValid,
  getInitialFormErrors,
} from './logic'
import {
  InputError,
  FormValuesOutput,
  FormErrorsOutput,
  FormValidations,
  InputValue,
  FormValues,
  FormErrors,
} from './types'

/**
 * Use this hook to manage your form values.
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
export function useFormValues<F extends FormValues>(
  initialFormValues: F
): FormValuesOutput<F> {
  const [formValues, setFormValues] = useState<F>(initialFormValues)

  return {
    formValues,
    resetFormValues: (): void => setFormValues(initialFormValues),
    resetInputValue: (name: string): void =>
      resetInputValue<F>(name, setFormValues, initialFormValues),
    setInputValue: (
      input: string | ChangeEvent<HTMLInputElement>,
      value?: InputValue
    ): void => setInputValue<F>(setFormValues, input, value),
    setFormValues,
  }
}

/**
 * Use this hook with `useFormValues` to manage your form errors.
 *
 * ```ts
 * const {
 *  formErrors,
 *  isFormValid,
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
export function useFormErrors<F extends FormValues, E extends FormErrors>(
  formValidations: FormValidations = {}
): FormErrorsOutput<F, E> {
  const initialFormErrors = useMemo<E>(
    () => getInitialFormErrors(formValidations),
    [formValidations]
  )

  const [formErrors, setFormErrors] = useState<E>(initialFormErrors)

  return {
    formErrors,
    numberOfErrors: Object.values<InputError>(
      formErrors
    ).filter((error: InputError) => Boolean(error)).length,
    isFormValid: (formValues: F): boolean =>
      isFormValid<F, E>(formValues, setFormErrors, formValidations),
    isInputValid: (
      input: string | ChangeEvent<HTMLInputElement>,
      value?: InputValue
    ): boolean => isInputValid(setFormErrors, formValidations, input, value),
    validateForm: (formValues: F): boolean =>
      isFormValid<F, E>(formValues, setFormErrors, formValidations),
    validateInputValue: (
      input: string | ChangeEvent<HTMLInputElement>,
      value?: InputValue
    ): boolean => isInputValid(setFormErrors, formValidations, input, value),
    clearFormErrors: (): void => setFormErrors(initialFormErrors),
    clearInputError: (input: string | ChangeEvent<HTMLInputElement>): void =>
      clearInputError(input, setFormErrors),
    setInputError: (name: string, error: InputError): void =>
      setFormErrors((prevFormErrors: E) => ({
        ...prevFormErrors,
        [name]: error,
      })),
  }
}
