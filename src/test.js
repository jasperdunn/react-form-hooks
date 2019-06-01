import React, { useState } from 'react'
import { object, string } from 'prop-types'
import {
  render,
  getByTestId,
  fireEvent,
  queryByTestId
} from 'react-testing-library'
import { useFormValues } from './index'
import InputText from '../example/src/InputText'
import { required } from '../example/src/validation'
import { useFormErrors } from './hooks'

TestInput.propTypes = {
  initialValue: string.isRequired,
  newValue: string,
  formValidations: object,
  customErrorMessage: string
}

function TestInput({
  initialValue,
  newValue,
  formValidations,
  customErrorMessage
}) {
  const initialFormValues = { name: initialValue }
  const {
    formValues,
    resetInputValue,
    updateInputValue,
    setInputValue
  } = useFormValues(initialFormValues)
  const {
    formErrors,
    validateInputValue,
    clearInputErrors,
    setInputErrors
  } = useFormErrors(formValidations)
  return (
    <>
      <InputText
        id="name"
        label="Name"
        type="text"
        value={formValues.name}
        onChange={updateInputValue}
        onBlur={validateInputValue}
        errors={formErrors.name}
      />
      <button
        data-testid="resetButton"
        type="button"
        onClick={() => resetInputValue('name')}
      />
      <button
        data-testid="setButton"
        type="button"
        onClick={() => setInputValue('name', newValue)}
      />
      <button
        data-testid="clearInputErrorsButton"
        type="button"
        onClick={() => clearInputErrors('name')}
      />
      <button
        data-testid="setInputErrorsButton"
        type="button"
        onClick={() => setInputErrors('name', [customErrorMessage])}
      />
    </>
  )
}

describe('useFormValues - input', () => {
  it('renders with its initial form value', () => {
    const initialValue = ''
    const { container } = render(<TestInput initialValue={initialValue} />)

    const inputTextName = getByTestId(container, 'name')

    expect(inputTextName.value).toBe(initialValue)
  })

  test('updateInputValue', () => {
    const { container } = render(<TestInput initialValue="" />)

    const inputTextName = getByTestId(container, 'name')
    const newName = 'John Smith'
    fireEvent.change(inputTextName, { target: { value: newName } })

    expect(inputTextName.value).toBe(newName)
  })

  test('resetInputValue', () => {
    const initialValue = 'John Smith'
    const { container } = render(<TestInput initialValue={initialValue} />)

    const inputTextName = getByTestId(container, 'name')
    const newName = 'Bob Brown'
    fireEvent.change(inputTextName, { target: { value: newName } })

    const resetButton = getByTestId(container, 'resetButton')
    fireEvent.click(resetButton)

    expect(inputTextName.value).toBe(initialValue)
  })

  test('setInputValue', () => {
    const newValue = 'Bob Brown'
    const { container } = render(
      <TestInput initialValue="John Smith" newValue={newValue} />
    )

    const inputTextName = getByTestId(container, 'name')

    const setButton = getByTestId(container, 'setButton')
    fireEvent.click(setButton)

    expect(inputTextName.value).toBe(newValue)
  })
})

describe('useFormErrors - input', () => {
  it('renders initially with no errors', () => {
    const { container } = render(<TestInput initialValue="" />)

    const errors = queryByTestId(container, 'name-errors')

    expect(errors).toBeNull()
  })

  test('validateInputValue', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const inputTextName = getByTestId(container, 'name')
    fireEvent.blur(inputTextName)

    const errors = getByTestId(container, 'name-errors')
    const errorMessage = errors.childNodes[0].textContent

    expect(errors.childNodes.length).toEqual(1)
    expect(errorMessage).toMatch('required')
  })

  test('clearInputErrors', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const inputTextName = getByTestId(container, 'name')
    fireEvent.blur(inputTextName)

    const clearInputErrorsButton = getByTestId(
      container,
      'clearInputErrorsButton'
    )
    fireEvent.click(clearInputErrorsButton)

    const errors = queryByTestId(container, 'name-errors')

    expect(errors).toBeNull()
  })

  test('setInputErrors', () => {
    const { container } = render(
      <TestInput initialValue="" customErrorMessage="Whoops!" />
    )

    const setInputErrorsButton = getByTestId(container, 'setInputErrorsButton')
    fireEvent.click(setInputErrorsButton)

    const errors = queryByTestId(container, 'name-errors')
    const errorMessage = errors.childNodes[0].textContent

    expect(errors.childNodes.length).toEqual(1)
    expect(errorMessage).toMatch('Whoops!')
  })
})

