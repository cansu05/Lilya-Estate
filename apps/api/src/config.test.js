import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_CORS_ORIGINS,
  DEFAULT_PORT,
  parseCorsOrigins,
  parsePort,
} from "./config.js";

test("parsePort falls back to default for invalid values", () => {
  assert.equal(parsePort(undefined), DEFAULT_PORT);
  assert.equal(parsePort("abc"), DEFAULT_PORT);
  assert.equal(parsePort("0"), DEFAULT_PORT);
});

test("parsePort returns numeric port when valid", () => {
  assert.equal(parsePort("4100"), 4100);
});

test("parseCorsOrigins falls back to defaults", () => {
  assert.deepEqual(parseCorsOrigins(undefined), DEFAULT_CORS_ORIGINS);
  assert.deepEqual(parseCorsOrigins(""), DEFAULT_CORS_ORIGINS);
  assert.deepEqual(parseCorsOrigins(" , "), DEFAULT_CORS_ORIGINS);
});

test("parseCorsOrigins returns trimmed custom values", () => {
  assert.deepEqual(parseCorsOrigins("http://localhost:3000, https://example.com "), [
    "http://localhost:3000",
    "https://example.com",
  ]);
});
