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
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { custom } from "openid-client";
import { config } from "dotenv";
import { join } from "path";

import {
  getNodeTestingEnvironment,
  getPodRoot,
} from "@inrupt/internal-test-env";
import { Session } from "@inrupt/solid-client-authn-node";
import { getPodUrlAll } from "@inrupt/solid-client";

import {
  NotAcceptableError,
  NotFoundError,
  UnauthorizedError,
  handleErrorResponse
} from "../../src/index";

custom.setHttpOptionsDefaults({
  timeout: 15000,
});

if (process.env.CI === "true") {
  // Tests running in the CI runners tend to be more flaky.
  jest.retryTimes(3, { logErrorsBeforeRetry: true });
} else {
  // Load .env.local file
  config({ path: join("..", "env", ".env.local") });
}

const ENV = getNodeTestingEnvironment();
const { owner } = ENV.clientCredentials;

describe(`End-to-end error description test for ${ENV.environment}`, () => {
  const authenticatedSession = new Session({ keepAlive: false });

  beforeEach(async () => {
    await authenticatedSession.login({
      clientId: owner.id,
      clientSecret: owner.secret,
      oidcIssuer: ENV.idp,
    });
  });

  afterEach(async () => {
    await authenticatedSession.logout();
  });

  it("returns an RFC9457 error response for unauthenticated requests", async () => {
    const podRoot = await getPodRoot(authenticatedSession);
    // This unauthenticated fetch should get a 401 response.
    const response = await fetch(podRoot);
    const responseBody = await response.text();
    const error = handleErrorResponse(
      response,
      responseBody,
      "Some error message",
    );
    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.problemDetails.detail).toBeDefined();
    expect(error.problemDetails.instance).toBeDefined();
  });

  it("returns an RFC9457 error response for not found resources", async () => {
    const podRoot = await getPodRoot(authenticatedSession);
    const response = await authenticatedSession.fetch(
      new URL("some-missing-resource", podRoot),
    );
    const responseBody = await response.text();
    const error = handleErrorResponse(
      response,
      responseBody,
      "Some error message",
    );
    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.problemDetails.detail).toBeDefined();
    expect(error.problemDetails.instance).toBeDefined();
  });

  it("returns an RFC9457 error response for not acceptable content negotiation", async () => {
    const podRoot = await getPodRoot(authenticatedSession);
    const response = await authenticatedSession.fetch(podRoot, {
      headers: {
        Accept: "text/csv",
      },
    });
    const responseBody = await response.text();
    const error = handleErrorResponse(
      response,
      responseBody,
      "Some error message",
    );
    expect(error).toBeInstanceOf(NotAcceptableError);
    expect(error.problemDetails.detail).toBeDefined();
    expect(error.problemDetails.instance).toBeDefined();
  });
});
