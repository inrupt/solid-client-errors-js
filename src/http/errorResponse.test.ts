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
import { hasErrorResponse } from "./errorResponse";
import { mockErrorResponse } from "./errorResponse.mock";

describe("hasErrorResponse", () => {
  it("returns true for correct error responses", () => {
    expect(hasErrorResponse(mockErrorResponse({}))).toBe(true);
  });

  it("returns false for error response with missing fields", () => {
    expect(hasErrorResponse(mockErrorResponse({ ok: true }))).toBe(false);
    expect(hasErrorResponse(mockErrorResponse({ status: null }))).toBe(false);
    expect(hasErrorResponse(mockErrorResponse({ statusText: null }))).toBe(
      false,
    );
    expect(hasErrorResponse(mockErrorResponse({ body: null }))).toBe(false);
    expect(hasErrorResponse(mockErrorResponse({ url: null }))).toBe(false);
  });

  it("returns false for an object not having an errorResponse entry", () => {
    expect(hasErrorResponse(new Error())).toBe(false);
  });

  it("returns false for an object having a null errorResponse entry", () => {
    const e = Object.assign(new Error(), { errorResponse: null });
    expect(hasErrorResponse(e)).toBe(false);
  });
});
