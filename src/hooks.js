import { useState, useMemo } from 'react'
import {
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
 * @returns
 * - formValues - Object where each key is the input name and each value is the input value.
 * - resetFormValues - Function that resets the form values to the initial state.
 * - resetInputValue - Function that resets the input value to it's initial state.
 * - updateInputValue - Function called via an event handler that updates an input value.
 * - setInputValue - Function that updates an input value.
 * - setFormValues - Function that updates the form values.
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
    updateInputValue: event => updateInputValue(event, setFormValues),
    /**
     * @param {String} name
     */
    setInputValue: (name, value) =>
      setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value })),
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
 * - validateInputValue - Function that runs validation on an input.
 * - clearFormErrors - Function that clears the forms errors.
 * - clearInputErrors - Function that clears the errors for an input.
 * - setInputErrors - Function that sets the errors for an input.
 */
export function useFormErrors(formValidations = {}) {
  const initialFormErrors = useMemo(
    () => getInitialFormErrors(formValidations),
    []
  )
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  return {
    formErrors,
    numberOfErrors: Object.values(formErrors).filter(value => value.length > 0)
      .length,
    validateForm: formValues =>
      validateForm(formValues, setFormErrors, formValidations),
    validateInputValue: event =>
      validateInputValue(event, setFormErrors, formValidations),
    clearFormErrors: () => setFormErrors(initialFormErrors),
    /**
     * @param {String} name
     */
    clearInputErrors: name => clearInputErrors(name, setFormErrors),
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
