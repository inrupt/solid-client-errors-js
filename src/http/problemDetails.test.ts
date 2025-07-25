// MIT License
//
// Copyright (c) Inrupt
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

import { describe, it, expect } from "@jest/globals";
import { hasProblemDetails } from "./problemDetails";
import { mockProblemDetails } from "./problemDetails.mock";

describe("hasProblemDetails", () => {
  it("validates a correct problem details", () => {
    expect(hasProblemDetails(mockProblemDetails({}))).toBe(true);
  });

  it("does not validate a problem details missing required fields", () => {
    expect(hasProblemDetails(mockProblemDetails({ type: null }))).toBe(false);
    expect(hasProblemDetails(mockProblemDetails({ title: null }))).toBe(false);
    expect(hasProblemDetails(mockProblemDetails({ status: null }))).toBe(false);
  });

  it("does not validate a missing problem details", () => {
    expect(hasProblemDetails(new Error())).toBe(false);
  });

  it("does not validate a null problem details", () => {
    const e = Object.assign(new Error(), { problemDetails: null });
    expect(hasProblemDetails(e)).toBe(false);
  });
});
