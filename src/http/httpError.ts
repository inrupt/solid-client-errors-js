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

import InruptClientError from "../clientError";
import type { WithErrorResponse, ErrorResponse } from "./errorResponse";
import type { WithProblemDetails, ProblemDetails } from "./problemDetails";
import { buildProblemDetails } from "./problemDetails";

/**
 * Error thrown on unsuccessful HTTP response.
 *
 * @example
 * ```ts
 * try {
 *   // ...
 * } catch (e) {
 *   if (e instanceof ClientHttpError) {
 *     // e.response and e.problemDetails can be accessed safely.
 *   }
 * }
 * ```
 *
 * @since 0.0.1
 */
export class ClientHttpError
  extends InruptClientError
  implements WithErrorResponse, WithProblemDetails
{
  private errorResponse: ErrorResponse;

  private details: ProblemDetails;

  constructor(
    responseMetadata: {
      status: number;
      statusText: string;
      headers: Headers;
      url: string;
    },
    responseBody: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    if (responseMetadata.status >= 200 && responseMetadata.status < 400) {
      throw new InruptClientError(
        `A ClientHttpError cannot be built from a success response, got ${responseMetadata.status} ${responseMetadata.statusText}`,
      );
    }
    this.errorResponse = Object.freeze({
      status: responseMetadata.status,
      statusText: responseMetadata.statusText,
      headers: responseMetadata.headers,
      url: responseMetadata.url,
      body: responseBody,
      ok: false,
    });
    this.details = buildProblemDetails(this.errorResponse);
  }

  get response() {
    return this.errorResponse;
  }

  get problemDetails() {
    return this.details;
  }
}

export default ClientHttpError;
