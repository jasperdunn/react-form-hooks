import React from 'react'
import { useFormValues, useFormErrors } from '@jasperdunn/react-form-hooks'
import { required, email, minLength, alphanumeric, equals } from './validation'
import InputText from './InputText'
import InputRadioGroup from './InputRadioGroup'

export default function HooksForm() {
  const {
    formValues,
    setInputValue,
    resetFormValues,
    resetInputValue,
  } = useFormValues({
    email: '',
    password: '',
    confirmPassword: '',
    iLoveHooks: '',
  })

  const formValidations = {
    email: [required, email],
    password: [required, alphanumeric, (value) => minLength(value, 6)],
    confirmPassword: [
      required,
      (value) => equals(value, formValues.password, "Passwords don't match"),
    ],
    iLoveHooks: [required],
  }

  const {
    formErrors,
    numberOfErrors,
    validateForm,
    validateInputValue,
    clearFormErrors,
    clearInputError,
  } = useFormErrors(formValidations)

  function updateAndValidateInput(event) {
    setInputValue(event)
    validateInputValue(event)
  }

  function resetForm() {
    resetFormValues()
    clearFormErrors()
  }

  function submitForm(event) {
    event.preventDefault()

    const formIsValid = validateForm(formValues)
    if (formIsValid) {
      signIn()
    }
  }

  function signIn() {
    //eslint-disable-next-line
    alert('Validation successful!')
  }

  return (
    <form onSubmit={submitForm} noValidate>
      <h1>Form with hooks</h1>
      {numberOfErrors > 0 && (
        <small>
          {numberOfErrors} field{numberOfErrors !== 1 && 's'} need
          {numberOfErrors === 1 && 's'} your attention.
        </small>
      )}
      <InputText
        name="email"
        label="Email - (validate on blur)"
        type="email"
        value={formValues.email}
        onChange={setInputValue}
        onBlur={validateInputValue}
        error={formErrors.email}
      />
      <InputText
        name="password"
        label="Password - (clear errors on blur)"
        type="password"
        value={formValues.password}
        onChange={setInputValue}
        onBlur={clearInputError}
        error={formErrors.password}
      />
      <InputText
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={formValues.confirmPassword}
        onChange={setInputValue}
        error={formErrors.confirmPassword}
      />
      <InputRadioGroup
        name="iLoveHooks"
        label="I love hooks!"
        value={formValues.iLoveHooks}
        onChange={updateAndValidateInput}
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'Yes', value: 'alsoYes' },
        ]}
        error={formErrors.iLoveHooks}
      />
      <button type="submit">Create some hooks!</button>
      <button type="button" onClick={resetForm}>
        Reset form
      </button>
      <button type="button" onClick={() => resetInputValue('email')}>
        Reset email
      </button>
      <button type="button" onClick={() => clearInputError('email')}>
        Clear email errors
      </button>
    </form>
  )
}
