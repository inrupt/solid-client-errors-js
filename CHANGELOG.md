# Changelog

This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased changes

### Bugfix

- `hasErrorResponse` and `hasProblemDetails` now check of `undefined` and `null`, preventing runtime errors.

### New Features

- Node 22 is now supported

## [0.0.1](https://github.com/inrupt/solid-client-errors-js/releases/tag/v0.0.1) - 2024-07-03

### New Features

- `InruptClientError`: Superclass for all Inrupt client libraries runtime errors.
- `ClientHttpError`, `hasProblemDetails`, `hasErrorResponse`: Class for runtime error
  thrown upon reception of an HTTP error response, i.e. 4xx and 5xx ranges. The two
  associated type guards are available to test for the presence of the specific properties
  exposed by the class.
- `BadRequestError`, `ConflictError`, `ForbiddenError`, `GoneError`, `InternalServerError`,
  `MethodNotAllowedError`, `NotAcceptableError`, `NotFoundError`, `PreconditionFailedError`,
  `TooManyRequestsError`, `UnauthorizedError`, `UnsupportedMediaTypeError`: Specializations
  of the `ClientHttpError` to represent common HTTP error responses.
- `handleErrorResponse`: a function to map the received HTTP error to the appropriate error
  class.
