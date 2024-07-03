//
// Copyright Inrupt Inc.
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
//
import { describe, it, expect } from "@jest/globals";
import { mockResponse } from "./wellKnown.mock";
import {
  TooManyRequestsError,
  TOO_MANY_REQUESTS_STATUS,
} from "./tooManyRequestsError";

describe("TooManyRequestsError", () => {
  it("builds an Error object when provided an response with status 429", () => {
    const response = mockResponse({ status: TOO_MANY_REQUESTS_STATUS });
    const e = new TooManyRequestsError(
      response,
      "Some response body",
      "Some error message",
    );
    expect(e.response.status).toBe(TOO_MANY_REQUESTS_STATUS);
  });

  it("throws when provided a status code not equal to 429", () => {
    const response = mockResponse({ status: 499 });
    expect(() => {
      // The object is built to check an error is thrown.
      // eslint-disable-next-line no-new
      new TooManyRequestsError(
        response,
        "Some response body",
        "Some error message",
      );
    }).toThrow();
  });
});
