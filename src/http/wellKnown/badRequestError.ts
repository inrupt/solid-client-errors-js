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
import { InruptClientError } from "../../clientError";
import type { ErrorResponse } from "../errorResponse";
import { ClientHttpError } from "../httpError";

export const BAD_REQUEST_STATUS = 400 as const;

export type BadRequestErrorResponse = ErrorResponse & {
  status: typeof BAD_REQUEST_STATUS;
};

/**
 * Runtime error thrown on HTTP Bad Request (400) response.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#status.400 | RFC 9110 (15.5.1.) 400 Bad Request}
 * @since 0.0.1
 */
export class BadRequestError extends ClientHttpError {
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
    super(responseMetadata, responseBody, message, options);
    if (responseMetadata.status !== BAD_REQUEST_STATUS) {
      throw new InruptClientError(
        `Unexpected status found building BadRequestError: expected ${BAD_REQUEST_STATUS}, found ${responseMetadata.status}`,
      );
    }
  }

  get response(): BadRequestErrorResponse {
    return super.response as BadRequestErrorResponse;
  }
}

export default BadRequestError;
