UPDATE listing_photos
SET url = CASE
  WHEN is_cover = true THEN CONCAT('https://picsum.photos/seed/listing-', listing_id, '-cover/1200/800')
  ELSE CONCAT('https://picsum.photos/seed/listing-', listing_id, '-detail-', id, '/1200/800')
END
WHERE url LIKE 'https://images.example.com/%';
