BEGIN;

-- Reset sequences
SELECT setval(pg_get_serial_sequence('cities', 'id'), COALESCE((SELECT MAX(id) FROM cities), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('districts', 'id'), COALESCE((SELECT MAX(id) FROM districts), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('neighborhoods', 'id'), COALESCE((SELECT MAX(id) FROM neighborhoods), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('listings', 'id'), COALESCE((SELECT MAX(id) FROM listings), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('listings', 'listing_number'), COALESCE((SELECT MAX(listing_number) FROM listings), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('listing_photos', 'id'), COALESCE((SELECT MAX(id) FROM listing_photos), 0) + 1, false);

-- Remove previous demo listings and photos
WITH target_titles AS (
  SELECT UNNEST(ARRAY[
    'Modern Downtown Apartment',
    'Cozy Family Home',
    'Luxury Skyline Penthouse',
    'Bright Studio Flat',
    'City Center Office Space',
    'Garden View Villa',
    'Renovated Corner Apartment',
    'Compact One Bedroom',
    'Prime Location Retail Shop',
    'Development Land Parcel'
  ]) AS title
)
DELETE FROM listing_photos
WHERE listing_id IN (
  SELECT l.id FROM listings l JOIN target_titles t ON t.title = l.title
);

WITH target_titles AS (
  SELECT UNNEST(ARRAY[
    'Modern Downtown Apartment',
    'Cozy Family Home',
    'Luxury Skyline Penthouse',
    'Bright Studio Flat',
    'City Center Office Space',
    'Garden View Villa',
    'Renovated Corner Apartment',
    'Compact One Bedroom',
    'Prime Location Retail Shop',
    'Development Land Parcel'
  ]) AS title
)
DELETE FROM listings
WHERE title IN (SELECT title FROM target_titles);

-- Ensure location hierarchy exists (TR)
INSERT INTO districts (city_id, districts_name)
SELECT 34, 'Kadikoy'
WHERE NOT EXISTS (
  SELECT 1 FROM districts WHERE city_id = 34 AND districts_name = 'Kadikoy'
);

INSERT INTO districts (city_id, districts_name)
SELECT 35, 'Konak'
WHERE NOT EXISTS (
  SELECT 1 FROM districts WHERE city_id = 35 AND districts_name = 'Konak'
);

INSERT INTO districts (city_id, districts_name)
SELECT 7, 'Muratpasa'
WHERE NOT EXISTS (
  SELECT 1 FROM districts WHERE city_id = 7 AND districts_name = 'Muratpasa'
);

INSERT INTO neighborhoods (districts_id, neighborhoods_name)
SELECT d.id, 'Moda'
FROM districts d
WHERE d.city_id = 34
  AND d.districts_name = 'Kadikoy'
  AND NOT EXISTS (
    SELECT 1 FROM neighborhoods n WHERE n.districts_id = d.id AND n.neighborhoods_name = 'Moda'
  );

INSERT INTO neighborhoods (districts_id, neighborhoods_name)
SELECT d.id, 'Alsancak'
FROM districts d
WHERE d.city_id = 35
  AND d.districts_name = 'Konak'
  AND NOT EXISTS (
    SELECT 1 FROM neighborhoods n WHERE n.districts_id = d.id AND n.neighborhoods_name = 'Alsancak'
  );

INSERT INTO neighborhoods (districts_id, neighborhoods_name)
SELECT d.id, 'Lara'
FROM districts d
WHERE d.city_id = 7
  AND d.districts_name = 'Muratpasa'
  AND NOT EXISTS (
    SELECT 1 FROM neighborhoods n WHERE n.districts_id = d.id AND n.neighborhoods_name = 'Lara'
  );

WITH listing_input AS (
  SELECT *
  FROM (VALUES
    (1, 'Modern Downtown Apartment',        185000.00, 'apartment', 'for_sale',  95,  4,  5, 12, false, 1, true,  'closed', 'combi',         41.029500, 29.008200, '2+1'),
    (2, 'Cozy Family Home',                 210000.00, 'house',     'for_sale', 140,  8,  1,  2, true,  2, false, 'open',   'central',       38.432100, 27.138500, '3+1'),
    (3, 'Luxury Skyline Penthouse',         420000.00, 'apartment', 'for_sale', 180,  2, 14, 15, false, 2, true,  'closed', 'floor_heating', 36.868900, 30.738000, '4+1'),
    (4, 'Bright Studio Flat',                 1500.00, 'apartment', 'for_rent',  45,  6,  3,  8, true,  1, true,  'none',   'combi',         41.031700, 29.032200, 'studio'),
    (5, 'City Center Office Space',           2400.00, 'office',    'for_rent', 110, 10,  6, 10, false, 0, true,  'closed', 'central',       38.427900, 27.143600, NULL),
    (6, 'Garden View Villa',               560000.00, 'villa',     'for_sale', 260,  3,  2,  3, false, 3, true,  'open',   'floor_heating', 36.848100, 30.781100, '5+1'),
    (7, 'Renovated Corner Apartment',      198000.00, 'apartment', 'for_sale', 100,  7,  4,  9, true,  1, true,  'closed', 'combi',         41.042400, 29.019500, '2+1'),
    (8, 'Compact One Bedroom',               1300.00, 'apartment', 'for_rent',  55, 12,  2,  6, true,  1, false, 'none',   'stove',         38.435200, 27.147200, '1+1'),
    (9, 'Prime Location Retail Shop',      310000.00, 'shop',      'for_sale',  85,  5,  0,  4, false, 0, false, 'open',   'none',          36.882000, 30.705600, NULL),
    (10,'Development Land Parcel',         275000.00, 'land',      'for_sale', 500,  0,  0,  0, false, 0, false, 'none',   'none',          41.021800, 29.001700, NULL)
  ) AS t(
    row_num,
    title,
    price,
    property_type,
    listing_type,
    net_area,
    building_age,
    floor_number,
    total_floors,
    furnished,
    balcony_count,
    has_elevator,
    parking,
    heating,
    latitude,
    longitude,
    room_type
  )
),
selected_neighborhoods AS (
  SELECT n.id AS neighborhood_id, d.city_id
  FROM neighborhoods n
  JOIN districts d ON d.id = n.districts_id
  WHERE (d.city_id = 34 AND d.districts_name = 'Kadikoy' AND n.neighborhoods_name = 'Moda')
     OR (d.city_id = 35 AND d.districts_name = 'Konak' AND n.neighborhoods_name = 'Alsancak')
     OR (d.city_id = 7  AND d.districts_name = 'Muratpasa' AND n.neighborhoods_name = 'Lara')
),
inserted_listings AS (
  INSERT INTO listings (
    title,
    neighborhood_id,
    created_at,
    price,
    property_type,
    listing_type,
    net_area,
    building_age,
    floor_number,
    total_floors,
    furnished,
    balcony_count,
    has_elevator,
    parking,
    heating,
    latitude,
    longitude,
    room_type,
    updated_at
  )
  SELECT
    li.title,
    sn.neighborhood_id,
    NOW() - ((10 - li.row_num) * INTERVAL '1 minute'),
    li.price,
    li.property_type::property_type,
    li.listing_type::listing_type,
    li.net_area,
    li.building_age,
    li.floor_number,
    li.total_floors,
    li.furnished,
    li.balcony_count,
    li.has_elevator,
    li.parking::parking_type,
    li.heating::heating_type,
    li.latitude,
    li.longitude,
    CASE WHEN li.room_type IS NULL THEN NULL ELSE li.room_type::room_type END,
    NOW()
  FROM listing_input li
  JOIN selected_neighborhoods sn
    ON sn.city_id = CASE ((li.row_num - 1) % 3)
      WHEN 0 THEN 34
      WHEN 1 THEN 35
      ELSE 7
    END
  ORDER BY li.row_num
  RETURNING id
),
numbered_inserted AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS row_num
  FROM inserted_listings
)
INSERT INTO listing_photos (listing_id, url, is_cover, created_at)
SELECT
  ni.id,
  CONCAT('https://picsum.photos/seed/listing-', ni.id, '-cover/1200/800'),
  true,
  NOW()
FROM numbered_inserted ni
UNION ALL
SELECT
  ni.id,
  CONCAT('https://picsum.photos/seed/listing-', ni.id, '-detail-', ni.row_num, '/1200/800'),
  false,
  NOW()
FROM numbered_inserted ni;

COMMIT;
