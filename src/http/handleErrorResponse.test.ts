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
import { handleErrorResponse } from "./handleErrorResponse";
import {
  BadRequestError,
  BAD_REQUEST_STATUS,
} from "./wellKnown/badRequestError";
import { mockResponse } from "./httpError.mock";
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
import ClientHttpError from "./httpError";

describe("handleErrorResponse", () => {
  it.each([
    [BAD_REQUEST_STATUS, BadRequestError],
    [CONFLICT_STATUS, ConflictError],
    [FORBIDDEN_STATUS, ForbiddenError],
    [GONE_STATUS, GoneError],
    [INTERNAL_SERVER_ERROR_STATUS, InternalServerError],
    [METHOD_NOT_ALLOWED_STATUS, MethodNotAllowedError],
    [NOT_ACCEPTABLE_STATUS, NotAcceptableError],
    [NOT_FOUND_STATUS, NotFoundError],
    [PRECONDITION_FAILED_STATUS, PreconditionFailedError],
    [TOO_MANY_REQUESTS_STATUS, TooManyRequestsError],
    [UNAUTHORIZED_STATUS, UnauthorizedError],
    [UNSUPPORTED_MEDIA_TYPE_STATUS, UnsupportedMediaTypeError],
    // Defaults to ClientHttpError for any other status code
    [499, ClientHttpError],
  ])("maps %i status to %s class", (responseStatus, errorClass) => {
    const response = mockResponse({ status: responseStatus });
    const error = handleErrorResponse(
      response,
      "Some response body",
      "Some error message",
    );
    expect(error).toBeInstanceOf(errorClass);
  });

  it("throws on non-error response", () => {
    const response = mockResponse({ status: 200 });
    expect(() => {
      handleErrorResponse(response, "Some response body", "Some error message");
    }).toThrow();
  });
});
