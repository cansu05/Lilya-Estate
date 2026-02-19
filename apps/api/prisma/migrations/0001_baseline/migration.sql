-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "heating_type" AS ENUM ('none', 'central', 'combi', 'stove', 'floor_heating');

-- CreateEnum
CREATE TYPE "listing_type" AS ENUM ('for_sale', 'for_rent');

-- CreateEnum
CREATE TYPE "parking_type" AS ENUM ('none', 'open', 'closed');

-- CreateEnum
CREATE TYPE "property_type" AS ENUM ('apartment', 'house', 'villa', 'land', 'office', 'shop');

-- CreateEnum
CREATE TYPE "room_type" AS ENUM ('studio', '1+0', '1+1', '2+1', '3+1', '4+1', '5+1', '6+1');

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "city_code" INTEGER,
    "city_name" VARCHAR(20),

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" SERIAL NOT NULL,
    "city_id" INTEGER,
    "districts_name" VARCHAR(30),

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing_photos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "listing_id" INTEGER,
    "url" VARCHAR(250) NOT NULL,
    "is_cover" BOOLEAN,

    CONSTRAINT "listing_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "listing_number" SERIAL,
    "title" VARCHAR(150) NOT NULL,
    "neighborhood_id" INTEGER,
    "price" DECIMAL(12,2) NOT NULL,
    "property_type" "property_type" NOT NULL,
    "listing_type" "listing_type" NOT NULL,
    "net_area" INTEGER NOT NULL,
    "building_age" INTEGER NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "total_floors" INTEGER NOT NULL,
    "furnished" BOOLEAN NOT NULL,
    "balcony_count" INTEGER NOT NULL,
    "has_elevator" BOOLEAN NOT NULL,
    "parking" "parking_type" NOT NULL,
    "heating" "heating_type" NOT NULL,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "room_type" "room_type",

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neighborhoods" (
    "id" SERIAL NOT NULL,
    "districts_id" INTEGER,
    "neighborhoods_name" VARCHAR(100),

    CONSTRAINT "neighborhoods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listing_photos" ADD CONSTRAINT "listing_photos_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_neighborhood_id_fkey" FOREIGN KEY ("neighborhood_id") REFERENCES "neighborhoods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
