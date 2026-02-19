export type Option<T extends string = string> = {
  value: T;
  label: string;
};

export function hello(): string;

export const LISTING_TYPE: {
  readonly FOR_SALE: "for_sale";
  readonly FOR_RENT: "for_rent";
};

export const PROPERTY_TYPE: {
  readonly APARTMENT: "apartment";
  readonly HOUSE: "house";
  readonly VILLA: "villa";
  readonly LAND: "land";
  readonly OFFICE: "office";
  readonly SHOP: "shop";
};

export const ROOM_TYPE: {
  readonly STUDIO: "studio";
  readonly ONE_PLUS_ZERO: "1+0";
  readonly ONE_PLUS_ONE: "1+1";
  readonly TWO_PLUS_ONE: "2+1";
  readonly THREE_PLUS_ONE: "3+1";
  readonly FOUR_PLUS_ONE: "4+1";
  readonly FIVE_PLUS_ONE: "5+1";
  readonly SIX_PLUS_ONE: "6+1";
};

export const PARKING_TYPE: {
  readonly NONE: "none";
  readonly OPEN: "open";
  readonly CLOSED: "closed";
};

export const HEATING_TYPE: {
  readonly NONE: "none";
  readonly CENTRAL: "central";
  readonly COMBI: "combi";
  readonly STOVE: "stove";
  readonly FLOOR_HEATING: "floor_heating";
};

export type ListingType = (typeof LISTING_TYPE)[keyof typeof LISTING_TYPE];
export type PropertyType = (typeof PROPERTY_TYPE)[keyof typeof PROPERTY_TYPE];
export type RoomType = (typeof ROOM_TYPE)[keyof typeof ROOM_TYPE];
export type ParkingType = (typeof PARKING_TYPE)[keyof typeof PARKING_TYPE];
export type HeatingType = (typeof HEATING_TYPE)[keyof typeof HEATING_TYPE];

export const listingTypeOptions: Option<ListingType>[];
export const propertyTypeOptions: Option<PropertyType>[];
export const roomTypeOptions: Option<RoomType>[];
export const parkingTypeOptions: Option<ParkingType>[];
export const heatingTypeOptions: Option<HeatingType>[];

export type ListingsFiltersInput = {
  page?: string | number;
  limit?: string | number;
  cityId?: string | number;
  districtId?: string | number;
  neighborhoodId?: string | number;
  minPrice?: string | number;
  maxPrice?: string | number;
  listingType?: ListingType;
  propertyType?: PropertyType;
  roomType?: RoomType;
};

export type ParsedListingsFilters = {
  page?: number;
  limit?: number;
  cityId?: number;
  districtId?: number;
  neighborhoodId?: number;
  minPrice?: number;
  maxPrice?: number;
  listingType?: ListingType;
  propertyType?: PropertyType;
  roomType?: RoomType;
};

export type ListingsFiltersParseSuccess = {
  success: true;
  data: ParsedListingsFilters;
  error?: never;
};

export type ListingsFiltersParseError = {
  success: false;
  data?: never;
  error: { issues?: Array<{ message: string }> };
};

export function parseListingsFilters(
  input: ListingsFiltersInput
): ListingsFiltersParseSuccess | ListingsFiltersParseError;
