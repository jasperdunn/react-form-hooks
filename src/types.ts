import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export type InputValue =
  | string
  | string[]
  | number
  | boolean
  | Date
  | null
  | undefined
export type InputError = string | JSX.Element | null | undefined

export type FormValues = Record<string, InputValue>
export type FormErrors = Record<string, InputError>

export type InputValidation = (value: InputValue) => InputError
export type FormValidations = Record<string, InputValidation[]>

export type FormErrorsOutput<F extends FormValues, E extends FormErrors> = {
  formErrors: E
  numberOfErrors: number
  isFormValid: (formValues: F) => boolean
  isInputValid: (
    input:
      | string
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: InputValue
  ) => boolean
  /**
   * @deprecated `validateForm` has been renamed to `isFormValid`
   */
  validateForm: (formValues: F) => boolean
  /**
   * @deprecated `validateInputValue` has been renamed to `isInputValid`
   */
  validateInputValue: (
    input:
      | string
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: InputValue
  ) => boolean
  clearFormErrors: () => void
  /**
   * Clears an input's error via an event handler or the input's name.
   */
  clearInputError: (
    input:
      | string
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  setInputError: (name: string, error: InputError) => void
}

export type FormValuesOutput<F extends FormValues> = {
  formValues: F
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
    input:
      | string
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: InputValue
  ) => void
  setFormValues: Dispatch<SetStateAction<F>>
}
