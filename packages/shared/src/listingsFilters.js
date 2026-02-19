import { z } from "zod";

const listingTypeValues = ["for_sale", "for_rent"];
const propertyTypeValues = [
  "apartment",
  "house",
  "villa",
  "land",
  "office",
  "shop",
];
const roomTypeValues = ["studio", "1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+1"];

const positiveIntFromUnknown = z
  .union([z.string(), z.number()])
  .transform((value) => Number(value))
  .refine((value) => Number.isInteger(value) && value > 0)
  .optional();

const nonNegativeNumberFromUnknown = z
  .union([z.string(), z.number()])
  .transform((value) => Number(value))
  .refine((value) => Number.isFinite(value) && value >= 0)
  .optional();

export const listingsFiltersSchema = z
  .object({
    page: positiveIntFromUnknown,
    limit: positiveIntFromUnknown,
    cityId: positiveIntFromUnknown,
    districtId: positiveIntFromUnknown,
    neighborhoodId: positiveIntFromUnknown,
    minPrice: nonNegativeNumberFromUnknown,
    maxPrice: nonNegativeNumberFromUnknown,
    listingType: z.enum(listingTypeValues).optional(),
    propertyType: z.enum(propertyTypeValues).optional(),
    roomType: z.enum(roomTypeValues).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.minPrice !== undefined &&
      data.maxPrice !== undefined &&
      data.minPrice > data.maxPrice
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxPrice"],
        message: "maxPrice must be greater than or equal to minPrice",
      });
    }
  });

export function parseListingsFilters(input) {
  return listingsFiltersSchema.safeParse(input);
}