TestForm.propTypes = {
  initialFormValues: object.isRequired,
  newFormValues: object
}

function TestForm({ initialFormValues, newFormValues }) {
  const {
    formValues,
    resetFormValues,
    updateInputValue,
    setFormValues
  } = useFormValues(initialFormValues)

  const {
    formErrors,
    numberOfErrors,
    validateForm,
    clearFormErrors
  } = useFormErrors({ name: [required], email: [required] })

  const [formIsValid, setFormIsValid] = useState(false)

  function validate() {
    setFormIsValid(validateForm(formValues))
  }

  return (
    <>
      <span data-testid="numberOfErrors">{numberOfErrors}</span>
      <span data-testid="formIsValid">{formIsValid.toString()}</span>
      <InputText
        id="name"
        label="Name"
        type="text"
        value={formValues.name}
        onChange={updateInputValue}
        errors={formErrors.name}
      />
      <InputText
        id="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={updateInputValue}
        errors={formErrors.email}
      />
      <button
        data-testid="resetButton"
        type="button"
        onClick={() => resetFormValues()}
      />
      <button
        data-testid="setButton"
        type="button"
        onClick={() =>
          setFormValues({
            name: newFormValues.name,
            email: newFormValues.email
          })
        }
      />
      <button
        data-testid="validateFormButton"
        type="button"
        onClick={validate}
      />
      <button
        data-testid="clearFormErrorsButton"
        type="button"
        onClick={() => clearFormErrors()}
      />
    </>
  )
}

describe('useFormValues - form', () => {
  test('setFormValues', () => {
    const newFormValues = { name: 'Bob Brown', email: 'bob@email.com' }

    const { container } = render(
      <TestForm
        initialFormValues={{ name: 'John Smith', email: 'john@email.com' }}
        newFormValues={newFormValues}
      />
    )

    const inputTextName = getByTestId(container, 'name')
    const inputTextEmail = getByTestId(container, 'email')
    const setButton = getByTestId(container, 'setButton')

    fireEvent.click(setButton)

    expect(inputTextName.value).toBe(newFormValues.name)
    expect(inputTextEmail.value).toBe(newFormValues.email)
  })

  test('resetFormValues', () => {
    const initialFormValues = { name: '', email: '' }

    const { container } = render(
      <TestForm
        initialFormValues={initialFormValues}
        newFormValues={{ name: 'Bob Brown', email: 'bob@email.com' }}
      />
    )

    const inputTextName = getByTestId(container, 'name')
    const inputTextEmail = getByTestId(container, 'email')
    const setButton = getByTestId(container, 'setButton')
    const resetButton = getByTestId(container, 'resetButton')

    fireEvent.click(setButton)
    fireEvent.click(resetButton)

    expect(inputTextName.value).toBe(initialFormValues.name)
    expect(inputTextEmail.value).toBe(initialFormValues.email)
  })
})

describe('useFormErrors - form', () => {
  test('validateForm', () => {
    const { container } = render(
      <TestForm
        initialFormValues={{ name: '', email: '' }}
        formValidations={{ name: [required], email: [required] }}
      />
    )

    const validateFormButton = getByTestId(container, 'validateFormButton')
    fireEvent.click(validateFormButton)

    const nameErrors = getByTestId(container, 'name-errors')
    const emailErrors = getByTestId(container, 'email-errors')
    const numberOfErrors = getByTestId(container, 'numberOfErrors').textContent
    const formIsValid = getByTestId(container, 'formIsValid').textContent

    expect(nameErrors).not.toBeNull()
    expect(emailErrors).not.toBeNull()
    expect(numberOfErrors).toBe(String(2))
    expect(formIsValid).toBe(String(false))
  })

  test('clearFormErrors', () => {
    const { container } = render(
      <TestForm
        initialFormValues={{ name: '', email: '' }}
        formValidations={{ name: [required], email: [required] }}
      />
    )

    const validateFormButton = getByTestId(container, 'validateFormButton')
    fireEvent.click(validateFormButton)

    const clearFormErrorsButton = getByTestId(
      container,
      'clearFormErrorsButton'
    )
    fireEvent.click(clearFormErrorsButton)

    const nameErrors = queryByTestId(container, 'name-errors')
    const emailErrors = queryByTestId(container, 'email-errors')
    const numberOfErrors = getByTestId(container, 'numberOfErrors').textContent

    expect(nameErrors).toBeNull()
    expect(emailErrors).toBeNull()
    expect(numberOfErrors).toBe(String(0))
  })
})
