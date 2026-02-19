"use client";

import { getListings, type ListingItemDto } from "@/api/listings";
import type { ListingType, PropertyType, RoomType } from "@repo/shared";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import SelectAutocomplete from "./SelectAutocomplete";
import useDebouncedValue from "./hooks/useDebouncedValue";

type Option = {
  value: string;
  label: string;
};

const mapListingsCache = new Map<string, ListingItemDto[]>();

type MapSearchDialogProps = {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
  isCityLoading: boolean;
  isDistrictLoading: boolean;
  isNeighborhoodLoading: boolean;
  cityOptions: Option[];
  districtOptions: Option[];
  neighborhoodOptions: Option[];
  listingTypeOptions: Option[];
  propertyTypeOptions: Option[];
  roomTypeOptions: Option[];
  selectedCity: Option | null;
  cityInput: string;
  selectedDistrict: Option | null;
  districtInput: string;
  selectedNeighborhood: Option | null;
  neighborhoodInput: string;
  selectedListingType: Option | null;
  selectedPropertyType: Option | null;
  selectedRoomType: Option | null;
  onLocationChange: (value: Option | null) => void;
  onLocationInputChange: (value: string) => void;
  onDistrictChange: (value: Option | null) => void;
  onDistrictInputChange: (value: string) => void;
  onNeighborhoodChange: (value: Option | null) => void;
  onNeighborhoodInputChange: (value: string) => void;
  onListingTypeChange: (value: Option | null) => void;
  onPropertyTypeChange: (value: Option | null) => void;
  onRoomTypeChange: (value: Option | null) => void;
};

const cityCenters: Record<string, { lat: number; lon: number }> = {
  istanbul: { lat: 41.0082, lon: 28.9784 },
  ankara: { lat: 39.9334, lon: 32.8597 },
  izmir: { lat: 38.4237, lon: 27.1428 },
  antalya: { lat: 36.8969, lon: 30.7133 },
  bursa: { lat: 40.1885, lon: 29.061 },
  mugla: { lat: 37.2153, lon: 28.3636 },
  adana: { lat: 37.0017, lon: 35.3289 },
  mersin: { lat: 36.8121, lon: 34.6415 },
};

const MapListingsPreview = dynamic(() => import("./MapListingsPreview"), {
  ssr: false,
});

