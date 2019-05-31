# React Form Hooks

## Flexible agnostic functions to help you build forms in React

[![npm](https://img.shields.io/npm/v/@jasperdunn/react-form-hooks.svg?color=%232c8ebb&style=flat-square)](https://www.npmjs.com/package/@jasperdunn/react-form-hooks)
![npm bundle size](https://img.shields.io/bundlephobia/min/@jasperdunn/react-form-hooks.svg?color=rgb%28113%2C%20138%2C%20240%29&label=minified&style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jasperdunn/react-form-hooks.svg?color=rgb%28113%2C%20138%2C%20240%29&label=gzipped&style=flat-square)
[![MIT license](https://img.shields.io/npm/l/@jasperdunn/react-form-hooks.svg?color=%233DA639&style=flat-square)](http://opensource.org/licenses/MIT)

`yarn add @jasperdunn/react-form-hooks`

Try out a simple [form](https://jasperdunn.github.io/react-form-hooks/)

Play in a [sandbox](https://codesandbox.io/s/937p7o6plp)

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
  const { formValues, updateInputValue } = useFormValues({
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
      <button type="submit">Create some hooks!</button>
    </form>
  )
}
```

## useFormValues

```
const {
  formValues,
  resetFormValues,
  resetInputValue,
  updateInputValue,
  setInputValue,
  setFormValues
} = useFormValues(initialState)
```

Where

- `formValues` - Object where each key is the input name and each value is the input value.
- `resetFormValues` - Function that resets the form values to the initial state.
- `resetInputValue(name)` - Function that resets the input value to it's initial state.
- `updateInputValue(event)` - Function called via an event handler that updates an input value.
- `setInputValue(name, value)` - Function that updates an input value.
- `setFormValues(formValues)` - Function that updates the form values.

## useFormErrors

```
const {
  formErrors,
  numberOfErrors,
  validateForm,
  validateInputValue,
  clearFormErrors,
  clearInputErrors,
  setInputErrors
} = useFormErrors(formValidations)
```

Where

- `formErrors` - Object where each key is the form input name, and each value is an array of error messages (string/jsx).
- `numberOfErrors` - Number of inputs that have errors.
- `validateForm` - Function that runs validation on the whole form, returns formIsValid (boolean).
- `validateInputValue(event)` - Function that runs validation on an input.
- `clearFormErrors` - Function that clears the form errors.
- `clearInputErrors(name)` - Function that clears the errors for an input.`
- `setInputErrors(name, errors)` - Function that sets the errors for an input.

### formValidations

```
const formValidations = {
  formInputName: [array, of, validation, functions]
}
```

- `formValidations` Where each key is the form input name,
  and the value is an array of validation functions for that form input.

Each validation function must return a string as the error message or have no return value (undefined).

## License

MIT © [jasperdunn](https://github.com/jasperdunn)

---

This package is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
