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
    super(cause);
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

export class ValidPropertyUrlExpectedError extends SolidError {
  cause: string;

  url: string;

  child?: Error;

  receivedValue: unknown;

  constructor(cause: string, receivedValue: any, child?: Error) {
    const url = "https://inrupt.com/valid-property-url-expected-error";
    const value = isNamedNode(receivedValue)
      ? receivedValue.value
      : receivedValue;

    super(cause);
    this.message = `${cause} : read more at ${url}.`;
    this.message += ` Expected a valid URL to identify a property, but received: [${value}].`;
    this.url = url;
    this.cause = cause;
    this.receivedValue = value;

    if (child) {
      this.child = child;
      this.message += ` Preceding error : ${child.message}`;
    }
  }
}