function normalizeTr(text: string) {
  return text
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findByInput(options: Option[], input: string) {
  return (
    options.find(
      (option) => normalizeTr(option.label) === normalizeTr(input),
    ) ?? null
  );
}

function toPositiveInt(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function toNonNegativeNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function buildMapCacheKey(params: {
  city?: string;
  district?: string;
  neighborhood?: string;
  listingType?: string;
  propertyType?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return JSON.stringify(params);
}

export default function MapSearchDialog({
  open,
  onClose,
  onSearch,
  isCityLoading,
  isDistrictLoading,
  isNeighborhoodLoading,
  cityOptions,
  districtOptions,
  neighborhoodOptions,
  listingTypeOptions,
  propertyTypeOptions,
  roomTypeOptions,
  selectedCity,
  cityInput,
  selectedDistrict,
  districtInput,
  selectedNeighborhood,
  neighborhoodInput,
  selectedListingType,
  selectedPropertyType,
  selectedRoomType,
  onLocationChange,
  onLocationInputChange,
  onDistrictChange,
  onDistrictInputChange,
  onNeighborhoodChange,
  onNeighborhoodInputChange,
  onListingTypeChange,
  onPropertyTypeChange,
  onRoomTypeChange,
}: MapSearchDialogProps) {
  const [mapListings, setMapListings] = useState<ListingItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const matchedCity = useMemo(
    () => selectedCity ?? findByInput(cityOptions, cityInput),
    [cityInput, cityOptions, selectedCity],
  );
  const matchedDistrict = useMemo(
    () => selectedDistrict ?? findByInput(districtOptions, districtInput),
    [districtInput, districtOptions, selectedDistrict],
  );
  const matchedNeighborhood = useMemo(
    () =>
      selectedNeighborhood ??
      findByInput(neighborhoodOptions, neighborhoodInput),
    [neighborhoodInput, neighborhoodOptions, selectedNeighborhood],
  );

  const debouncedCityValue = useDebouncedValue(matchedCity?.value, 250);
  const debouncedDistrictValue = useDebouncedValue(matchedDistrict?.value, 250);
  const debouncedNeighborhoodValue = useDebouncedValue(
    matchedNeighborhood?.value,
    250,
  );
  const debouncedListingTypeValue = useDebouncedValue(
    selectedListingType?.value,
    250,
  );
  const debouncedPropertyTypeValue = useDebouncedValue(
    selectedPropertyType?.value,
    250,
  );
  const debouncedRoomTypeValue = useDebouncedValue(selectedRoomType?.value, 250);
  const debouncedMinPrice = useDebouncedValue(minPriceInput, 400);
  const debouncedMaxPrice = useDebouncedValue(maxPriceInput, 400);

  const minPriceValue = toNonNegativeNumber(debouncedMinPrice);
  const maxPriceValue = toNonNegativeNumber(debouncedMaxPrice);
  const isPriceRangeInvalid =
    minPriceValue !== undefined &&
    maxPriceValue !== undefined &&
    minPriceValue > maxPriceValue;

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      try {
        if (isPriceRangeInvalid) {
          setMapListings([]);
          return;
        }

        const query = {
          page: 1 as const,
          limit: 100 as const,
          cityId: toPositiveInt(debouncedCityValue),
          districtId: toPositiveInt(debouncedDistrictValue),
          neighborhoodId: toPositiveInt(debouncedNeighborhoodValue),
          minPrice: minPriceValue,
          maxPrice: maxPriceValue,
          listingType: debouncedListingTypeValue as ListingType | undefined,
          propertyType: debouncedPropertyTypeValue as PropertyType | undefined,
          roomType: debouncedRoomTypeValue as RoomType | undefined,
        };

        const cacheKey = buildMapCacheKey({
          city: debouncedCityValue,
          district: debouncedDistrictValue,
          neighborhood: debouncedNeighborhoodValue,
          listingType: debouncedListingTypeValue,
          propertyType: debouncedPropertyTypeValue,
          roomType: debouncedRoomTypeValue,
          minPrice: minPriceValue,
          maxPrice: maxPriceValue,
        });

        const cached = mapListingsCache.get(cacheKey);
        if (cached) {
          setMapListings(cached);
          return;
        }

        const response = await getListings(query, controller.signal);
        mapListingsCache.set(cacheKey, response.items);
        setMapListings(response.items);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Map listings fetch failed:", error);
        setMapListings([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [
    open,
    debouncedCityValue,
    debouncedDistrictValue,
    debouncedNeighborhoodValue,
    debouncedListingTypeValue,
    debouncedPropertyTypeValue,
    debouncedRoomTypeValue,
    minPriceValue,
    maxPriceValue,
    isPriceRangeInvalid,
  ]);

  const mapCenter = useMemo(() => {
    const firstWithCoordinates = mapListings.find((listing) => {
      const lat = listing.latitude ? Number(listing.latitude) : null;
      const lon = listing.longitude ? Number(listing.longitude) : null;
      return Number.isFinite(lat) && Number.isFinite(lon);
    });

    if (firstWithCoordinates?.latitude && firstWithCoordinates?.longitude) {
      return {
        lat: Number(firstWithCoordinates.latitude),
        lon: Number(firstWithCoordinates.longitude),
      };
    }

    if (matchedCity?.label) {
      const key = normalizeTr(matchedCity.label);
      return cityCenters[key] ?? { lat: 39.0, lon: 35.0 };
    }

    return { lat: 39.0, lon: 35.0 };
  }, [mapListings, matchedCity?.label]);

  const mapZoom = matchedNeighborhood
    ? 13
    : matchedDistrict
      ? 11
      : matchedCity
        ? 9
        : 6;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid rgba(183,142,121,0.35)",
        },
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: { xs: 1.6, md: 2 },
          borderBottom: "1px solid rgba(183,142,121,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: 24, fontWeight: 800, color: "text.primary" }}
        >
          Map Search
        </Typography>
        <IconButton
          aria-label="Close map search"
          onClick={onClose}
          sx={{ color: "text.secondary" }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          minHeight: { xs: "auto", md: 520 },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, md: 2.2 },
            borderRight: { xs: "none", md: "1px solid rgba(183,142,121,0.2)" },
            borderBottom: { xs: "1px solid rgba(183,142,121,0.2)", md: "none" },
            display: "grid",
            gap: 1.25,
            alignContent: "start",
          }}
        >
          <SelectAutocomplete
            id="map-city-autocomplete"
            label="City"
            options={cityOptions}
            value={selectedCity}
            onChange={onLocationChange}
            inputValue={cityInput}
            onInputChange={onLocationInputChange}
            freeSolo
            loading={isCityLoading}
            disabled={isCityLoading && cityOptions.length === 0}
          />
          <SelectAutocomplete
            id="map-district-autocomplete"
            label="District"
            options={districtOptions}
            value={selectedDistrict}
            onChange={onDistrictChange}
            inputValue={districtInput}
            onInputChange={onDistrictInputChange}
            freeSolo
            loading={isDistrictLoading}
            disabled={!matchedCity || isDistrictLoading}
          />
          <SelectAutocomplete
            id="map-neighborhood-autocomplete"
            label="Neighborhood"
            options={neighborhoodOptions}
            value={selectedNeighborhood}
            onChange={onNeighborhoodChange}
            inputValue={neighborhoodInput}
            onInputChange={onNeighborhoodInputChange}
            freeSolo
            loading={isNeighborhoodLoading}
            disabled={!matchedDistrict || isNeighborhoodLoading}
          />
          <SelectAutocomplete
            id="map-property-type-autocomplete"
            label="Property Type"
            options={propertyTypeOptions}
            value={selectedPropertyType}
            onChange={onPropertyTypeChange}
          />
          <SelectAutocomplete
            id="map-listing-type-autocomplete"
            label="Listing Type"
            options={listingTypeOptions}
            value={selectedListingType}
            onChange={onListingTypeChange}
          />
          <SelectAutocomplete
            id="map-room-type-autocomplete"
            label="Room Type"
            options={roomTypeOptions}
            value={selectedRoomType}
            onChange={onRoomTypeChange}
          />
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
            <TextField
              label="Min Price"
              value={minPriceInput}
              onChange={(event) => setMinPriceInput(event.target.value)}
              type="number"
              inputProps={{ min: 0 }}
              error={isPriceRangeInvalid}
            />
            <TextField
              label="Max Price"
              value={maxPriceInput}
              onChange={(event) => setMaxPriceInput(event.target.value)}
              type="number"
              inputProps={{ min: 0 }}
              error={isPriceRangeInvalid}
              helperText={
                isPriceRangeInvalid
                  ? "Max price must be greater than or equal to min price."
                  : " "
              }
            />
          </Box>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchRoundedIcon />}
            onClick={onSearch}
            sx={{ mt: 0.5, minHeight: 48, fontWeight: 700 }}
            disabled={isPriceRangeInvalid}
          >
            View Listings
          </Button>
        </Box>

        <Box sx={{ p: 1.4, bgcolor: "background.paper" }}>
          <MapListingsPreview
            center={mapCenter}
            zoom={mapZoom}
            listings={mapListings}
          />
          <Typography aria-live="polite" sx={{ mt: 1, fontSize: 13, color: "text.secondary" }}>
            {isLoading
              ? "Loading pins..."
              : `${mapListings.length} listing pin${mapListings.length === 1 ? "" : "s"} on map`}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}
