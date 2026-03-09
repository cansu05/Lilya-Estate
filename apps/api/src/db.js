import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.DB_POOL_MAX ?? 10),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 30000),
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS ?? 5000),
  allowExitOnIdle: true,
});

const RETRYABLE_DB_CODES = new Set([
  "57P01", // admin_shutdown
  "57P03", // cannot_connect_now
  "53300", // too_many_connections
  "ETIMEDOUT",
  "ECONNRESET",
  "ECONNREFUSED",
]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableDbError(error) {
  const code = error?.code;
  if (code && RETRYABLE_DB_CODES.has(code)) return true;

  const message = String(error?.message ?? "").toLowerCase();
  return (
    message.includes("timeout") ||
    message.includes("connection terminated unexpectedly") ||
    message.includes("the database system is starting up") ||
    message.includes("could not connect")
  );
}

export async function queryWithRetry(
  sql,
  params = [],
  { retries = 1, initialDelayMs = 200 } = {}
) {
  let attempt = 0;

  while (true) {
    try {
      return await pool.query(sql, params);
    } catch (error) {
      if (attempt >= retries || !isRetryableDbError(error)) {
        throw error;
      }

      const delayMs = initialDelayMs * Math.pow(2, attempt);
      await sleep(delayMs);
      attempt += 1;
    }
  }
}

export async function warmupDatabase() {
  try {
    await queryWithRetry("SELECT 1;", [], { retries: 1, initialDelayMs: 300 });
    return true;
  } catch (error) {
    console.warn("DB warmup failed, continuing startup:", error?.message ?? error);
    return false;
  }
}
