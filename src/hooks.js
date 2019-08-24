import { useState, useMemo } from 'react'
import {
  setInputValue,
  updateInputValue,
  resetInputValue,
  clearInputErrors,
  validateForm,
  validateInputValue,
  getInitialFormErrors
} from './logic'

/**
 * @param {Object} initialFormValues
 * Where each key is the form input name,
 * and the value is the initial value of the form input.
 * @example {name: "initialValue"}
 * @returns
 * - formValues - Object where each key is the input name and each value is the input value.
 * - resetFormValues - Function that resets the form values to the initial state.
 * - resetInputValue(name) - Function that resets the input value to it's initial state.
 * - updateInputValue - (deprecated) please use `setInputValue` instead.
 * - setInputValue(input, value?) - Function that updates an input value via an event handler or passing the new value.
 * - setFormValues(formValues) - Function that updates the form values.
 */
export function useFormValues(initialFormValues) {
  const [formValues, setFormValues] = useState(initialFormValues)

  return {
    formValues,
    resetFormValues: () => setFormValues(initialFormValues),
    /**
     * @param {String} name
     */
    resetInputValue: name =>
      resetInputValue(name, setFormValues, initialFormValues),
    /**
     * @deprecated - please use `setInputValue`
     */
    updateInputValue: event => updateInputValue(event, setFormValues),
    /**
     * @param {String|import('react').SyntheticEvent} input
     * @param {*=} value
     */
    setInputValue: (input, value) => setInputValue(input, value, setFormValues),
    setFormValues
  }
}

/**
 * @description Use this hook as an addition to `useFormValues` to help with error handling.
 * @param {Object} formValidations
 * Where each key is the form input name,
 * and the value is an array of validation functions for that form input.
 * @returns
 * - formErrors - Object where each key is the input name and each value is an array of error messages (string/jsx).
 * - numberOfErrors - Number of inputs that have errors.
 * - validateForm - Function that runs validation on the whole form, returns formIsValid (boolean).
 * - validateInputValue(input, value?) - Function that runs validation on an input, returns inputIsValid (boolean).
 * - clearFormErrors - Function that clears the forms errors.
 * - clearInputErrors(input) - Function that clears the errors for an input via an event handler or passing the new value.
 * - setInputErrors(name, errors) - Function that sets the errors for an input.
 */
export function useFormErrors(formValidations = {}) {
  const initialFormErrors = useMemo(
    () => getInitialFormErrors(formValidations),
    [formValidations]
  )
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  return {
    formErrors,
    numberOfErrors: Object.values(formErrors).filter(value => value.length > 0)
      .length,
    validateForm: formValues =>
      validateForm(formValues, setFormErrors, formValidations),
    /**
     * @param {String|import('react').SyntheticEvent} input
     * @param {*=} value
     */
    validateInputValue: (input, value = null) =>
      validateInputValue(input, value, setFormErrors, formValidations),
    clearFormErrors: () => setFormErrors(initialFormErrors),
    /**
     * @param {String|import('react').SyntheticEvent} input
     */
    clearInputErrors: input => clearInputErrors(input, setFormErrors),
    /**
     * @param {String} name
     * @param {String[]} errors
     */
    setInputErrors: (name, errors) =>
      setFormErrors(prevFormErrors => ({
        ...prevFormErrors,
        [name]: errors
      }))
  }
}
