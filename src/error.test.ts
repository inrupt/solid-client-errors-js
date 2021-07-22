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

import { DataFactory } from "n3";
import {
  SolidError,
  ThingExpectedError,
  FetchError,
  NotImplementedError,
  ValidPropertyUrlExpectedError,
  isNamedNode,
} from "./error";

describe("SolidError", () => {
  it("can get url of error", () => {
    const err = new SolidError("Testing error");
    expect(err.url).toStrictEqual("https://inrupt.com/generic-error");
  });

  it("can add cause of error", () => {
    const err = new SolidError("Testing error");
    expect(err.cause).toStrictEqual("Testing error");
  });

  it("can add child of error", () => {
    const childErr = new SolidError("Child error");
    const err = new SolidError("Testing error", childErr);
    expect(err.child).toStrictEqual(childErr);
  });

  it("correct error message", () => {
    const err = new SolidError("Testing error");
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/generic-error."
    );
  });
});

describe("ThingExpectedError", () => {
  const receivedValue = "value";
  it("can get url of error", () => {
    const err = new ThingExpectedError("Testing error", receivedValue);
    expect(err.url).toStrictEqual("https://inrupt.com/thing-expected-error");
  });

  it("can add cause of error", () => {
    const err = new ThingExpectedError("Testing error", receivedValue);
    expect(err.cause).toStrictEqual("Testing error");
  });

  it("can add received value", () => {
    const err = new ThingExpectedError("Testing error", receivedValue);
    expect(err.receivedValue).toStrictEqual("value");
  });

  it("can add child of error", () => {
    const childErr = new ThingExpectedError("Child error", receivedValue);
    const err = new ThingExpectedError(
      "Testing error",
      receivedValue,
      childErr
    );
    expect(err.child).toStrictEqual(childErr);
  });

  it("correct error message", () => {
    const err = new ThingExpectedError("Testing error", receivedValue);
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/thing-expected-error. Expected a Thing, but received: value."
    );
  });
});

describe("FetchError", () => {
  const urlReturned = "url";
  const statusCode = "123456";
  const statusText = "status";
  const fetchDescription = "fetch_description";
  const response = "response";

  it("can get url of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.url).toStrictEqual("https://inrupt.com/fetch-error");
  });

  it("can add cause of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.cause).toStrictEqual("Testing error");
  });

  it("can add child of error", () => {
    const childErr = new FetchError(
      "Child error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response,
      childErr
    );
    expect(err.child).toStrictEqual(childErr);
  });

  it("can add urlReturned of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.urlReturned).toStrictEqual("url");
  });

  it("can add statusCode of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.statusCode).toStrictEqual("123456");
  });

  it("can add statusText of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.statusText).toStrictEqual("status");
  });

  it("can add fetchDescription of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.fetchDescription).toStrictEqual("fetch_description");
  });

  it("can add response of error", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.response).toStrictEqual("response");
  });

  it("correct error message", () => {
    const err = new FetchError(
      "Testing error",
      urlReturned,
      statusCode,
      statusText,
      fetchDescription,
      response
    );
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/fetch-error. Unable to fetch fetch_description: url returned [123456] status"
    );
  });
});

describe("NotImplementedError", () => {
  it("can get url of error", () => {
    const err = new NotImplementedError("Testing error");
    expect(err.url).toStrictEqual("https://inrupt.com/not-implemented-error");
  });

  it("can add cause of error", () => {
    const err = new NotImplementedError("Testing error");
    expect(err.cause).toStrictEqual("Testing error");
  });

  it("can add child of error", () => {
    const childErr = new NotImplementedError("Child error");
    const err = new NotImplementedError("Testing error", childErr);
    expect(err.child).toStrictEqual(childErr);
  });

  it("correct error message", () => {
    const err = new NotImplementedError("Testing error");
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/not-implemented-error."
    );
  });
});

describe("ValidPropertyUrlExpectedError", () => {
  const receivedValue = "value";
  it("can get url of error", () => {
    const err = new ValidPropertyUrlExpectedError(
      "Testing error",
      receivedValue
    );
    expect(err.url).toStrictEqual(
      "https://inrupt.com/valid-property-url-expected-error"
    );
  });

  it("can add cause of error", () => {
    const err = new ValidPropertyUrlExpectedError(
      "Testing error",
      receivedValue
    );
    expect(err.cause).toStrictEqual("Testing error");
  });

  it("can add child of error", () => {
    const childErr = new ValidPropertyUrlExpectedError(
      "Child error",
      receivedValue
    );
    const err = new ValidPropertyUrlExpectedError(
      "Testing error",
      receivedValue,
      childErr
    );
    expect(err.child).toStrictEqual(childErr);
  });

  it("correct error message", () => {
    const err = new ValidPropertyUrlExpectedError(
      "Testing error",
      receivedValue
    );
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/valid-property-url-expected-error. Expected a valid URL to identify a property, but received: [value]."
    );
  });

  it("recieves namedNode", () => {
    const namedNode = DataFactory.namedNode(
      "https://arbitrary.pod/resource#node"
    );
    const err = new ValidPropertyUrlExpectedError("Testing error", namedNode);
    expect(err.message).toStrictEqual(
      "Testing error : read more at https://inrupt.com/valid-property-url-expected-error. Expected a valid URL to identify a property, but received: [https://arbitrary.pod/resource#node]."
    );
  });
});

describe("isNamedNode", () => {
  it("recognises a NamedNode", () => {
    expect(
      isNamedNode(DataFactory.namedNode("https://arbitrary.pod/resource#node"))
    ).toBe(true);
  });

  it("recognises non-NamedNodes", () => {
    expect(isNamedNode(DataFactory.blankNode())).toBe(false);
    expect(isNamedNode(DataFactory.literal("Arbitrary value"))).toBe(false);
    expect(isNamedNode(DataFactory.variable("Arbitrary name"))).toBe(false);
    expect(isNamedNode("Arbitrary string")).toBe(false);
  });
});
