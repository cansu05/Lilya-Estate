import { Router } from "express";
import { queryWithRetry } from "../db.js";
import { parseIntSafe } from "../utils/validators.js";

const router = Router();

router.get("/cities", async (req, res) => {
  console.log("GET /locations/cities hit");
  try {
    const sql = `
        SELECT city_code as id, city_name as name
        FROM cities
        ORDER BY city_name; 
        `;
    const { rows } = await queryWithRetry(sql);
    res.json(rows);
  } catch (error) {
    console.error("GET /locations/cities error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/districts", async (req, res) => {
  try {
    const cityCode = parseIntSafe(req.query.cityCode);
    if (cityCode === null) {
      return res
        .status(400)
        .json({ message: "cityCode query param is required" });
    }
    const sql = `
    SELECT id, districts_name as name from districts
    WHERE city_id = $1
    ORDER BY districts_name;
    `;
    const { rows } = await queryWithRetry(sql, [cityCode]);
    res.json(rows);
  } catch (error) {
    console.error("GET /locations/districts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/neighborhoods", async (req, res) => {
  try {
    const districtId = parseIntSafe(req.query.districtId);
    if (districtId === null) {
      return res
        .status(400)
        .json({ message: "districtId query param is required" });
    }

    const sql = `
        Select id, neighborhoods_name as name from neighborhoods
        where districts_id = $1
        order by neighborhoods_name;
        `;
    const { rows } = await queryWithRetry(sql, [districtId]);
    res.json(rows);
  } catch (error) {
    console.error("GET /locations/neighborhoods error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
