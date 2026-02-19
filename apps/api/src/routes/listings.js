import { Router } from "express";
import { pool } from "../db.js";
import { parseIntSafe } from "../utils/validators.js";
import { parseListingsFilters } from "@repo/shared";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const parsed = parseListingsFilters(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid filters",
        details: parsed.error.issues?.map((issue) => issue.message) ?? [],
      });
    }

    const {
      page = 1,
      limit = 12,
      cityId,
      districtId,
      neighborhoodId,
      listingType,
      propertyType,
      roomType,
      minPrice,
      maxPrice,
    } = parsed.data;

    const offset = (page - 1) * limit;

    const filters = [];
    const values = [];

    if (cityId !== undefined) {
      values.push(cityId);
      filters.push(`c.city_code = $${values.length}`);
    }
    if (districtId !== undefined) {
      values.push(districtId);
      filters.push(`d.id = $${values.length}`);
    }
    if (neighborhoodId !== undefined) {
      values.push(neighborhoodId);
      filters.push(`n.id = $${values.length}`);
    }
    if (listingType !== undefined) {
      values.push(listingType);
      filters.push(`l.listing_type = $${values.length}`);
    }
    if (propertyType !== undefined) {
      values.push(propertyType);
      filters.push(`l.property_type = $${values.length}`);
    }
    if (roomType !== undefined) {
      values.push(roomType);
      filters.push(`l.room_type = $${values.length}`);
    }
    if (minPrice !== undefined) {
      values.push(minPrice);
      filters.push(`l.price >= $${values.length}`);
    }
    if (maxPrice !== undefined) {
      values.push(maxPrice);
      filters.push(`l.price <= $${values.length}`);
    }

    values.push(limit);
    const limitParam = `$${values.length}`;

    values.push(offset);
    const offsetParam = `$${values.length}`;

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    const listSql = `
      SELECT
        l.id,
        l.title,
        l.price,
        l.listing_type,
        l.property_type,
        l.room_type,
        l.net_area,
        l.building_age,
        l.floor_number,
        l.total_floors,
        l.furnished,
        l.neighborhood_id,
        l.created_at,
        l.latitude,
        l.longitude,
        lp.url AS cover_photo_url,
        CONCAT(c.city_name, ' / ', d.districts_name, ' / ', n.neighborhoods_name) AS location
      FROM listings AS l
      LEFT JOIN listing_photos AS lp
        ON lp.listing_id = l.id
       AND lp.is_cover = true
      JOIN neighborhoods n ON n.id = l.neighborhood_id
      JOIN districts d ON d.id = n.districts_id
      LEFT JOIN cities c ON c.city_code = d.city_id
      ${whereClause}
      ORDER BY l.created_at DESC
      LIMIT ${limitParam}
      OFFSET ${offsetParam};
    `;

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM listings AS l
      JOIN neighborhoods n ON n.id = l.neighborhood_id
      JOIN districts d ON d.id = n.districts_id
      LEFT JOIN cities c ON c.city_code = d.city_id
      ${whereClause};
    `;

    const [{ rows }, { rows: countRows }] = await Promise.all([
      pool.query(listSql, values),
      pool.query(countSql, values.slice(0, values.length - 2)),
    ]);

    const total = countRows[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({
      page,
      limit,
      total,
      totalPages,
      items: rows,
    });
  } catch (error) {
    console.error("GET /listings error", { requestId: req.requestId, error });
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listingId = parseIntSafe(req.params.id);

    if (!listingId) {
      return res.status(400).json({ message: "Invalid listing id" });
    }

    const listingSql = `
      SELECT
        l.id,
        l.title,
        l.price,
        l.listing_type,
        l.property_type,
        l.room_type,
        l.net_area,
        l.building_age,
        l.floor_number,
        l.total_floors,
        l.furnished,
        l.balcony_count,
        l.has_elevator,
        l.parking,
        l.heating,
        l.neighborhood_id,
        l.created_at,
        l.latitude,
        l.longitude,
        CONCAT(c.city_name, ' / ', d.districts_name, ' / ', n.neighborhoods_name) AS location
      FROM listings AS l
      JOIN neighborhoods n ON n.id = l.neighborhood_id
      JOIN districts d ON d.id = n.districts_id
      LEFT JOIN cities c ON c.city_code = d.city_id
      WHERE l.id = $1
      ORDER BY l.created_at DESC;
    `;

    const { rows } = await pool.query(listingSql, [listingId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const photosSql = `
      SELECT
        id,
        url,
        is_cover
      FROM listing_photos
      WHERE listing_id = $1
      ORDER BY created_at DESC;
    `;

    const { rows: images } = await pool.query(photosSql, [listingId]);

    res.json({
      ...rows[0],
      images,
    });
  } catch (error) {
    console.error("GET /listings/:id error", { requestId: req.requestId, error });
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
