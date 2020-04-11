# React Form Hooks

## Flexible agnostic functions to help you build forms in React

[![npm version](https://img.shields.io/npm/v/@jasperdunn/react-form-hooks.svg?color=%232c8ebb&style=flat-square)](https://www.npmjs.com/package/@jasperdunn/react-form-hooks)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jasperdunn/react-form-hooks.svg?color=rgb%28113%2C%20138%2C%20240%29&label=gzipped&style=flat-square)
[![MIT license](https://img.shields.io/npm/l/@jasperdunn/react-form-hooks.svg?color=%233DA639&style=flat-square)](http://opensource.org/licenses/MIT)
[![coverage status](https://img.shields.io/coveralls/github/jasperdunn/react-form-hooks.svg?style=flat-square)](https://coveralls.io/github/jasperdunn/react-form-hooks?branch=master)
[![travis](https://img.shields.io/travis/jasperdunn/react-form-hooks.svg?style=flat-square)](https://travis-ci.org/jasperdunn/react-form-hooks)

`yarn add @jasperdunn/react-form-hooks`

Try out a simple [form](https://jasperdunn.github.io/react-form-hooks/)

Play in a [sandbox](https://codesandbox.io/s/937p7o6plp)

See the [changelog](https://github.com/jasperdunn/react-form-hooks/blob/master/CHANGELOG.md)

## Why I started the project

After discovering the freedom and power of React hooks,
I wanted to create a flexible suite of functions that can help create forms
with whichever components we want, however we want!

There are many excellent react form packages out there, however I hadn't yet found one that didn't end up pulling me in a certain direction or way of working.

I wanted to be able to use simple, stateless, controlled components in my forms, utilizing agnostic functions that didn't care which components I used or how they were structured.

## What it looks like

> JSX components not included.

```
import { useFormValues, useFormErrors } from "@jasperdunn/react-form-hooks"

export default function MyForm() {
  const { formValues, setInputValue } = useFormValues({
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
        name="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={setInputValue}
        onBlur={validateInputValue}
        error={formErrors.email}
      />
      <InputText
        name="password"
        label="Password"
        type="password"
        value={formValues.password}
        onChange={setInputValue}
        onBlur={validateInputValue}
        error={formErrors.password}
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
  setInputValue,
  setFormValues
} = useFormValues(initialState)
```

Where

- `formValues` - Object where each key is the input name and each value is the input value.
- `resetFormValues` - Function that resets the form values to the initial state.
- `resetInputValue(name)` - Function that resets the input value to it's initial state.
- `setInputValue(input, value?)` - Function that updates an input value via an event handler or passing the new value and the input's name.
- `setFormValues(formValues)` - Function that updates the form values.

## useFormErrors

```
const {
  formErrors,
  numberOfErrors,
  validateForm,
  validateInputValue,
  clearFormErrors,
  clearInputError,
  setInputError
} = useFormErrors(formValidations)
```

Where

- `formErrors` - Object where each key is the form input name, and each value is an error message (string/jsx).
- `numberOfErrors` - Number of inputs that have errors.
- `validateForm` - Function that runs validation on the whole form, returns formIsValid (boolean).
- `validateInputValue(input, value?)` - Function that runs validation on an input, returns inputIsValid (boolean).
- `clearFormErrors` - Function that clears the form errors.
- `clearInputError(input)` - Function that clears the error for an input via an event handler or the input's name.
- `setInputError(name, error)` - Function that sets the error for an input.

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
