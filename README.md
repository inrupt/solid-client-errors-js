# Solid JavaScript Error - solid-client-errors

[![Contributor
Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE-OF-CONDUCT.md)

This project adheres to the Contributor Covenant [code of
conduct](CODE-OF-CONDUCT.md). By participating, you are expected to uphold this
code. Please report unacceptable behavior to
[engineering@inrupt.com](mailto:engineering@inrupt.com).

`@inrupt/solid-client-errors` is a JavaScript library for handling [RFC9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) on HTTP error responses.

# Server support

This feature is currently available in ESS. Servers implementing [RFC9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) will be supported too.

# Supported environments

Our JavaScript Client Libraries use relatively modern JavaScript, aligned with
the [ES2020](https://262.ecma-international.org/11.0/) Specification features, we
ship both [ESM](https://nodejs.org/docs/latest-v16.x/api/esm.html) and
[CommonJS](https://nodejs.org/docs/latest-v16.x/api/modules.html), with type
definitions for TypeScript alongside.

This means that out of the box, we only support environments (browsers or
runtimes) that were released after mid-2020, if you wish to target other (older)
environments, then you will need to cross-compile our SDKs via the use of
[Babel](https://babeljs.io), [webpack](https://webpack.js.org/),
[SWC](https://swc.rs/), or similar.

If you need support for Internet Explorer, it is recommended to pass them
through a tool like [Babel](https://babeljs.io), and to add polyfills for e.g.
`Map`, `Set`, `Promise`, `Headers`, `Array.prototype.includes`, `Object.entries`
and `String.prototype.endsWith`.

## Node.js Support

See [Inrupt Solid Javascript Client
Libraries](https://docs.inrupt.com/developer-tools/javascript/client-libraries/#node-js-support).

# Installation

For the latest stable version of solid-client-errors:

```bash
npm install @inrupt/solid-client-errors
```

# Issues & Help

## Solid Community Forum

If you have questions about working with Solid or just want to share what you’re
working on, visit the [Solid forum](https://forum.solidproject.org/). The Solid
forum is a good place to meet the rest of the community.

## Bugs and Feature Requests

- For public feedback, bug reports, and feature requests please file an issue
  via [GitHub](https://github.com/inrupt/solid-client-errors-js/issues/).
- For non-public feedback or support inquiries please use the
  [Inrupt Service Desk](https://inrupt.atlassian.net/servicedesk).

## Examples

Integrators of this library will generally use the following pattern to throw
a subclass of `ClientHttpError`, corresponding to the response status.

```javascript
import { handleErrorResponse } from "@inrupt/solid-client-errors";

const response = await fetch(url, options);

if (response.status !== 200) {
  const responseBody = await response.text();
  throw handleErrorResponse(
    response,
    responseBody,
    "application error message",
  );
}
```

The specific error type corresponds to the HTTP status code in the response, each of
which implements the `WithProblemDetails` type.

- 400: `BadRequestError`
- 401: `UnauthorizedError`
- 403: `ForbiddenError`
- 404: `NotFoundError`
- 405: `MethodNotAllowedError`
- 406: `NotAcceptableError`
- 409: `ConflictError`
- 410: `GoneError`
- 412: `PreconditionFailedError`
- 415: `UnsupportedMediaTypeError`
- 429: `TooManyRequestsError`
- 500: `InternalServerError`

Each error includes a `problemDetails` field with the following properties:

- `type: URL`: The specific error type. By default, this is `about:blank`.
- `title: string`: A short description of the problem.
- `status: number`: The error response status code.
- `detail?: string`: A longer description of the problem.
- `instance?: URL`: A unique URL identifying the problem occurrence.

Consumers of these errors may handle the `ProblemDetails` data in the following way:

```javascript
const res = await getFile(url, options)
  .then((file) => { /* Do something after a successful request */ }
  .catch((err) => {
    if (hasProblemDetails(err)) {
      const problems = err.problemDetails;
      /* Do something with the details of the failed request */
    } else {
      /* Do something with a generic error message */
    }
  });
```

## Documentation

- [Inrupt Solid Javascript Client Libraries](https://docs.inrupt.com/developer-tools/javascript/client-libraries/)
- [Homepage](https://docs.inrupt.com/)
- [Security policy and vulnerability reporting](./SECURITY.md)

# Changelog

See [the release notes](https://github.com/inrupt/solid-client-js/blob/main/CHANGELOG.md).
