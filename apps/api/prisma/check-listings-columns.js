import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const { rows } = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='listings' ORDER BY ordinal_position");
  console.log(rows.map((r) => r.column_name).join(','));
} finally {
  await pool.end();
}
