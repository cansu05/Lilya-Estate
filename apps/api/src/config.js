const DEFAULT_PORT = 4000;
const DEFAULT_CORS_ORIGINS = ["http://localhost:3000", "http://localhost:3001"];

function parsePort(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_PORT;
}

function parseCorsOrigins(value) {
  if (!value) return DEFAULT_CORS_ORIGINS;

  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length > 0 ? origins : DEFAULT_CORS_ORIGINS;
}

export const config = {
  port: parsePort(process.env.API_PORT),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGINS),
};

export { parsePort, parseCorsOrigins, DEFAULT_PORT, DEFAULT_CORS_ORIGINS };
