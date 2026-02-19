import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const { rows } = await pool.query(`
    SELECT l.id, l.title, lp.url
    FROM listings l
    JOIN listing_photos lp ON lp.listing_id = l.id AND lp.is_cover = true
    ORDER BY l.created_at DESC
    LIMIT 5
  `);
  console.log(rows);
} finally {
  await pool.end();
}
