import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const q = await pool.query(`
    SELECT COUNT(*)::int AS total,
           COUNT(*) FILTER (WHERE lp.is_cover = true)::int AS with_cover
    FROM listings l
    LEFT JOIN listing_photos lp ON lp.listing_id = l.id
  `);
  console.log(JSON.stringify(q.rows[0]));

  const rows = await pool.query(`
    SELECT l.id, l.title, lp.url AS cover
    FROM listings l
    LEFT JOIN listing_photos lp ON lp.listing_id = l.id AND lp.is_cover = true
    ORDER BY l.created_at DESC
    LIMIT 5
  `);
  console.log(rows.rows);
} finally {
  await pool.end();
}
