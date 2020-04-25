# 5.1.0 (2020-04-25)

## Features

- Extend Change handlers to include `HTMLTextAreaElement` and `HTMLSelectElement`.

# 5.0.5 (2020-04-25)

## DX (Developer Experience) improvements

- Complete TypeScript typings overhaul.
- Improved api naming - `validateForm` and `validateInputValue` deprecated and replaced with `isFormValid` and `isInputValid`.

# 5.0.4 (2020-04-25)

## Bug fix

- Add .npmignore file so that the typescript files are included in the npm package when published.

# 5.0.1 (2020-04-12)

## Maintenance

- Removing unused code.
- Improving tests.

# 5.0.0 (2020-04-11)

## Maintenance

- Migration to TypeScript.
- Improved documentation.

## Breaking changes

Input errors are now a single `string | JSX.Element` rather than an array. This will be an improvement to the development experience.
Nearly all implementations of input errors display a single error message rather than a list of several error messages.

### To migrate from versions < 5.0.0

All references to `setInputError` and `formErrors.inputName` should be modified to use `string | JSX.Element` instead of an array.

If need to display multiple errors, you can simply combine the different validation functions into one, and return a custom message that way.

# 4.3.1 (2019-08-30)

## Maintenance

Updated documentation, example and test form fields to map directly to `name` rather than `id`. The fields were mapping `id` to both `id` and `name` props, I have since realized that this isn't a cool thing to do :P

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

Now, its initialized based on the `formValidations` object.

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
        listStyle: 'none',
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
