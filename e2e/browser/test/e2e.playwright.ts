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

/* eslint-disable jest/no-done-callback */

import { test, expect } from "@inrupt/internal-playwright-helpers";
import type { Page } from "@playwright/test";

async function waitFor(page: Page) {
  // The button is only shown once the app is ready.
  await page.waitForSelector("div[data-testid=pdContainer]");

  // A root container should have been found.
  await expect(page.getByTestId("storageUrl")).toContainText(/https:\/\//);

  // No problem details errors should be available yet.
  await expect(page.getByTestId("pdType")).toContainText("None");
}

async function expectProblemDetails(page: Page, status: string, title: string, detailContains: string) {
  // The Problem Details error should be displayed.
  await expect(page.locator("span[data-testid=pdType]")).toContainText("about:blank");
  await expect(page.locator("span[data-testid=pdStatus]")).toContainText(status);
  await expect(page.locator("span[data-testid=pdTitle]")).toContainText(title);
  await expect(page.locator("span[data-testid=pdDetail]")).toContainText(detailContains);
  await expect(page.locator("span[data-testid=pdInstance]")).toContainText(/https:\/\//);
}

test("401 problem details error", async ({ page, auth }) => {
  await auth.login({ allow: true });
  await waitFor(page);

  await Promise.all([
    page.waitForRequest((request) => request.method() === "GET"),
    page.waitForResponse((response) => response.status() === 401),
    page.click("button[data-testid=notAuthorized]")
  ]);

  await expectProblemDetails(
    page,
    "401",
    "Unauthorized",
    "The server application intentionally responded with an HTTP error response status"
  );
});

test("404 problem details error", async ({ page, auth }) => {
  await auth.login({ allow: true });
  await waitFor(page);

  await Promise.all([
    page.waitForRequest((request) => request.method() === "GET"),
    page.waitForResponse((response) => response.status() === 404),
    page.click("button[data-testid=notFound]")
  ]);

  await expectProblemDetails(
    page,
    "404",
    "Not Found",
    "Resource not found"
  );
});

test("406 problem details error", async ({ page, auth }) => {
  await auth.login({ allow: true });
  await waitFor(page);

  await Promise.all([
    page.waitForRequest((request) => request.method() === "GET"),
    page.waitForResponse((response) => response.status() === 406),
    page.click("button[data-testid=notAcceptable]")
  ]);

  await expectProblemDetails(
    page,
    "406",
    "Not Acceptable",
    "Unable to produce an RDF response matching Accept header value"
  );
});

test("400 problem details error", async ({ page, auth }) => {
  await auth.login({ allow: true });
  await waitFor(page);

  await Promise.all([
    page.waitForRequest((request) => request.method() === "PUT"),
    page.waitForResponse((response) => response.status() === 400),
    page.click("button[data-testid=badRequest]")
  ]);

  await expectProblemDetails(
    page,
    "400",
    "Bad Request",
    "RDF source is malformed."
  );
});

test("403 problem details error", async ({ page, auth }) => {
  await auth.login({ allow: true });
  await waitFor(page);

  await Promise.all([
    page.waitForRequest((request) => request.method() === "DELETE"),
    page.waitForResponse((response) => response.status() === 403),
    page.click("button[data-testid=forbidden]")
  ]);

  await expectProblemDetails(
    page,
    "403",
    "Forbidden",
    "The server application intentionally responded with an HTTP error response status."
  );
});
