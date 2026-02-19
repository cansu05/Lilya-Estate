import type {
  HeatingType,
  ListingType,
  ParkingType,
  PropertyType,
  RoomType,
} from "@repo/shared";
import { apiClient } from "./client";

export type ListingItemDto = {
  id: number;
  title: string;
  price: string;
  listing_type: ListingType | null;
  property_type: PropertyType | null;
  room_type: RoomType | null;
  net_area: number;
  building_age: number;
  floor_number: number;
  total_floors: number;
  furnished: boolean;
  balcony_count?: number;
  has_elevator?: boolean;
  parking?: ParkingType | null;
  heating?: HeatingType | null;
  neighborhood_id: number;
  created_at: string;
  cover_photo_url: string | null;
  location: string;
  latitude: string | null;
  longitude: string | null;
};

export type ListingsResponseDto = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: ListingItemDto[];
};

export type ListingPhotoDto = {
  id: number;
  url: string;
  is_cover: boolean | null;
};

export type ListingDetailDto = Omit<ListingItemDto, "cover_photo_url"> & {
  images: ListingPhotoDto[];
};

export type GetListingsParams = {
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

export async function getListings(
  params?: GetListingsParams,
  signal?: AbortSignal
): Promise<ListingsResponseDto> {
  const { data } = await apiClient.get<ListingsResponseDto>("/listings", {
    params,
    signal,
  });

  return data;
}

export async function getListingById(
  id: number | string,
  signal?: AbortSignal
): Promise<ListingDetailDto> {
  const { data } = await apiClient.get<ListingDetailDto>(`/listings/${id}`, {
    signal,
  });

  return data;
}
