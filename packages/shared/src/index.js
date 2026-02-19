export const hello = () => "hello from shared";

export const LISTING_TYPE = Object.freeze({
  FOR_SALE: "for_sale",
  FOR_RENT: "for_rent",
});

export const PROPERTY_TYPE = Object.freeze({
  APARTMENT: "apartment",
  HOUSE: "house",
  VILLA: "villa",
  LAND: "land",
  OFFICE: "office",
  SHOP: "shop",
});

export const ROOM_TYPE = Object.freeze({
  STUDIO: "studio",
  ONE_PLUS_ZERO: "1+0",
  ONE_PLUS_ONE: "1+1",
  TWO_PLUS_ONE: "2+1",
  THREE_PLUS_ONE: "3+1",
  FOUR_PLUS_ONE: "4+1",
  FIVE_PLUS_ONE: "5+1",
  SIX_PLUS_ONE: "6+1",
});

export const PARKING_TYPE = Object.freeze({
  NONE: "none",
  OPEN: "open",
  CLOSED: "closed",
});

export const HEATING_TYPE = Object.freeze({
  NONE: "none",
  CENTRAL: "central",
  COMBI: "combi",
  STOVE: "stove",
  FLOOR_HEATING: "floor_heating",
});

export const listingTypeOptions = [
  { value: LISTING_TYPE.FOR_SALE, label: "For Sale" },
  { value: LISTING_TYPE.FOR_RENT, label: "For Rent" },
];

export const propertyTypeOptions = [
  { value: PROPERTY_TYPE.APARTMENT, label: "Apartment" },
  { value: PROPERTY_TYPE.HOUSE, label: "House" },
  { value: PROPERTY_TYPE.VILLA, label: "Villa" },
  { value: PROPERTY_TYPE.LAND, label: "Land" },
  { value: PROPERTY_TYPE.OFFICE, label: "Office" },
  { value: PROPERTY_TYPE.SHOP, label: "Shop" },
];

export const roomTypeOptions = [
  { value: ROOM_TYPE.STUDIO, label: "Studio" },
  { value: ROOM_TYPE.ONE_PLUS_ZERO, label: "1+0" },
  { value: ROOM_TYPE.ONE_PLUS_ONE, label: "1+1" },
  { value: ROOM_TYPE.TWO_PLUS_ONE, label: "2+1" },
  { value: ROOM_TYPE.THREE_PLUS_ONE, label: "3+1" },
  { value: ROOM_TYPE.FOUR_PLUS_ONE, label: "4+1" },
  { value: ROOM_TYPE.FIVE_PLUS_ONE, label: "5+1" },
  { value: ROOM_TYPE.SIX_PLUS_ONE, label: "6+1" },
];

export const parkingTypeOptions = [
  { value: PARKING_TYPE.NONE, label: "None" },
  { value: PARKING_TYPE.OPEN, label: "Open" },
  { value: PARKING_TYPE.CLOSED, label: "Closed" },
];

export const heatingTypeOptions = [
  { value: HEATING_TYPE.NONE, label: "None" },
  { value: HEATING_TYPE.CENTRAL, label: "Central" },
  { value: HEATING_TYPE.COMBI, label: "Combi" },
  { value: HEATING_TYPE.STOVE, label: "Stove" },
  { value: HEATING_TYPE.FLOOR_HEATING, label: "Floor Heating" },
];

export { listingsFiltersSchema, parseListingsFilters } from "./listingsFilters.js";
