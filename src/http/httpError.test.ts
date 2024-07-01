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
import { ClientHttpError } from "./httpError";
import { mockProblemDetails } from "./problemDetails.mock";
import {
  DEFAULT_TYPE,
  PROBLEM_DETAILS_MIME,
  hasProblemDetails,
} from "./problemDetails";
import InruptClientError from "../clientError";
import { hasErrorResponse } from "./errorResponse";

describe("ClientHttpError", () => {
  it("creates an Error object with the appropriate response getter", () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({
        "Content-Type": "application/problem+json",
      }),
    });
    const { problemDetails } = mockProblemDetails({});
    const error = new ClientHttpError(
      response,
      JSON.stringify(problemDetails),
      "Some error message",
    );
    expect(hasErrorResponse(error)).toBe(true);
    expect(error.response.status).toStrictEqual(response.status);
    expect(error.response.statusText).toStrictEqual(response.statusText);
    expect(error.response.headers).toStrictEqual(response.headers);
    expect(error.response.url).toStrictEqual(response.url);
    expect(error.response.body).toStrictEqual(JSON.stringify(problemDetails));
  });

  it("creates an Error object with the appropriate problemDetails getter", () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({
        "Content-Type": "application/problem+json",
      }),
    });
    const { problemDetails: mockedProblemDetails } = mockProblemDetails({
      detail: "Some details.",
      instance: new URL("https://example.org/instance"),
    });
    const error = new ClientHttpError(
      response,
      JSON.stringify(mockedProblemDetails),
      "Some error message",
    );
    expect(hasProblemDetails(error)).toBe(true);
    expect(error.problemDetails.status).toStrictEqual(
      mockedProblemDetails.status,
    );
    expect(error.problemDetails.title).toStrictEqual(
      mockedProblemDetails.title,
    );
    expect(error.problemDetails.type).toStrictEqual(mockedProblemDetails.type);
    expect(error.problemDetails.detail).toStrictEqual(
      mockedProblemDetails.detail,
    );
    expect(error.problemDetails.instance).toStrictEqual(
      mockedProblemDetails.instance,
    );
    expect(error.response.body).toStrictEqual(
      JSON.stringify(mockedProblemDetails),
    );
  });

  it("supports optional problem details entries being absent", () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({
        "Content-Type": "application/problem+json",
      }),
    });
    // Note that `instance` and `detail` entries are not mocked.
    const { problemDetails: mockedProblemDetails } = mockProblemDetails({});
    const error = new ClientHttpError(
      response,
      JSON.stringify(mockedProblemDetails),
      "Some error message",
    );
    expect(hasProblemDetails(error)).toBe(true);
    expect(error.problemDetails.detail).toBeUndefined();
    expect(error.problemDetails.instance).toBeUndefined();
  });

  it("makes the problem details and error response immutable", () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({
        "Content-Type": "application/problem+json",
      }),
    });
    const error = new ClientHttpError(
      response,
      JSON.stringify(mockProblemDetails({}).problemDetails),
      "Some error message",
    );
    const { problemDetails } = error;
    expect(() => {
      // @ts-expect-error the read-only value is overwritten for test purpose.
      problemDetails.status = 200;
    }).toThrow();
    const errorResponse = error.response;
    expect(() => {
      // @ts-expect-error the read-only value is overwritten for test purpose.
      errorResponse.statusText = "Some other status";
    }).toThrow();
  });

  it("creates an Error object with defaults problemDetails when the response isn't conform to RFC9457", () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    });
    const error = new ClientHttpError(
      response,
      "Some response body",
      "Some error message",
    );
    expect(error.problemDetails.status).toStrictEqual(response.status);
    expect(error.problemDetails.title).toStrictEqual(response.statusText);
    expect(error.problemDetails.type).toStrictEqual(DEFAULT_TYPE);
    expect(error.problemDetails.detail).toBeUndefined();
    expect(error.problemDetails.instance).toBeUndefined();
    expect(error.response.body).toBe("Some response body");
  });

  it("creates an Error object with defaults problemDetails when the response is malformed", () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({
        "Content-Type": PROBLEM_DETAILS_MIME,
      }),
    });
    const error = new ClientHttpError(
      response,
      // The response body should be JSON, but it actually is a plain string.
      "Not JSON",
      "Some error message",
    );
    expect(error.problemDetails.status).toStrictEqual(response.status);
    expect(error.problemDetails.title).toStrictEqual(response.statusText);
    expect(error.problemDetails.type).toStrictEqual(DEFAULT_TYPE);
    expect(error.problemDetails.detail).toBeUndefined();
    expect(error.problemDetails.instance).toBeUndefined();
    expect(error.response.body).toBe("Not JSON");
  });

  it("throws if the provided response is successful", () => {
    const response = new Response(undefined, {
      status: 200,
      statusText: "OK",
    });
    expect(() => {
      // Constructing the object to throw.
      // eslint-disable-next-line no-new
      new ClientHttpError(
        response,
        // The response body should be JSON, but it actually is a plain string.
        "Not JSON",
        "Some error message",
      );
    }).toThrow(InruptClientError);
  });
});
