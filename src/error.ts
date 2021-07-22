// Copyright 2021 Inrupt Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
// Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

export class SolidError extends Error {
  cause: string;

  url: string;

  child?: Error;

  constructor(cause: string, child?: Error) {
    super();
    const url = "https://inrupt.com/generic-error";
    this.cause = cause;
    this.url = url;
    this.message = `${cause} : read more at ${url}.`;

    if (child) {
      this.child = child;
      this.message += ` Preceding error : ${child.message}`;
    }
  }
}

export class ThingExpectedError extends SolidError {
  cause: string;

  url: string;

  child?: Error;

  receivedValue: unknown;

  constructor(cause: string, receivedValue: any, child?: Error) {
    const url = "https://inrupt.com/thing-expected-error";
    super(cause, child);
    this.url = url;
    this.cause = cause;
    this.receivedValue = receivedValue;
    this.message = `${cause} : read more at ${url}.`;
    this.message += ` Expected a Thing, but received: ${receivedValue}.`;

    if (child) {
      this.child = child;
      this.message += ` Preceding error : ${child.message}`;
    }
  }
}

export class FetchError extends SolidError {
  cause: string;

  url: string;

  child?: Error;

  urlReturned: string;

  statusCode: string;

  statusText: string;

  fetchDescription: string;

  response: string;

  constructor(
    cause: string,
    urlReturned: string,
    statusCode: string,
    statusText: string,
    fetchDescription: string,
    response: string,
    child?: Error
  ) {
    const url = "https://inrupt.com/fetch-error";
    super(statusText);
    this.response = response;
    this.url = url;
    this.urlReturned = urlReturned;
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.fetchDescription = fetchDescription;
    this.cause = cause;
    this.message = `${cause} : read more at ${url}.`;
    this.message += ` Unable to fetch ${fetchDescription}: ${urlReturned} returned [${statusCode}] ${statusText}`;

    if (child) {
      this.child = child;
      this.message += ` Preceding error : ${child.message}`;
    }
  }
}

export class NotImplementedError extends Error {
  cause: string;

  url: string;

  child?: Error;

  constructor(cause: string, child?: Error) {
    const url = "https://inrupt.com/not-implemented-error";
    super();
    this.message = `${cause} : read more at ${url}.`;
    this.cause = cause;
    this.url = url;

    if (child) {
      this.child = child;
      this.message += ` Preceding error : ${child.message}`;
    }
  }
}

// export class ValidPropertyUrlExpectedError extends SolidError {
//   url = "https://inrupt.com/valid-porperty-url-expected-error";

//   constructor(cause, child, receivedValue) {
//     const value = isNamedNode(receivedValue)
//     ? receivedValue.value
//     : receivedValue;
//     const message = `Expected a valid URL to identify a property, but received: [${value}].`;
//     super(message);
//     this.url = url;
//     this.receivedProperty = value;
//   }
// }
