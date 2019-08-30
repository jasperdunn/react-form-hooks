# 4.3.1 (2019-08-30)

## Maintenance

Updated documentation, example and test form fields to map directly to `name` rather than `id`. The fields were mapping `id` to both `id` and `name` props, I have since realised that this isn't a cool thing to do :P

Just so that everyone is clear, this package maps formValues to `name` and not `id`! Apologies for any confusion.

# 4.3.0 (2019-08-24)

## Features

- `validateInputValue` has been extended to return a boolean.

# 4.2.0 (2019-08-10)

## Features

- `setInputValue` has been extended to accept a `React.SyntheticEvent` and can be used in place of `updateInputValue`.

- `validateInputValue` has been extended to accept `input: String|React.SyntheticEvent` and optional `value` so an input can now be validated without using an event.

- `clearInputErrors` has been extended to accept a `React.SyntheticEvent`.

## Deprecated

- `updateInputValue` has been made redundant. Please use `setInputValue` instead, which has been extended to accept a `React.SyntheticEvent`.

  - note: this is not a breaking change, `updateInputValue` will be removed in 5.0.0.

# 4.1.0 (2019-06-01)

## Features

- Created a test suite and setup automated code coverage reporting and testing.

# 4.0.0 (2019-05-19)

## Breaking changes

`formErrors` used to be an empty object until validation. This caused issues when accessing only one error.

e.g. implementations like this, which should be valid

```js
<input error={formErrors.username[0]}>
```

had to be written like this to prevent errors

```js
<input error={formErrors.username && formErrors.username[0]}>
```

Now, its initialised based on the `formValidations` object.

```js
{ username: [], password: [] }
```

This means that if you had previously written input field errors by checking if `errors` was truthy, you will now have to check the length as well. This new implementation makes more sense semantically as an empty list should be `[]` and not `null` or `undefined`.

e.g.

```js
{
  errors && errors.length > 0 && (
    <ul
      style={{
        color: 'red',
        margin: '8px 0',
        padding: 0,
        listStyle: 'none'
      }}
    >
      {errors.map((error, index) => (
        <li key={index}>- {error}</li>
      ))}
    </ul>
  )
}
```

# 3.1.0 (2019-05-19)

## Features

- `setFormValues` is now exposed, this function is the React.useState 'set' function for formValues, useful when setting multiple values at once or updating the form values via props.

---

# 3.0.1 (2019-05-11)

## Features

- `validateForm` now returns `formIsValid`, a boolean value, this value can be used to check for errors before submitting the form.

## Breaking changes

- `setFormErrors(formErrors)` has been deprecated, input errors should be set via `setInputErrors` or via form and input validate functions.
- `formValidations` used to check null values, now validation functions must return a string or have no return value (undefined).

## Bug Fixes

- useFormValues
  - `resetInputValue(name)` now correctly resets the field to it's initial values rather than to an empty string.

## Maintenance

- Renaming internal functions.
- Cleaning up JSDocs, using more consistent naming.
