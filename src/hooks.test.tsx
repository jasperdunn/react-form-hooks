import { useState } from 'react'
import {
  render,
  getByTestId,
  fireEvent,
  queryByTestId,
} from '@testing-library/react'
import { useFormValues, useFormErrors, FormValidations } from './index'
import { InputText } from '../example/src/InputText'
import { required } from '../example/src/validation'
import { InputError } from 'types'

type TestInputProps = {
  initialValue: string
  newValue?: string
  formValidations?: FormValidations<'name'>
  customErrorMessage?: InputError
  onBlurMethod?: 'validate' | 'clear'
}

function TestInput({
  initialValue,
  newValue,
  formValidations,
  customErrorMessage,
  onBlurMethod = 'validate',
}: TestInputProps): JSX.Element {
  const initialFormValues = { name: initialValue }
  const { formValues, resetInputValue, setInputValue } =
    useFormValues(initialFormValues)
  const { formErrors, validateInputValue, clearInputError, setInputError } =
    useFormErrors(formValidations)
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

describe('useFormHooks - input values', () => {
  it('renders with its initial form value', () => {
    const initialValue = ''
    const { container } = render(<TestInput initialValue={initialValue} />)

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement

    expect(inputTextName.value).toBe(initialValue)
  })

  test('setInputValue', () => {
    const { container } = render(<TestInput initialValue="" />)

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement
    const newName = 'John Smith'
    fireEvent.change(inputTextName, { target: { value: newName } })

    expect(inputTextName.value).toBe(newName)
  })

  test('resetInputValue', () => {
    const initialValue = 'John Smith'
    const { container } = render(<TestInput initialValue={initialValue} />)

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement
    const newName = 'Bob Brown'
    fireEvent.change(inputTextName, { target: { value: newName } })

    const resetButton = getByTestId(container as HTMLElement, 'resetButton')
    fireEvent.click(resetButton)

    expect(inputTextName.value).toBe(initialValue)
  })

  test('setInputValue(string)', () => {
    const newValue = 'Bob Brown'
    const { container } = render(
      <TestInput initialValue="John Smith" newValue={newValue} />
    )

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement

    const setButton = getByTestId(container as HTMLElement, 'setButton')
    fireEvent.click(setButton)

    expect(inputTextName.value).toBe(newValue)
  })

  test('setInputValue(event)', () => {
    const { container } = render(<TestInput initialValue="" />)

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement
    const newName = 'John Smith'
    fireEvent.change(inputTextName, { target: { value: newName } })

    expect(inputTextName.value).toBe(newName)
  })
})

describe('useFormHooks - input errors', () => {
  it('renders initially with no errors', () => {
    const { container } = render(<TestInput initialValue="" />)

    const error = queryByTestId(container as HTMLElement, 'name-error')

    expect(error).toBeNull()
  })

  test('isInputValid(string)', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const validateInputValueButton = getByTestId(
      container as HTMLElement,
      'validateInputValueButton'
    )
    fireEvent.click(validateInputValueButton)

    const error = getByTestId(container as HTMLElement, 'name-error')
    const errorMessage = error.textContent
    const inputIsValid = getByTestId(
      container as HTMLElement,
      'inputIsValid'
    ).textContent

    expect(error).toBeInTheDocument()
    expect(errorMessage).toBe('This field is required.')
    expect(inputIsValid).toBe(String(false))
  })

  test('isInputValid(event)', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const inputTextName = getByTestId(container as HTMLElement, 'name')
    fireEvent.blur(inputTextName)

    const error = getByTestId(container as HTMLElement, 'name-error')
    const errorMessage = error.textContent

    expect(error).toBeInTheDocument()
    expect(errorMessage).toBe('This field is required.')
  })

  test('isInputValid(event) - no validation functions', () => {
    const { container } = render(<TestInput initialValue="" />)

    const inputTextName = getByTestId(container as HTMLElement, 'name')
    fireEvent.blur(inputTextName)

    const error = queryByTestId(container as HTMLElement, 'name-error')

    expect(error).not.toBeInTheDocument()
  })

  test('clearInputError(string)', () => {
    const { container } = render(
      <TestInput initialValue="" formValidations={{ name: [required] }} />
    )

    const inputTextName = getByTestId(container as HTMLElement, 'name')
    fireEvent.blur(inputTextName)

    const clearInputErrorButton = getByTestId(
      container as HTMLElement,
      'clearInputErrorButton'
    )
    fireEvent.click(clearInputErrorButton)

    const error = queryByTestId(container as HTMLElement, 'name-error')

    expect(error).not.toBeInTheDocument()
  })

  test('clearInputError(event)', () => {
    const { container } = render(
      <TestInput
        initialValue=""
        onBlurMethod="clear"
        formValidations={{ name: [required] }}
      />
    )

    const setInputErrorButton = getByTestId(
      container as HTMLElement,
      'setInputErrorButton'
    )
    fireEvent.click(setInputErrorButton)

    const inputTextName = getByTestId(container as HTMLElement, 'name')
    fireEvent.blur(inputTextName)

    const error = queryByTestId(container as HTMLElement, 'name-error')

    expect(error).not.toBeInTheDocument()
  })

  test('setInputError', () => {
    const { container } = render(
      <TestInput initialValue="" customErrorMessage="Whoops!" />
    )

    const setInputErrorButton = getByTestId(
      container as HTMLElement,
      'setInputErrorButton'
    )
    fireEvent.click(setInputErrorButton)

    const error = queryByTestId(container as HTMLElement, 'name-error')
    const errorMessage = error?.textContent

    expect(error).toBeInTheDocument()
    expect(errorMessage).toBe('Whoops!')
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

    const setInputErrorButton = getByTestId(
      container as HTMLElement,
      'setInputErrorButton'
    )
    fireEvent.click(setInputErrorButton)

    const error = queryByTestId(container as HTMLElement, 'name-error')
    const errorMessage = queryByTestId(
      container as HTMLElement,
      'inner-message'
    )?.textContent

    expect(error).toBeInTheDocument()
    expect(errorMessage).toBe('Whoops!')
  })
})

