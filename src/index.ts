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

export { InruptClientError } from "./clientError";
export { ClientHttpError } from "./http/httpError";
export { handleErrorResponse } from "./http/handleErrorResponse";
export {
  DEFAULT_TYPE,
  PROBLEM_DETAILS_MIME,
  type ProblemDetails,
  type WithProblemDetails,
  hasProblemDetails,
} from "./http/problemDetails";
export {
  type ResponseMetadata,
  type ErrorResponse,
  type WithErrorResponse,
  hasErrorResponse,
} from "./http/errorResponse";
export {
  BadRequestError,
  BAD_REQUEST_STATUS,
  type BadRequestErrorResponse,
} from "./http/wellKnown/badRequestError";
export {
  ConflictError,
  CONFLICT_STATUS,
  type ConflictErrorResponse,
} from "./http/wellKnown/conflictError";
export {
  ForbiddenError,
  FORBIDDEN_STATUS,
  type ForbiddenErrorResponse,
} from "./http/wellKnown/forbiddenError";
export {
  GoneError,
  GONE_STATUS,
  type GoneErrorResponse,
} from "./http/wellKnown/goneError";
export {
  InternalServerError,
  INTERNAL_SERVER_ERROR_STATUS,
  type InternalServerErrorResponse,
} from "./http/wellKnown/internalServerError";
export {
  MethodNotAllowedError,
  METHOD_NOT_ALLOWED_STATUS,
  type MethodNotAllowedErrorResponse,
} from "./http/wellKnown/methodNotAllowedError";
export {
  NotAcceptableError,
  NOT_ACCEPTABLE_STATUS,
  type NotAcceptableErrorResponse,
} from "./http/wellKnown/notAcceptableError";
export {
  NotFoundError,
  NOT_FOUND_STATUS,
  type NotFoundErrorResponse,
} from "./http/wellKnown/notFoundError";
export {
  PreconditionFailedError,
  PRECONDITION_FAILED_STATUS,
  type PreconditionFailedErrorResponse,
} from "./http/wellKnown/preconditionFailedError";
export {
  TooManyRequestsError,
  TOO_MANY_REQUESTS_STATUS,
  type TooManyRequestsErrorResponse,
} from "./http/wellKnown/tooManyRequestsError";
export {
  UnauthorizedError,
  UNAUTHORIZED_STATUS,
  type UnauthorizedErrorResponse,
} from "./http/wellKnown/unauthorizedError";
export {
  UnsupportedMediaTypeError,
  UNSUPPORTED_MEDIA_TYPE_STATUS,
  type UnsupportedMediaTypeErrorResponse,
} from "./http/wellKnown/unsupportedMediaTypeError";
