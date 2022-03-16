# solid-client-errors API

_A library providing meaningful and intuitive error handling._

## Goals

This library aims to provide an intuitive mechanism to help identify errors more easily. In its simplest form, this will be a class for each type of error, with a URL attribute to help easily identify the exact type of issue. Alongside the traditional error identifying methods (line number, file name), a description attribute will also be included, detailing the type of error and why it happened. This library will also allow nested errors by including an optional cause error attribute. The preceding error can be easily assigned to the most recent error, making it far more simple for developers to find the root cause of their issues. Errors thrown will be of type `SolidError` so can therefore be distinguished from errors that have occurred at lower levels (likely as a result of external libraries).

## Implementation

The implementation will be broken down into two steps, the generic `SolidError` declaration and the specific error class declaration, extending the `SolidError` class.

### Generic SolidError class

`SolidError` extends the Error class in order to maintain the `Error` class's base functionality, namely the methods and properties. `SolidError` can be used for a general error if support has not yet been added for the specific error you require.

### Specific errors extending SolidError

Specific errors extend the `SolidError` error class. This gives them a baseline structure but also makes errors of type `SolidError`, allowing them to be differentiated from internal library based errors.

Errors currently supported:

- `ThingExpectedError`
- `FetchError`
- `NotImplementedError`
- `ValidPropertyURlExpectedError`

## Usage

For each error type, here are the parameters:

    SolidError(
      description:  string,
      cause?:  Error
    )

    ThingExpectedError(
      description:  string,
      receivedValue:  any,
      cause?:  Error
    )

    FetchError(
      description:  string,
      urlReturned:  string,
      statusCode:  string,
      statusText:  string,
      fetchDescription:  string,
      response:  string,
      cause?:  Error
    )

    NotImplementedError(
      description:  string,
      cause?:  Error
    )

    ValidPropertyUrlExpectedError(
      description:  string,
      receivedValue:  any,
      cause?:  Error
    )

Errors in this library can be thrown in the same way as any error, for example:

    import SolidError from "@inrupt/solid-client-errors";

    ...

    try{
      loadResource();
    } catch(e){
      throw new SolidError("Unable to load resource", e);
    }

## License

MIT © [Inrupt](https://inrupt.com)
