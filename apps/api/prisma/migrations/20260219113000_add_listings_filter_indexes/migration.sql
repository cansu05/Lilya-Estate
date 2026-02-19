CREATE INDEX IF NOT EXISTS "idx_listings_neighborhood_id" ON "listings" ("neighborhood_id");
CREATE INDEX IF NOT EXISTS "idx_listings_listing_type" ON "listings" ("listing_type");
CREATE INDEX IF NOT EXISTS "idx_listings_property_type" ON "listings" ("property_type");
CREATE INDEX IF NOT EXISTS "idx_listings_room_type" ON "listings" ("room_type");
CREATE INDEX IF NOT EXISTS "idx_listings_price" ON "listings" ("price");
CREATE INDEX IF NOT EXISTS "idx_listings_created_at" ON "listings" ("created_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_neighborhoods_districts_id" ON "neighborhoods" ("districts_id");
CREATE INDEX IF NOT EXISTS "idx_districts_city_id" ON "districts" ("city_id");
