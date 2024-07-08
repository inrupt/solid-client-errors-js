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

export const NOT_ACCEPTABLE_STATUS = 406 as const;

export type NotAcceptableErrorResponse = ErrorResponse & {
  status: typeof NOT_ACCEPTABLE_STATUS;
};

/**
 * Runtime error thrown on HTTP Not Acceptable (406) response.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#status.406 | RFC 9110 (15.5.7.) 406 Not Acceptable}
 * @since 0.0.1
 */
export class NotAcceptableError extends ClientHttpError {
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
    if (responseMetadata.status !== NOT_ACCEPTABLE_STATUS) {
      throw new InruptClientError(
        `Unexpected status found building NotAcceptableError: expected ${NOT_ACCEPTABLE_STATUS}, found ${responseMetadata.status}`,
      );
    }
  }

  get response(): NotAcceptableErrorResponse {
    return super.response as NotAcceptableErrorResponse;
  }
}

export default NotAcceptableError;
