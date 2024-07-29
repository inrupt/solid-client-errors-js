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

import type { WithErrorResponse } from "./errorResponse";

export function mockErrorResponse({
  ok,
  body,
  status,
  statusText,
  url,
  headers,
}: {
  ok?: boolean | null;
  body?: string | null;
  status?: number | null;
  statusText?: string | null;
  url?: string | null;
  headers?: Headers | null;
}): WithErrorResponse {
  return {
    response: {
      ok: ok === null ? undefined : (ok ?? false),
      body: body === null ? undefined : (body ?? "Some response body"),
      status: status === null ? undefined : (status ?? 400),
      statusText:
        statusText === null ? undefined : (statusText ?? "Bad Request"),
      url: url === null ? undefined : (url ?? "https://example.org/resource"),
      headers: headers === null ? undefined : (headers ?? new Headers()),
    },
    // The type assertion allows us to create invalid error
    // responses for unit tests purpose.
  } as WithErrorResponse;
}

export default mockErrorResponse;
