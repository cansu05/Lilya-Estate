-- DropForeignKey
ALTER TABLE "listing_photos" DROP CONSTRAINT "listing_photos_listing_id_fkey";

-- AddForeignKey
ALTER TABLE "listing_photos" ADD CONSTRAINT "listing_photos_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
