import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const { rows } = await pool.query(`
    SELECT listing_id, url
    FROM listing_photos
    WHERE is_cover = true
    ORDER BY listing_id
    LIMIT 12
  `);
  console.log(rows);
} finally {
  await pool.end();
}
