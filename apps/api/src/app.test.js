import assert from "node:assert/strict";
import test from "node:test";

import { createApp } from "./app.js";

async function withServer(app, run) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

test("/health responds with status ok", async () => {
  const app = createApp({ corsOrigins: ["http://localhost:3000"] });

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.deepEqual(payload, { status: "ok" });
  });
});

test("CORS allows configured origin and omits others", async () => {
  const app = createApp({ corsOrigins: ["http://localhost:3000"] });

  await withServer(app, async (baseUrl) => {
    const allowedResponse = await fetch(`${baseUrl}/health`, {
      headers: { Origin: "http://localhost:3000" },
    });
    assert.equal(
      allowedResponse.headers.get("access-control-allow-origin"),
      "http://localhost:3000"
    );

    const blockedResponse = await fetch(`${baseUrl}/health`, {
      headers: { Origin: "http://localhost:3001" },
    });
    assert.equal(blockedResponse.headers.get("access-control-allow-origin"), null);
  });
});

test("attaches request id header", async () => {
  const app = createApp({ corsOrigins: ["http://localhost:3000"] });

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    const requestId = response.headers.get("x-request-id");
    assert.ok(typeof requestId === "string" && requestId.length > 0);
  });
});

test("listings validates invalid price range without querying db", async () => {
  const app = createApp({ corsOrigins: ["http://localhost:3000"] });

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/listings?minPrice=100&maxPrice=10`);
    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.equal(payload.message, "Invalid filters");
  });
});
