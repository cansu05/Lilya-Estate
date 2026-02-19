WITH url_map AS (
  SELECT UNNEST(ARRAY[
    'https://i.pinimg.com/736x/59/19/7a/59197a759d96330b4fdc0ecf4a97c9e2.jpg',
    'https://i.pinimg.com/1200x/bc/2b/b1/bc2bb144586bc36769421dd6c58f1c49.jpg',
    'https://i.pinimg.com/736x/ab/f9/02/abf9026c435c8e9ea36147916f1a968f.jpg',
    'https://i.pinimg.com/1200x/99/66/69/996669e96668f9129b6d9b17b403b821.jpg'
  ]) AS url
)
INSERT INTO listing_photos (listing_id, url, is_cover, created_at)
SELECT
  l.id,
  um.url,
  false,
  NOW()
FROM listings l
CROSS JOIN url_map um
WHERE NOT EXISTS (
  SELECT 1
  FROM listing_photos lp
  WHERE lp.listing_id = l.id
    AND lp.url = um.url
);
