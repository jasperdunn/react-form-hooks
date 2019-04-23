import React from 'react'
import { useFormValues, useFormErrors } from '@jasperdunn/react-form-hooks'
import {
  required,
  email,
  minLength,
  alphanumeric,
  passwordsMatch
} from './validation'
import InputText from './InputText'
import InputRadioGroup from './InputRadioGroup'
import { submit } from './HooksForm.logic'

export default function HooksForm() {
  const {
    formValues,
    updateInputValue,
    resetFormValues,
    resetInputValue
  } = useFormValues({
    email: '',
    password: '',
    confirmPassword: '',
    iLoveHooks: ''
  })

  const formValidations = {
    email: [required, email],
    password: [required, alphanumeric, value => minLength(value, 6)],
    confirmPassword: [
      required,
      value => passwordsMatch(value, formValues.password)
    ],
    iLoveHooks: [required]
  }

  const {
    formErrors,
    numberOfErrors,
    validateForm,
    validateInputValue,
    clearFormErrors,
    clearInputErrors
  } = useFormErrors(formValidations)

  function updateAndValidateInput(event) {
    updateInputValue(event)
    validateInputValue(event)
  }

  function resetForm() {
    resetFormValues()
    clearFormErrors()
  }

  return (
    <form
      onSubmit={event => submit(event, validateForm, formValues, formErrors)}
    >
      <h1>Form with hooks</h1>
      {numberOfErrors > 0 && (
        <small>
          {numberOfErrors} field{numberOfErrors !== 1 && 's'} need
          {numberOfErrors === 1 && 's'} your attention.
        </small>
      )}
      <InputText
        id="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={updateInputValue}
        onBlur={validateInputValue}
        errors={formErrors.email}
      />
      <InputText
        id="password"
        label="Password"
        type="password"
        value={formValues.password}
        onChange={updateInputValue}
        onBlur={validateInputValue}
        errors={formErrors.password}
      />
      <InputText
        id="confirmPassword"
        label="Confirm password"
        type="password"
        value={formValues.confirmPassword}
        onChange={updateInputValue}
        onBlur={validateInputValue}
        errors={formErrors.confirmPassword}
      />
      <InputRadioGroup
        id="iLoveHooks"
        label="I love hooks!"
        value={formValues.iLoveHooks}
        onChange={updateAndValidateInput}
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'Yes', value: 'alsoYes' }
        ]}
        errors={formErrors.iLoveHooks}
      />
      <button type="submit">Create some hooks!</button>
      <button type="button" onClick={resetForm}>
        Reset form
      </button>
      <button type="button" onClick={() => resetInputValue('email')}>
        Reset email
      </button>
      <button type="button" onClick={() => clearInputErrors('email')}>
        Clear email errors
      </button>
    </form>
  )
}
