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

import { NamedNode, Term } from "@rdfjs/types";

/**
 * @internal Library users shouldn't need to be exposed to raw Terms.
 * @param value The value that might or might not be a Term.
 * @returns Whether `value` is a Term.
 */
export function isTerm<T>(value: T | Term): value is Term {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Term).termType === "string" &&
    typeof (value as Term).value === "string" &&
    typeof (value as Term).equals === "function"
  );
}

/**
 * @internal Library users shouldn't need to be exposed to raw NamedNodes.
 * @param value The value that might or might not be a Named Node.
 * @returns Whether `value` is a Named Node.
 */
export function isNamedNode<T>(value: T | NamedNode): value is NamedNode {
  return isTerm(value) && value.termType === "NamedNode";
}

export class SolidError extends Error {
  description?: string;

  url = "https://inrupt.com/generic-error";

  cause?: Error | SolidError;

  constructor(description?: string, cause?: Error | SolidError) {
    super();

    if (description) {
      this.description = description;
      this.message = `${description} : read more at ${this.url}.`;
    } else {
      this.message = `Read more at ${this.url}.`;
    }

    if (cause) {
      this.cause = cause;
      this.message += ` Preceding error : ${cause.message}`;
    }
  }
}

export class ThingExpectedError extends SolidError {
  description?: string;

  url = "https://inrupt.com/thing-expected-error";

  cause?: Error | SolidError;

  receivedValue: unknown;

  constructor(
    // eslint-disable-next-line
    receivedValue: any,
    description?: string,
    cause?: Error | SolidError
  ) {
    super(description, cause);
    this.receivedValue = receivedValue;

    this.message = this.message.replace(
      "generic-error",
      "thing-expected-error"
    );

    this.message += ` Expected a Thing, but received: ${receivedValue}.`;
  }
}

export class FetchError extends SolidError {
  description?: string;

  url = "https://inrupt.com/fetch-error";

  cause?: Error | SolidError;

  urlReturned: string;

  statusCode: string;

  statusText: string;

  fetchDescription: string;

  response: string;

  constructor(
    urlReturned: string,
    statusCode: string,
    statusText: string,
    fetchDescription: string,
    response: string,
    description?: string,
    cause?: Error | SolidError
  ) {
    super(description, cause);
    this.response = response;
    this.urlReturned = urlReturned;
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.fetchDescription = fetchDescription;
    this.message = this.message.replace("generic-error", "fetch-error");
    this.message += ` Unable to fetch ${fetchDescription}: ${urlReturned} returned [${statusCode}] ${statusText}`;
  }
}

export class NotImplementedError extends SolidError {
  description?: string;

  url = "https://inrupt.com/not-implemented-error";

  cause?: Error | SolidError;

  constructor(description?: string, cause?: Error | SolidError) {
    super(description, cause);

    this.message = this.message.replace(
      "generic-error",
      "not-implemented-error"
    );
  }
}

export class ValidPropertyUrlExpectedError extends SolidError {
  description?: string;

  url = "https://inrupt.com/valid-property-url-expected-error";

  cause?: Error | SolidError;

  receivedValue: unknown;

  // eslint-disable-next-line
  constructor(receivedValue: any, description?: string, cause?: Error) {
    super(description, cause);

    const value = isNamedNode(receivedValue)
      ? receivedValue.value
      : receivedValue;

    this.message = this.message.replace(
      "generic-error",
      "valid-property-url-expected-error"
    );

    this.message += ` Expected a valid URL to identify a property, but received: [${value}].`;
    this.receivedValue = value;
  }
}
