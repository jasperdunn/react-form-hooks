# React Form Hooks

## Flexible agnostic functions to help you build forms in React

## Installation

`yarn add @jasperdunn/react-form-hooks`

## Why I started the project

After discovering the freedom and power of React hooks,
I wanted to create a flexible modular suite of functions that can help us create forms
with whichever components we want, however we want!

There are many excellent react form packages out there, however I haven't yet found one that doesn't
end up pulling you in a certain direction or way of working.

I want to be able to use simple stateless components in my forms, utilising agnostic
functions that don't care what your component structure looks like.

## What it looks like

> JSX components not included.

```
import { useFormValues, useFormErrors } from "@jasperdunn/react-form-hooks"

export default function MyForm() {
  const { formValues, changeInputValue } = useFormValues({
    email: '',
    password: ''
  })

  const formValidations = {
    email: [required, email],
    password: [required, alphanumeric, value => minLength(value, 6)],
  }

  const {
    formErrors,
    validateForm,
    validateInputValue
  } = useFormErrors(formValidations)

return (
    <form
      onSubmit={event => submit(event, validateForm, formValues, formErrors)}
    >
      <h1>Form with hooks</h1>
      <InputText
        id="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={changeInputValue}
        onBlur={validateInputValue}
        errors={formErrors.email}
      />
      <InputText
        id="password"
        label="Password"
        type="password"
        value={formValues.password}
        onChange={changeInputValue}
        onBlur={validateInputValue}
        errors={formErrors.password}
      />
      <button type="submit">Create some hooks!</button>
    </form>
  )
}
```

## useFormValues

```
const {
  formValues,
  changeInputValue,
  resetFormValues,
  resetInputValue
} = useFormValues(initialState)
```

Where

- `formValues` object containing your input values
- `changeInputValue(event)` function that updates the state when triggering an onChange, onBlur, onFocus etc.
- `resetFormValues` ...what it says
- `resetInputValue(inputName)` ...what it says

## useFormErrors(formValidations)

```
const {
  formErrors,
  numberOfErrors,
  validateForm,
  validateInputValue,
  clearFormErrors,
  clearInputErrors
} = useFormErrors(formValidations)
```

Where

- `formErrors` object where each key is mapped to a form input and the value is the input's errors as an array of strings.
- `numberOfErrors` ...what it says
- `validateForm` function that loops through the form and validates all of the form inputs and setting the formErrors state.
- `validateInputValue(event)` function that validates a form input and sets the formErrors state.
- `clearFormErrors` ...what it says
- `clearInputErrors(inputName)` ...what it says

### formValidations

```
const formValidations = {
  formInputName: [array, of, validation, functions]
}
```

- `formValidations` object where each key is mapped to a form input and the value is an array of validation functions.

Each validation function must return a string as the error message or null/undefined.

## License

MIT © [jasperdunn](https://github.com/jasperdunn)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
