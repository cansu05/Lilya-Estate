import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const q1 = await pool.query("SELECT city_code, city_name FROM cities WHERE city_code IN (34,35,7) ORDER BY city_code");
  console.log('cities', q1.rows);

  const q2 = await pool.query("SELECT id, city_id, districts_name FROM districts WHERE city_id IN (34,35,7) AND districts_name IN ('Kadikoy','Konak','Muratpasa') ORDER BY city_id");
  console.log('districts', q2.rows);

  const q3 = await pool.query("SELECT n.id, n.neighborhoods_name, n.districts_id FROM neighborhoods n JOIN districts d ON d.id=n.districts_id WHERE d.city_id IN (34,35,7) AND d.districts_name IN ('Kadikoy','Konak','Muratpasa') AND n.neighborhoods_name IN ('Moda','Alsancak','Lara')");
  console.log('neighborhoods', q3.rows);
} finally {
  await pool.end();
}
