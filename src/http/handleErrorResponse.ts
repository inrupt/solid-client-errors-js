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
import { ClientHttpError } from "./httpError";
import BadRequestError, {
  BAD_REQUEST_STATUS,
} from "./wellKnown/badRequestError";
import ConflictError, { CONFLICT_STATUS } from "./wellKnown/conflictError";
import ForbiddenError, { FORBIDDEN_STATUS } from "./wellKnown/forbiddenError";
import GoneError, { GONE_STATUS } from "./wellKnown/goneError";
import InternalServerError, {
  INTERNAL_SERVER_ERROR_STATUS,
} from "./wellKnown/internalServerError";
import MethodNotAllowedError, {
  METHOD_NOT_ALLOWED_STATUS,
} from "./wellKnown/methodNotAllowedError";
import NotAcceptableError, {
  NOT_ACCEPTABLE_STATUS,
} from "./wellKnown/notAcceptableError";
import NotFoundError, { NOT_FOUND_STATUS } from "./wellKnown/notFoundError";
import PreconditionFailedError, {
  PRECONDITION_FAILED_STATUS,
} from "./wellKnown/preconditionFailedError";
import TooManyRequestsError, {
  TOO_MANY_REQUESTS_STATUS,
} from "./wellKnown/tooManyRequestsError";
import UnauthorizedError, {
  UNAUTHORIZED_STATUS,
} from "./wellKnown/unauthorizedError";
import UnsupportedMediaTypeError, {
  UNSUPPORTED_MEDIA_TYPE_STATUS,
} from "./wellKnown/unsupportedMediaTypeError";

/**
 * Map an HTTP error response to one of the Error classes exported by this library.
 *
 * @example
 * ```ts
 * const response = await fetch("https://example.org/resource");
 * if (!response.ok) {
 *   const responseBody = await response.text();
 *   throw handleErrorResponse(response, responseBody, "Fetch got error response");
 * }
 * ```
 *
 * @param responseMetadata the response metadata
 * @param responseBody the response body
 * @param message the error message
 * @returns an instance of the ClientHttpError subclass matching the response metadata status.
 * If the response status is unkown, the generic ClientHttpError class is used.
 * @since 0.0.1
 */
export function handleErrorResponse(
  responseMetadata: {
    status: number;
    statusText: string;
    headers: Headers;
    url: string;
  },
  responseBody: string,
  message: string,
): ClientHttpError {
  switch (responseMetadata.status) {
    case BAD_REQUEST_STATUS:
      return new BadRequestError(responseMetadata, responseBody, message);
    case CONFLICT_STATUS:
      return new ConflictError(responseMetadata, responseBody, message);
    case FORBIDDEN_STATUS:
      return new ForbiddenError(responseMetadata, responseBody, message);
    case GONE_STATUS:
      return new GoneError(responseMetadata, responseBody, message);
    case INTERNAL_SERVER_ERROR_STATUS:
      return new InternalServerError(responseMetadata, responseBody, message);
    case METHOD_NOT_ALLOWED_STATUS:
      return new MethodNotAllowedError(responseMetadata, responseBody, message);
    case NOT_ACCEPTABLE_STATUS:
      return new NotAcceptableError(responseMetadata, responseBody, message);
    case NOT_FOUND_STATUS:
      return new NotFoundError(responseMetadata, responseBody, message);
    case PRECONDITION_FAILED_STATUS:
      return new PreconditionFailedError(
        responseMetadata,
        responseBody,
        message,
      );
    case TOO_MANY_REQUESTS_STATUS:
      return new TooManyRequestsError(responseMetadata, responseBody, message);
    case UNAUTHORIZED_STATUS:
      return new UnauthorizedError(responseMetadata, responseBody, message);
    case UNSUPPORTED_MEDIA_TYPE_STATUS:
      return new UnsupportedMediaTypeError(
        responseMetadata,
        responseBody,
        message,
      );
    default:
      return new ClientHttpError(responseMetadata, responseBody, message);
  }
}

export default handleErrorResponse;
