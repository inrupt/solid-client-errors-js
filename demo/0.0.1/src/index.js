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
/* eslint-disable no-console */

import {
  handleErrorResponse,
  UnauthorizedError,
  NotAcceptableError,
} from "@inrupt/solid-client-errors";
import { Session } from "@inrupt/solid-client-authn-browser";
import { getPodUrlAll } from "@inrupt/solid-client";

const session = new Session();
session.handleIncomingRedirect({ url: window.location.href });

const DEV_2_3_RESOURCE =
  "https://storage.dev-2-3.inrupt.com/ce92404c-6955-4aab-8b74-77e7b2aca510/";
const PODSPACES_RESOURCE =
  "https://storage.inrupt.com/712de2ca-7910-434b-ac85-eaa0fe70438d/";










const handleUnauthorizedError = (e) => {
  if (e instanceof UnauthorizedError) {
    const messageSummary = `<p>You are not authorized to access <a href="${}"> this resource</a>.</p>`;
    const messageSuggestion =
      "<p>Check that you are <strong>logged in</strong>.</p>";
    const messageFollowUp =
       === undefined
        ? ""
        : `<p>If the issue persists,reach out to your system administrator using the following error identifier ${e.problemDetails.instance}</p>`;
    document.getElementById("p-error-description").innerHTML =
      messageSummary + messageSuggestion + messageFollowUp;
    document.getElementById("dialog-error").showModal();
  }
};












const unauthorizedFetchCallback = async () => {
  const targetServer = document.querySelector(
    'input[name="error-description"]:checked',
  ).value;
  let targetResource;
  if (targetServer === "podspaces") {
    targetResource = PODSPACES_RESOURCE;
  } else {
    targetResource = DEV_2_3_RESOURCE;
  }
  const response = await fetch(targetResource);
  if (!response.ok) {
    throw handleErrorResponse(
      response,
      await response.text(),
      "Error fetching resource",
    );
  }
};

const handleUnacceptableError = (e) => {
  const messageSummary = `<p>You are trying to get a resource in an incompatible format</p>`;
  const messageSuggestion = `<p>Check that ${e.response.url} is an image.</p>`;
  const messageFollowUp =
    e.problemDetails.instance === undefined
      ? ""
      : `<p>If the issue persists,reach out to your system administrator using the following error identifier ${e.problemDetails.instance}</p>`;
  document.getElementById("p-error-description").innerHTML =
    messageSummary + messageSuggestion + messageFollowUp;
  document.getElementById("dialog-error").showModal();
};

const unacceptableFetchCallback = async () => {
  const [targetResource] = await getPodUrlAll(session.info.webId);
  const response = await session.fetch(targetResource, {
    headers: { Accept: "image/jpeg" },
  });
  if (!response.ok) {
    throw handleErrorResponse(
      response,
      await response.text(),
      "Error fetching resource",
    );
  }
};

const handleError = (e) => {
  if (e instanceof NotAcceptableError) {
    handleUnacceptableError(e);
  }
  if (e instanceof UnauthorizedError) {
    handleUnauthorizedError(e);
  }
};

document
  .getElementById("button-unauthorized-fetch")
  .addEventListener("click", () =>
    unauthorizedFetchCallback().catch((e) => {
      handleError(e);
    }),
  );

document
  .getElementById("button-unacceptable-fetch")
  .addEventListener("click", () =>
    unacceptableFetchCallback().catch((e) => {
      handleError(e);
    }),
  );

document.getElementById("button-login").addEventListener("click", async () => {
  const targetServer = document.querySelector(
    'input[name="error-description"]:checked',
  ).value;
  let op;
  if (targetServer === "podspaces") {
    op = "https://login.inrupt.com/";
  } else {
    op = "https://openid.dev-2-3.inrupt.com/";
  }
  await session.login({
    clientName: "Error library demo",
    oidcIssuer: op,
  });
});

document.getElementById("button-close-dialog").addEventListener("click", () => {
  document.getElementById("dialog-error").close();
});
