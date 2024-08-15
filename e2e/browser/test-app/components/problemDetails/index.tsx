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

// Disabling the following prevents from having to install before linting from
// the root.
// eslint-disable-next-line import/no-unresolved
import { useEffect, useState } from "react";
import { getPodUrlAll } from "@inrupt/solid-client";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { ProblemDetails } from "@inrupt/solid-client-errors";
import { handleErrorResponse } from "@inrupt/solid-client-errors";

interface ButtonProps {
  id: string;
  name: string;
  performRequest: () => Promise<Response>;
  handleProblemDetails: (problemDetails: ProblemDetails) => void;
}

const RequestButton = (props: ButtonProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const response = await props.performRequest();
          if (response.ok) {
            throw new Error(
              "Should not get here as this component is to test request errors.",
            );
          } else {
            const responseBody = await response.text();
            const error = handleErrorResponse(
              response,
              responseBody,
              `Request to: ${response.url} failed`,
            );
            props.handleProblemDetails(error.problemDetails);
          }
        }}
        data-testid={props.id}
      >
        {props.name}
      </button>
    </div>
  );
};

export default function ProblemDetailsClient({
  session,
}: {
  session: Session;
}) {
  const [storageUrl, setStorageUrl] = useState<string>();
  const [problemDetails, setProblemDetails] = useState<
    ProblemDetails | undefined
  >();

  useEffect(() => {
    if (session.info.webId !== undefined) {
      getPodUrlAll(session.info.webId as string, {
        fetch: session.fetch,
      })
        .then((pods) => {
          if (pods.length === 0) {
            throw new Error("No pod root in webid profile");
          }
          setStorageUrl(pods[0]);
        })
        .catch(console.error);
    }
  }, [session]);

  return (
    <>
      <div>
        <p>
          Storage Container:{" "}
          <em>
            <span data-testid="storageUrl">{storageUrl ?? "None"}</span>
          </em>
        </p>
      </div>
      <div data-testid="pdContainer">
        <p>RFC9457 Problem Details:</p>
        <p>
          Type:{" "}
          <em>
            <span data-testid="pdType">
              {problemDetails?.type.toString() ?? "None"}
            </span>
          </em>
        </p>
        <p>
          Status:{" "}
          <em>
            <span data-testid="pdStatus">
              {problemDetails?.status ?? "None"}
            </span>
          </em>
        </p>
        <p>
          Title:{" "}
          <em>
            <span data-testid="pdTitle">{problemDetails?.title ?? "None"}</span>
          </em>
        </p>
        <p>
          Detail:{" "}
          <em>
            <span data-testid="pdDetail">
              {problemDetails?.detail ?? "None"}
            </span>
          </em>
        </p>
        <p>
          Instance:{" "}
          <em>
            <span data-testid="pdInstance">
              {problemDetails?.instance?.toString() ?? "None"}
            </span>
          </em>
        </p>
      </div>

      {storageUrl ? (
        <>
          <RequestButton
            id={"notAuthorized"}
            name={"Not Authorized Request"}
            performRequest={
              // This request should get return a 401 response.
              () => fetch(storageUrl)
            }
            handleProblemDetails={setProblemDetails}
          />

          <RequestButton
            id={"notFound"}
            name={"Not Found Request"}
            performRequest={
              // This request should get return a 404 response.
              () => session.fetch(new URL("some-missing-resource", storageUrl))
            }
            handleProblemDetails={setProblemDetails}
          />

          <RequestButton
            id={"notAcceptable"}
            name={"Not Acceptable"}
            performRequest={
              // This request should get return a 406 response.
              () =>
                session.fetch(storageUrl, {
                  headers: {
                    Accept: "text/csv",
                  },
                })
            }
            handleProblemDetails={setProblemDetails}
          />

          <RequestButton
            id={"badRequest"}
            name={"Bad Request"}
            performRequest={
              // This request should get return a 400 response.
              () =>
                session.fetch(new URL("some-container/", storageUrl), {
                  method: "PUT",
                  headers: {
                    "Content-Type": "text/turtle",
                  },
                  body: "Invalid RDF Content!",
                })
            }
            handleProblemDetails={setProblemDetails}
          />

          <RequestButton
            id={"forbidden"}
            name={"Forbidden"}
            performRequest={
              // This request should get return a 406 response.
              () =>
                session.fetch(storageUrl, {
                  method: "DELETE",
                })
            }
            handleProblemDetails={setProblemDetails}
          />

          <RequestButton
            id={"methodNotAllowed"}
            name={"Method Not Allowed"}
            performRequest={
              // This request should get return a 405 response.
              () =>
                session.fetch(new URL("/.well-known/solid", storageUrl), {
                  method: "DELETE",
                })
            }
            handleProblemDetails={setProblemDetails}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
