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

/**
 * A subset of the {@link Response} type metadata.
 *
 * @since 0.0.1
 */
export type ResponseMetadata = Pick<
  Response,
  "headers" | "status" | "statusText" | "url" | "ok"
>;

/**
 * Relevant details of an HTTP error response.
 *
 * @since 0.0.1
 */
export type ErrorResponse = Readonly<
  ResponseMetadata & {
    ok: false;
    body: string;
  }
>;

/**
 * Extension to an Error thrown on an unsuccessful HTTP response
 * to link to a {@link ErrorResponse} instance.
 *
 * @since 0.0.1
 */
export interface WithErrorResponse {
  response: ErrorResponse;
}

function isErrorResponse(
  response: Response | ErrorResponse,
): response is ErrorResponse {
  return (
    !response.ok &&
    typeof response.body === "string" &&
    typeof response.status === "number" &&
    typeof response.statusText === "string" &&
    typeof response.url === "string" &&
    response.headers instanceof Headers
  );
}

/**
 * Type guard which, given an Error, checks whether it has a `response`
 * field conform to the {@link ErrorResponse} type.
 *
 * @example
 * ```
 * try {
 *  // ...
 * } catch (e) {
 *   if (hasErrorResponse(e)) {
 *     // e.response can safely be accessed.
 *   }
 * }
 * ```
 *
 * @alpha
 * @since 0.0.1
 * @param error the error being checked.
 * @returns whether the error has HTTP error details attached.
 */
export function hasErrorResponse(
  error: Error | WithErrorResponse,
): error is WithErrorResponse {
  const { response } = error as WithErrorResponse;
  return (
    typeof response === "object" &&
    response !== null &&
    isErrorResponse(response)
  );
}