type TestFormProps = {
  initialFormValues: { name: string; email: string }
  newFormValues?: { name: string; email: string }
  formValidations?: FormValidations<'name' | 'email'>
}

function TestForm({
  initialFormValues,
  newFormValues,
  formValidations,
}: TestFormProps): JSX.Element {
  const { formValues, resetFormValues, setInputValue, setFormValues } =
    useFormValues<{ name: string; email: string }>(initialFormValues)

  const { formErrors, numberOfErrors, validateForm, clearFormErrors } =
    useFormErrors<'name' | 'email'>(formValidations)

  const [formIsValid, setFormIsValid] = useState(true)

  function validate(): void {
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
            name: newFormValues?.name || '',
            email: newFormValues?.email || '',
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

describe('useFormHooks - form values', () => {
  test('setFormValues', () => {
    const newFormValues = { name: 'Bob Brown', email: 'bob@email.com' }

    const { container } = render(
      <TestForm
        initialFormValues={{ name: 'John Smith', email: 'john@email.com' }}
        newFormValues={newFormValues}
      />
    )

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement
    const inputTextEmail = getByTestId(
      container as HTMLElement,
      'email'
    ) as HTMLInputElement
    const setButton = getByTestId(container as HTMLElement, 'setButton')

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

    const inputTextName = getByTestId(
      container as HTMLElement,
      'name'
    ) as HTMLInputElement
    const inputTextEmail = getByTestId(
      container as HTMLElement,
      'email'
    ) as HTMLInputElement
    const setButton = getByTestId(container as HTMLElement, 'setButton')
    const resetButton = getByTestId(container as HTMLElement, 'resetButton')

    fireEvent.click(setButton)
    fireEvent.click(resetButton)

    expect(inputTextName.value).toBe(initialFormValues.name)
    expect(inputTextEmail.value).toBe(initialFormValues.email)
  })
})

describe('useFormHooks - form errors', () => {
  test('isFormValid', () => {
    const { container } = render(
      <TestForm
        initialFormValues={{ name: '', email: '' }}
        formValidations={{ name: [required], email: [required] }}
      />
    )

    const validateFormButton = getByTestId(
      container as HTMLElement,
      'validateFormButton'
    )
    fireEvent.click(validateFormButton)

    const nameError = getByTestId(container as HTMLElement, 'name-error')
    const emailError = getByTestId(container as HTMLElement, 'email-error')
    const numberOfErrors = getByTestId(
      container as HTMLElement,
      'numberOfErrors'
    ).textContent
    const formIsValid = getByTestId(
      container as HTMLElement,
      'formIsValid'
    ).textContent

    expect(nameError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
    expect(numberOfErrors).toBe(String(2))
    expect(formIsValid).toBe(String(false))
  })

  test('isFormValid - with no validation functions', () => {
    const { container } = render(
      <TestForm initialFormValues={{ name: '', email: '' }} />
    )

    const validateFormButton = getByTestId(
      container as HTMLElement,
      'validateFormButton'
    )
    fireEvent.click(validateFormButton)

    const nameError = queryByTestId(container as HTMLElement, 'name-error')
    const emailError = queryByTestId(container as HTMLElement, 'email-error')
    const numberOfErrors = queryByTestId(
      container as HTMLElement,
      'numberOfErrors'
    )?.textContent
    const formIsValid = queryByTestId(
      container as HTMLElement,
      'formIsValid'
    )?.textContent

    expect(nameError).not.toBeInTheDocument()
    expect(emailError).not.toBeInTheDocument()
    expect(numberOfErrors).toBe(String(0))
    expect(formIsValid).toBe(String(true))
  })

  test('clearFormErrors', () => {
    const { container } = render(
      <TestForm
        initialFormValues={{ name: '', email: '' }}
        formValidations={{ name: [required], email: [required] }}
      />
    )

    const validateFormButton = getByTestId(
      container as HTMLElement,
      'validateFormButton'
    )
    fireEvent.click(validateFormButton)

    const clearFormErrorsButton = getByTestId(
      container as HTMLElement,
      'clearFormErrorsButton'
    )
    fireEvent.click(clearFormErrorsButton)

    const nameError = queryByTestId(container as HTMLElement, 'name-error')
    const emailError = queryByTestId(container as HTMLElement, 'email-error')
    const numberOfErrors = getByTestId(
      container as HTMLElement,
      'numberOfErrors'
    ).textContent

    expect(nameError).not.toBeInTheDocument()
    expect(emailError).not.toBeInTheDocument()
    expect(numberOfErrors).toBe(String(0))
  })
})
