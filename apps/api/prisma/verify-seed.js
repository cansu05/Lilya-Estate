import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const titles = [
  "Modern Downtown Apartment",
  "Cozy Family Home",
  "Luxury Skyline Penthouse",
  "Bright Studio Flat",
  "City Center Office Space",
  "Garden View Villa",
  "Renovated Corner Apartment",
  "Compact One Bedroom",
  "Prime Location Retail Shop",
  "Development Land Parcel"
];

try {
  const listings = await pool.query(
    "SELECT COUNT(*)::int AS count FROM listings WHERE title = ANY($1)",
    [titles]
  );

  const photos = await pool.query(
    "SELECT COUNT(*)::int AS count FROM listing_photos lp JOIN listings l ON l.id = lp.listing_id WHERE l.title = ANY($1)",
    [titles]
  );

  console.log("seeded_listings", listings.rows[0].count);
  console.log("seeded_photos", photos.rows[0].count);
} finally {
  await pool.end();
}
