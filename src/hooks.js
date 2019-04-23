import { useState } from 'react'
import {
  updateInputValue,
  resetInputValue,
  clearInputErrors,
  setFormValidationErrors,
  setInputValidationErrors
} from './logic'

/**
 * @param {Object} initialFormValues
 * Where each key is the form input id,
 * and the value is the initial value of the form input.
 * @returns
 * - formValues - Object where each key is the input id and the value is the current input value.
 * - resetFormValues - Function that resets the form values to the initial state.
 * - resetInputValue - Function that resets the input value to it's initial state.
 * - updateInputValue - Function typically passed to onChange that updates the input value in the form state.
 */
export function useFormValues(initialFormValues) {
  const [formValues, setFormValues] = useState(initialFormValues)

  return {
    formValues,
    resetFormValues: () => setFormValues(initialFormValues),
    resetInputValue: inputName => resetInputValue(inputName, setFormValues),
    updateInputValue: event => updateInputValue(event, setFormValues)
  }
}

/**
 * @param {Object} formValidations
 * Where each key is the form input id,
 * and the value is an array of validation functions for that form input.
 * @returns
 * - formErrors - Object where each key is the input id and the value is an array of error messages.
 * - numberOfErrors - Number of inputs that have errors.
 * - validateForm - Function that runs validation on the whole form.
 * - validateInputValue - Function that runs validation on a single input.
 * - clearFormErrors - Function that clears all the form errors.
 * - clearInputErrors - Function that clears the inputs errors.
 * - setFormErrors - Function that sets the formErrors.
 */
export function useFormErrors(formValidations = {}) {
  const emptyObj = {}
  const [formErrors, setFormErrors] = useState(emptyObj)

  return {
    formErrors,
    numberOfErrors: Object.values(formErrors).filter(value => value.length > 0)
      .length,
    validateForm: formValues =>
      setFormValidationErrors(formValues, setFormErrors, formValidations),
    validateInputValue: event =>
      setInputValidationErrors(event, setFormErrors, formValidations),
    clearFormErrors: () => setFormErrors(emptyObj),
    clearInputErrors: inputName => clearInputErrors(inputName, setFormErrors),
    setFormErrors
  }
}
