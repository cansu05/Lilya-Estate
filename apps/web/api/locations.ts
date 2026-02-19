import { apiClient } from "./client";

export type CityDto = {
  id: number;
  name: string;
};

export type DistrictDto = {
  id: number;
  name: string;
};

export type NeighborhoodDto = {
  id: number;
  name: string;
};

export type LocationOption = {
  value: string;
  label: string;
};

const districtOptionsCache = new Map<string, LocationOption[]>();
const neighborhoodOptionsCache = new Map<string, LocationOption[]>();
let cityOptionsCache: LocationOption[] | null = null;
let cityOptionsPromise: Promise<LocationOption[]> | null = null;
const districtOptionsPromiseCache = new Map<string, Promise<LocationOption[]>>();
const neighborhoodOptionsPromiseCache = new Map<string, Promise<LocationOption[]>>();

export async function getCities(_signal?: AbortSignal): Promise<CityDto[]> {
  void _signal;
  const { data } = await apiClient.get<CityDto[]>("/locations/cities");
  return data;
}

export async function getLocationOptions(signal?: AbortSignal): Promise<LocationOption[]> {
  if (cityOptionsCache) return cityOptionsCache;
  if (cityOptionsPromise) return cityOptionsPromise;

  cityOptionsPromise = (async () => {
    const cities = await getCities(signal);
    const mapped = cities.map((city) => ({
      value: String(city.id),
      label: city.name,
    }));
    cityOptionsCache = mapped;
    return mapped;
  })();

  try {
    return await cityOptionsPromise;
  } finally {
    cityOptionsPromise = null;
  }
}

export async function getDistricts(
  cityCode: number | string,
  _signal?: AbortSignal
): Promise<DistrictDto[]> {
  void _signal;
  const { data } = await apiClient.get<DistrictDto[]>("/locations/districts", {
    params: { cityCode },
  });
  return data;
}

export async function getDistrictOptions(
  cityCode: number | string,
  signal?: AbortSignal
): Promise<LocationOption[]> {
  const cacheKey = String(cityCode);
  const cached = districtOptionsCache.get(cacheKey);
  if (cached) return cached;
  const inflight = districtOptionsPromiseCache.get(cacheKey);
  if (inflight) return inflight;

  const request = (async () => {
    const districts = await getDistricts(cityCode, signal);
    const mapped = districts.map((district) => ({
      value: String(district.id),
      label: district.name,
    }));
    districtOptionsCache.set(cacheKey, mapped);
    return mapped;
  })();

  districtOptionsPromiseCache.set(cacheKey, request);
  try {
    return await request;
  } finally {
    districtOptionsPromiseCache.delete(cacheKey);
  }
}

export async function getNeighborhoods(
  districtId: number | string,
  _signal?: AbortSignal
): Promise<NeighborhoodDto[]> {
  void _signal;
  const { data } = await apiClient.get<NeighborhoodDto[]>(
    "/locations/neighborhoods",
    {
      params: { districtId },
    }
  );
  return data;
}

export async function getNeighborhoodOptions(
  districtId: number | string,
  signal?: AbortSignal
): Promise<LocationOption[]> {
  const cacheKey = String(districtId);
  const cached = neighborhoodOptionsCache.get(cacheKey);
  if (cached) return cached;
  const inflight = neighborhoodOptionsPromiseCache.get(cacheKey);
  if (inflight) return inflight;

  const request = (async () => {
    const neighborhoods = await getNeighborhoods(districtId, signal);
    const mapped = neighborhoods.map((neighborhood) => ({
      value: String(neighborhood.id),
      label: neighborhood.name,
    }));
    neighborhoodOptionsCache.set(cacheKey, mapped);
    return mapped;
  })();

  neighborhoodOptionsPromiseCache.set(cacheKey, request);
  try {
    return await request;
  } finally {
    neighborhoodOptionsPromiseCache.delete(cacheKey);
  }
}
