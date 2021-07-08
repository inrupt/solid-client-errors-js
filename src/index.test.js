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
const imports = require("./index.js");

describe("SolidError", () => {
  it("can get url of error", () => {
    const err = new imports.SolidError("Testing error");
    console.log(err);
    expect(err.url).toStrictEqual(
      "https://inrupt.com/generic-error-url"
    );
  });

  it("can add cause of error", () => {
    const err = new imports.SolidError("Testing error");
    expect(err.cause).toStrictEqual(
      "Testing error"
    );
  });

  it("can add child of error", () => {
    const childErr = new imports.SolidError("Child error");
    const err = new imports.SolidError("Testing error", childErr);
    expect(err.child).toStrictEqual(
      childErr
    );
  });

  it("correct error message", () => {
    const err = new imports.SolidError("Testing error");
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/generic-error-url."
    );
  });

  it("empty initialise", () => {
    const err = new imports.SolidError();
    expect(err.cause).toBeUndefined();
    expect(err.child).toBeUndefined();
  });
});
