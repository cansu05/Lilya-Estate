import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const queries = [
    ["listings", "SELECT COUNT(*)::int AS c FROM listings"],
    ["cities", "SELECT COUNT(*)::int AS c FROM cities"],
    ["districts", "SELECT COUNT(*)::int AS c FROM districts"],
    ["neighborhoods", "SELECT COUNT(*)::int AS c FROM neighborhoods"],
    ["joined", `SELECT COUNT(*)::int AS c FROM listings l JOIN neighborhoods n ON n.id=l.neighborhood_id JOIN districts d ON d.id=n.districts_id JOIN cities c ON c.city_code=d.city_id`],
  ];

  for (const [name, sql] of queries) {
    const { rows } = await pool.query(sql);
    console.log(name, rows[0].c);
  }

  const { rows: sample } = await pool.query("SELECT id, title, neighborhood_id FROM listings ORDER BY id DESC LIMIT 5");
  console.log(sample);
} finally {
  await pool.end();
}
