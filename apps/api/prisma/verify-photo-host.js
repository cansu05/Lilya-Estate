import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*) FILTER (WHERE url LIKE 'https://picsum.photos/%')::int AS picsum_count,
      COUNT(*) FILTER (WHERE url LIKE 'https://images.example.com/%')::int AS example_count,
      COUNT(*)::int AS total
    FROM listing_photos
  `);
  console.log(JSON.stringify(rows[0]));
} finally {
  await pool.end();
}
