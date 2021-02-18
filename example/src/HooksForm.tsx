import React from 'react'
import { useFormValues, useFormErrors } from '@jasperdunn/react-form-hooks'
import { required, email, minLength, alphanumeric, equals } from './validation'
import { InputText } from './InputText'
import { InputRadioGroup } from './InputRadioGroup'

export function HooksForm(): JSX.Element {
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

  const {
    formErrors,
    numberOfErrors,
    validateForm,
    validateInputValue,
    clearFormErrors,
    clearInputError,
  } = useFormErrors({
    email: [required, email],
    password: [required, alphanumeric, (value: string) => minLength(value, 6)],
    confirmPassword: [
      required,
      (value: string) =>
        equals(value, formValues.password, "Passwords don't match"),
    ],
    iLoveHooks: [required],
  })

  function updateAndValidateInput(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setInputValue(event)
    validateInputValue(event)
  }

  function resetForm(): void {
    resetFormValues()
    clearFormErrors()
  }

  function signIn(): void {
    //eslint-disable-next-line
    alert('Validation successful!')
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (validateForm(formValues)) {
      signIn()
    }
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
