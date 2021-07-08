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

class SolidError extends Error {
  constructor(cause, child){
    super();
    this.url = "https://inrupt.com/generic-error-url";
    if (cause){
      this.cause = cause;
      this.message = `${cause} : read more at ${this.url}.`;
    }
    if (child){
      this.child = child;
      this.message = this.message + ` Preceding error : ${child.message}`;
    }
  }
}

// class ThingExpectedError extends SolidError {
//   constructor(cause, child, receivedValue) {
//     const url = "https://inrupt.com/thing-expected-error-url";
//     super(cause, child);
//     this.url = url;
//     this.receivedValue = receivedValue;
//     this.message = `Expected a Thing, but received: [${receivedValue}].`;
//   }
// }

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

// export class NotImplementedError extends Error {
//   url = "https://inrupt.com/not-implemented-error";

//   constructor(cause, child, message = "Not implemented by base class") {
//     super(message);
//   }
// }

// export class FetchError extends SolidError {
//   url = "https://inrupt.com/fetch-error";

//   constructor(
//     cause,
//     child,
//     urlReturned,
//     statusCode,
//     statusText,
//     fetchDescription,
//     response
//   ) {
//     super(statusText);
//     this.message = `Unable to fetch ${fetchDescription}: ${urlReturned} returned [${statusCode}] ${statusText}`;
//     this.response = response;
//   }
// }

module.exports.SolidError = SolidError;
  