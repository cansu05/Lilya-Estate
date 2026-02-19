import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const listings = await pool.query("SELECT id FROM listings WHERE id IN (1,2,3) ORDER BY id");
  const photos = await pool.query("SELECT listing_id, COUNT(*)::int AS count FROM listing_photos WHERE listing_id IN (1,2,3) GROUP BY listing_id ORDER BY listing_id");

  console.log("remaining_listing_ids", JSON.stringify(listings.rows.map((r) => r.id)));
  console.log("remaining_photo_rows", JSON.stringify(photos.rows));
} finally {
  await pool.end();
}
