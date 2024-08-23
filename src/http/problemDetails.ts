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

import type { ErrorResponse } from "./errorResponse";

/**
 * The Problem Details MIME type documented in {@link https://www.rfc-editor.org/rfc/rfc9457}.
 *
 * @since 0.0.1
 */
export const PROBLEM_DETAILS_MIME = "application/problem+json";
/**
 * The default type problem documented in {@link https://www.rfc-editor.org/rfc/rfc9457#name-aboutblank}.
 *
 * @since 0.0.1
 */
export const DEFAULT_TYPE = new URL("about:blank");

/**
 * Structured representation of the issue underlying an error response
 * from an HTTP API.
 *
 * @since 0.0.1
 */
export type ProblemDetails = Readonly<{
  /**
   * The problem type
   * @defaultValue {@link DEFAULT_TYPE}
   */
  type: URL;
  /**
   * A short description of the problem.
   */
  title: string;
  /**
   * The error response status code.
   */
  status: number;
  /**
   * A longer description of the problem.
   */
  detail?: string;
  /**
   * A unique URL identifying the problem occurrence.
   */
  instance?: URL;
}>;

/**
 * Extension to an Error thrown on an unsuccessful HTTP response
 * to link to a {@link ProblemDetails} instance.
 *
 * @since 0.0.1
 */
export interface WithProblemDetails {
  /**
   * The {@link ProblemDetails} instance.
   */
  problemDetails: ProblemDetails;
}

function isUrl(url: unknown | URL): url is URL {
  return typeof url === "object" && typeof (url as URL).href === "string";
}

function isProblemDetails(
  problem: unknown | ProblemDetails,
): problem is ProblemDetails {
  const hasDetail =
    typeof (problem as ProblemDetails).detail === "undefined" ||
    typeof (problem as ProblemDetails).detail === "string";
  const hasInstance =
    typeof (problem as ProblemDetails).instance === "undefined" ||
    isUrl((problem as ProblemDetails).instance);
  return (
    isUrl((problem as ProblemDetails).type) &&
    typeof (problem as ProblemDetails).title === "string" &&
    typeof (problem as ProblemDetails).status === "number" &&
    hasDetail &&
    hasInstance
  );
}

/**
 * Type guard which, given an Error, checks whether it has a `problemDetails`
 * field conform to the {@link ProblemDetails} type.
 *
 * @example
 * ```
 * try {
 *  // ...
 * } catch (e) {
 *   if (hasProblemDetails(e)) {
 *     // e.problemDetails can safely be accessed.
 *   }
 * }
 * ```
 *
 * @alpha
 * @since 0.0.1
 * @param error the error being checked.
 * @returns whether the error has problem details attached.
 */
export function hasProblemDetails(
  error: Error | WithProblemDetails,
): error is WithProblemDetails {
  const { problemDetails } = error as WithProblemDetails;
  return (
    typeof problemDetails === "object" &&
    // typeof null returns "object".
    problemDetails !== null &&
    isProblemDetails(problemDetails)
  );
}

function asUrl(url: string | undefined, base: string): URL | undefined {
  if (url !== undefined) {
    try {
      return new URL(url, base);
    } catch {
      /* no op */
    }
  }
  return undefined;
}

/**
 * Builds a {@link ProblemDetails} object from an {@link ErrorResponse}. If the response
 * is a valid {@link https://www.rfc-editor.org/rfc/rfc9457} response, values for the
 * {@link ProblemDetails} object are parsed from it. Otherwise, some values are taken
 * from the response metadata (status, status text), and defaults are applied.
 *
 * @internal
 * @param response the error response.
 * @returns a {@link ProblemDetails} object derived from the response.
 */
export function buildProblemDetails(response: ErrorResponse): ProblemDetails {
  let type: URL | undefined;
  let title: string | undefined;
  let status: number | undefined;
  let detail: string | undefined;
  let instance: URL | undefined;

  if (response.headers.get("Content-Type") === PROBLEM_DETAILS_MIME) {
    try {
      const responseBody = JSON.parse(response.body);
      const responseType = asUrl(responseBody.type, response.url);
      if (responseType !== undefined) {
        type = responseType;
      }
      if (typeof responseBody.title === "string") {
        title = responseBody.title;
      }
      if (typeof responseBody.status === "number") {
        status = responseBody.status;
      }
      if (typeof responseBody.detail === "string") {
        detail = responseBody.detail;
      }
      const responseInstance = asUrl(responseBody.instance, response.url);
      if (responseInstance !== undefined) {
        instance = responseInstance;
      }
    } catch {
      // In case of error, default values are applied.
    }
  }

  return Object.freeze({
    type: type ?? DEFAULT_TYPE,
    title: title ?? response.statusText,
    status: status ?? response.status,
    detail,
    instance,
  });
}
