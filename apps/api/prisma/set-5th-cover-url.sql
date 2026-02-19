WITH ranked AS (
  SELECT l.id,
         ROW_NUMBER() OVER (ORDER BY l.created_at DESC) AS rn
  FROM listings l
)
UPDATE listing_photos lp
SET url = 'https://i.pinimg.com/1200x/92/16/ef/9216ef6188e1481c01d880f566945ae4.jpg'
FROM ranked r
WHERE r.rn = 5
  AND lp.listing_id = r.id
  AND lp.is_cover = true;
