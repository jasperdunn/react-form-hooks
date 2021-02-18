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
export type FormErrors<E extends string> = Record<E, InputError>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputValidation = (value: any) => InputError
export type FormValidations<E extends string> = Record<E, InputValidation[]>

export type FormValuesOutput<V extends FormValues> = {
  formValues: V
  /**
   * Resets formValues to its initial state.
   */
  resetFormValues: () => void
  /**
   * Resets the specified input value to its initial state.
   */
  resetInputValue: (name: keyof V) => void
  /**
   * Updates the specified input's value via an event handler or the inputs name and new value.
   */
  setInputValue: (
    input:
      | keyof V
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: InputValue
  ) => void
  setFormValues: Dispatch<SetStateAction<V>>
}

export type FormErrorsOutput<E extends string> = {
  formErrors: FormErrors<E>
  numberOfErrors: number
  validateForm: (formValues: FormValues) => boolean
  validateInputValue: (
    input:
      | E
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: InputValue
  ) => boolean
  clearFormErrors: () => void
  /**
   * Clears an input's error via an event handler or the input's name.
   */
  clearInputError: (
    input:
      | E
      | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  setInputError: (name: E, error: InputError) => void
}
