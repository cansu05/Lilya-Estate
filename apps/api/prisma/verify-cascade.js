import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const target = await client.query(
      `SELECT l.id
       FROM listings l
       JOIN listing_photos lp ON lp.listing_id = l.id
       GROUP BY l.id
       ORDER BY l.id
       LIMIT 1`
    );

    if (target.rowCount === 0) {
      console.log("no_listing_with_photos_found");
    } else {
      const listingId = target.rows[0].id;
      const before = await client.query(
        "SELECT COUNT(*)::int AS count FROM listing_photos WHERE listing_id = $1",
        [listingId]
      );

      await client.query("DELETE FROM listings WHERE id = $1", [listingId]);

      const after = await client.query(
        "SELECT COUNT(*)::int AS count FROM listing_photos WHERE listing_id = $1",
        [listingId]
      );

      console.log("listing_id", listingId);
      console.log("photos_before_delete", before.rows[0].count);
      console.log("photos_after_delete", after.rows[0].count);
    }

    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
} finally {
  await pool.end();
}
