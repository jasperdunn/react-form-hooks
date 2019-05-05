# React Form Hooks

## Flexible agnostic functions to help you build forms in React

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
  setInputValue
} = useFormValues(initialState)
```

Where

- `formValues` - Object where each key is the input id and the value is the current input value.
- `resetFormValues` - Function that resets the form values to the initial state.
- `resetInputValue(inputName)` - Function that resets the input value to it's initial state.
- `updateInputValue(event)` - Function called via an event handler that updates an input value.
- `setInputValue(inputName)` - Function that updates an input value.

## useFormErrors(formValidations)

```
const {
  formErrors,
  numberOfErrors,
  validateForm,
  validateInputValue,
  clearFormErrors,
  clearInputErrors,
  setFormErrors,
  setInputErrors
} = useFormErrors(formValidations)
```

Where

- `formErrors` - Object where each key is the input id and the value is an array of error messages.
- `numberOfErrors` - Number of inputs that have errors.
- `validateForm` - Function that runs validation on the whole form.
- `validateInputValue(event)` - Function that runs validation on a single input.
- `clearFormErrors` - Function that clears all the form errors.
- `clearInputErrors(inputName)` - Function that clears the inputs errors.`
- `setFormErrors(formErrors)` - Function that sets the form errors.
- `setInputErrors(inputName)` - Function that sets an inputs errors.

### formValidations

```
const formValidations = {
  formInputName: [array, of, validation, functions]
}
```

- `formValidations` Where each key is the form input id,
  and the value is an array of validation functions for that form input.

Each validation function must return a string as the error message or null/undefined.

## License

MIT © [jasperdunn](https://github.com/jasperdunn)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
