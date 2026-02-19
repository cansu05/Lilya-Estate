export type ListingsFilterValues = {
  page?: string;
  limit?: string;
  cityId?: string;
  districtId?: string;
  neighborhoodId?: string;
  listingType?: string;
  propertyType?: string;
  roomType?: string;
  minPrice?: string;
  maxPrice?: string;
};

export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams,
): ListingsFilterValues {
  return {
    page: searchParams.get("page") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    cityId: searchParams.get("cityId") ?? undefined,
    districtId: searchParams.get("districtId") ?? undefined,
    neighborhoodId: searchParams.get("neighborhoodId") ?? undefined,
    listingType: searchParams.get("listingType") ?? undefined,
    propertyType: searchParams.get("propertyType") ?? undefined,
    roomType: searchParams.get("roomType") ?? undefined,
    minPrice: searchParams.get("minPrice") ?? undefined,
    maxPrice: searchParams.get("maxPrice") ?? undefined,
  };
}

export function buildSearchParamsFromFilters(
  values: ListingsFilterValues,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }
  return params;
}
