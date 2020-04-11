import React, { useState } from 'react'
import { object, string, oneOf, node } from 'prop-types'
import {
  render,
  getByTestId,
  fireEvent,
  queryByTestId,
} from '@testing-library/react'
import { useFormValues } from './index'
import InputText from '../example/src/InputText'
import { required } from '../example/src/validation'
import { useFormErrors } from './hooks'

TestInput.propTypes = {
  initialValue: string.isRequired,
  newValue: string,
  formValidations: object,
  customErrorMessage: node,
  onBlurMethod: oneOf(['validate', 'clear']),
}

function TestInput({
  initialValue,
  newValue,
  formValidations,
  customErrorMessage,
  onBlurMethod = 'validate',
}) {
  const initialFormValues = { name: initialValue }
  const { formValues, resetInputValue, setInputValue } = useFormValues(
    initialFormValues
  )
  const {
    formErrors,
    validateInputValue,
    clearInputError,
    setInputError,
  } = useFormErrors(formValidations)
  const [inputIsValid, setInputIsValid] = useState(true)
  return (
    <>
      <span data-testid="inputIsValid">{inputIsValid.toString()}</span>
      <InputText
        name="name"
        label="Name"
        type="text"
        value={formValues.name}
        onChange={setInputValue}
        onBlur={
          onBlurMethod === 'validate' ? validateInputValue : clearInputError
        }
        error={formErrors.name}
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
        data-testid="clearInputErrorButton"
        type="button"
        onClick={() => clearInputError('name')}
      />
      <button
        data-testid="setInputErrorButton"
        type="button"
        onClick={() => setInputError('name', customErrorMessage)}
      />
      <button
        data-testid="validateInputValueButton"
        type="button"
        onClick={() => {
          setInputIsValid(validateInputValue('name', formValues.name))
        }}
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

  test('setInputValue', () => {
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

  test('setInputValue(string)', () => {
    const newValue = 'Bob Brown'
    const { container } = render(
      <TestInput initialValue="John Smith" newValue={newValue} />
    )

    const inputTextName = getByTestId(container, 'name')

    const setButton = getByTestId(container, 'setButton')
    fireEvent.click(setButton)

    expect(inputTextName.value).toBe(newValue)
  })

  test('setInputValue(event)', () => {
    const { container } = render(<TestInput initialValue="" />)

    const inputTextName = getByTestId(container, 'name')
    const newName = 'John Smith'
    fireEvent.change(inputTextName, { target: { value: newName } })

    expect(inputTextName.value).toBe(newName)
  })
})

describe('useFormErrors - input', () => {
  it('renders initially with no errors', () => {
    const { container } = render(<TestInput initialValue="" />)

    const errors = queryByTestId(container, 'name-error')

    expect(errors).toBeNull()
  })

  test('validateInputValue(string)', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const validateInputValueButton = getByTestId(
      container,
      'validateInputValueButton'
    )
    fireEvent.click(validateInputValueButton)

    const errors = getByTestId(container, 'name-error')
    const errorMessage = errors.childNodes[0].textContent
    const inputIsValid = getByTestId(container, 'inputIsValid').textContent

    expect(errors.childNodes).toHaveLength(1)
    expect(errorMessage).toMatch('required')
    expect(inputIsValid).toBe(String(false))
  })

  test('validateInputValue(event)', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const inputTextName = getByTestId(container, 'name')
    fireEvent.blur(inputTextName)

    const errors = getByTestId(container, 'name-error')
    const errorMessage = errors.childNodes[0].textContent

    expect(errors.childNodes).toHaveLength(1)
    expect(errorMessage).toMatch('required')
  })

  test('clearInputError(string)', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const inputTextName = getByTestId(container, 'name')
    fireEvent.blur(inputTextName)

    const clearInputErrorButton = getByTestId(
      container,
      'clearInputErrorButton'
    )
    fireEvent.click(clearInputErrorButton)

    const errors = queryByTestId(container, 'name-error')

    expect(errors).toBeNull()
  })

  test('clearInputError(event)', () => {
    const { container } = render(
      <TestInput
        initialValue=""
        onBlurMethod="clear"
        formValidations={{ name: [required] }}
      />
    )

    const setInputErrorButton = getByTestId(container, 'setInputErrorButton')
    fireEvent.click(setInputErrorButton)

    const inputTextName = getByTestId(container, 'name')
    fireEvent.blur(inputTextName)

    const errors = queryByTestId(container, 'name-error')

    expect(errors).toBeNull()
  })

  test('setInputError', () => {
    const { container } = render(
      <TestInput initialValue="" customErrorMessage="Whoops!" />
    )

    const setInputErrorButton = getByTestId(container, 'setInputErrorButton')
    fireEvent.click(setInputErrorButton)

    const errors = queryByTestId(container, 'name-error')
    const errorMessage = errors.childNodes[0].textContent

    expect(errors.childNodes).toHaveLength(1)
    expect(errorMessage).toMatch('Whoops!')
  })

  test('setInputError - jsx', () => {
    const { container } = render(
      <TestInput
        initialValue=""
        customErrorMessage={
          <p>
            <strong>Error</strong>
            <span data-testid="inner-message">Whoops!</span>
          </p>
        }
      />
    )

    const setInputErrorButton = getByTestId(container, 'setInputErrorButton')
    fireEvent.click(setInputErrorButton)

    const errorContainer = queryByTestId(container, 'name-error')
    const errorMessage = errorContainer.getElementsByTagName('span').item(0)
      .childNodes[0].textContent

    expect(errorContainer.childNodes).toHaveLength(1)
    expect(errorMessage).toMatch('Whoops!')
  })
})

TestForm.propTypes = {
  initialFormValues: object.isRequired,
  newFormValues: object,
}

function TestForm({ initialFormValues, newFormValues }) {
  const {
    formValues,
    resetFormValues,
    setInputValue,
    setFormValues,
  } = useFormValues(initialFormValues)

  const {
    formErrors,
    numberOfErrors,
    validateForm,
    clearFormErrors,
  } = useFormErrors({ name: [required], email: [required] })

  const [formIsValid, setFormIsValid] = useState(true)

  function validate() {
    setFormIsValid(validateForm(formValues))
  }

  return (
    <>
      <span data-testid="numberOfErrors">{numberOfErrors}</span>
      <span data-testid="formIsValid">{formIsValid.toString()}</span>
      <InputText
        name="name"
        label="Name"
        type="text"
        value={formValues.name}
        onChange={setInputValue}
        error={formErrors.name}
      />
      <InputText
        name="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={setInputValue}
        error={formErrors.email}
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
            email: newFormValues.email,
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

    const nameErrors = getByTestId(container, 'name-error')
    const emailErrors = getByTestId(container, 'email-error')
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

    const nameErrors = queryByTestId(container, 'name-error')
    const emailErrors = queryByTestId(container, 'email-error')
    const numberOfErrors = getByTestId(container, 'numberOfErrors').textContent

    expect(nameErrors).toBeNull()
    expect(emailErrors).toBeNull()
    expect(numberOfErrors).toBe(String(0))
  })
})
