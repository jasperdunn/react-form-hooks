import { useState, ChangeEvent } from 'react'
import {
  setInputValue,
  resetInputValue,
  clearInputError,
  validateForm,
  validateInputValue,
} from './logic'
import {
  InputError,
  FormValidations,
  InputValue,
  FormValues,
  FormErrors,
  FormValuesOutput,
  FormErrorsOutput,
} from './types'

/**
 * Use this hook to manage your form data.
 *
 * ```ts
 * const {
 *   formValues,
 *   setInputValue,
 *   formErrors,
 *   isFormValid,
 * } = useFormHooks({
 *   email: '',
 *   password: '',
 *   confirmPassword: ''
 * },
 * {
 *  email: [required, email],
 *  password: [required, alphanumeric, (value) => minLength(value, 6)],
 *  confirmPassword: [
 *    required,
 *    (value) => passwordsMatch(value, formValues.password),
 *  ],
 * })
 * ```
 */
export function useFormValues<V extends FormValues>(
  initialFormValues: V
): FormValuesOutput<V> {
  const [formValues, setFormValues] = useState<V>(initialFormValues)

  return {
    formValues,
    resetFormValues: (): void => setFormValues(initialFormValues),
    resetInputValue: (name: keyof V): void =>
      resetInputValue<V>(name, setFormValues, initialFormValues),
    setInputValue: (
      input:
        | keyof V
        | ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >,
      value?: InputValue
    ): void => setInputValue<V>(setFormValues, input, value),
    setFormValues,
  }
}

export function useFormErrors<E extends string>(
  formValidations?: FormValidations<E>
): FormErrorsOutput<E> {
  const [formErrors, setFormErrors] = useState<FormErrors<E>>(
    {} as Record<E, InputError>
  )

  return {
    formErrors,
    numberOfErrors: Object.values<InputError>(
      formErrors
    ).filter((error: InputError) => Boolean(error)).length,
    validateForm: (formValues: FormValues): boolean =>
      validateForm<E>(formValues, setFormErrors, formValidations),
    validateInputValue: (
      input:
        | E
        | ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >,
      value?: InputValue
    ): boolean =>
      validateInputValue(setFormErrors, input, formValidations, value),
    clearFormErrors: (): void => setFormErrors({} as Record<E, InputError>),
    clearInputError: (
      input:
        | E
        | ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >
    ): void => clearInputError(input, setFormErrors),
    setInputError: (name: E, error: InputError): void =>
      setFormErrors((prevFormErrors: FormErrors<E>) => ({
        ...prevFormErrors,
        [name]: error,
      })),
  }
}
