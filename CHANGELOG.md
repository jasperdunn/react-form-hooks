# 3.1.0 (2019-05-19)

## Features

- `setFormValues` is now exposed, this function is the React.useState 'set' function for formValues, useful when setting multiple values at once or updating the form values via props.

---

# 3.0.1 (2019-05-11)

## Features

- `validateForm` now returns `formIsValid`, a boolean value, this value can be used to check for errors before submitting the form.

## Deprecated

- `setFormErrors(formErrors)` has been removed, input errors should be set via `setInputErrors` or via form and input validate functions.
- `formValidations` used to check null values, now validation functions must return a string or have no return value (undefined).

## Bug Fixes

- useFormValues
  - `resetInputValue(name)` now correctly resets the field to it's initial values rather than to an empty string.

## Maintenance

- Renaming internal functions.
- Cleaning up JSDocs, using more consistent naming.
