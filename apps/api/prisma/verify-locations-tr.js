import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const { rows } = await pool.query(`
    SELECT l.id,
           l.title,
           CONCAT(c.city_name, ' / ', d.districts_name, ' / ', n.neighborhoods_name) AS location
    FROM listings l
    JOIN neighborhoods n ON n.id = l.neighborhood_id
    JOIN districts d ON d.id = n.districts_id
    JOIN cities c ON c.city_code = d.city_id
    ORDER BY l.id DESC
    LIMIT 10
  `);

  console.log(rows);
} finally {
  await pool.end();
}
