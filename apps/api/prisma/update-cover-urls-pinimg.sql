WITH ordered_covers AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY listing_id, id) AS rn
  FROM listing_photos
  WHERE is_cover = true
),
url_map AS (
  SELECT 1 AS idx, 'https://i.pinimg.com/736x/d1/b0/1c/d1b01cd683d475a66fb93ac31c588744.jpg' AS url
  UNION ALL
  SELECT 2, 'https://i.pinimg.com/1200x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg'
  UNION ALL
  SELECT 3, 'https://i.pinimg.com/1200x/1c/6d/78/1c6d781f223ddef8c370e7cf37e0d90a.jpg'
  UNION ALL
  SELECT 4, 'https://i.pinimg.com/1200x/32/de/36/32de363ae35ee7a69bfb45f57bfd331c.jpg'
  UNION ALL
  SELECT 5, 'https://i.pinimg.com/1200x/92/16/ef/9216ef6188e1481c01d880f566945ae4.jpg'
)
UPDATE listing_photos lp
SET url = um.url
FROM ordered_covers oc
JOIN url_map um ON um.idx = ((oc.rn - 1) % 5) + 1
WHERE lp.id = oc.id;
