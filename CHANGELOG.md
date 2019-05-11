# 3.0.0 (May 10, 2019)

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
