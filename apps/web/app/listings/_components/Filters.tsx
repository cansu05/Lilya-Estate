"use client";

import type { LocationOption } from "@/api/locations";
import {
  listingTypeOptions,
  propertyTypeOptions,
  roomTypeOptions,
} from "@repo/shared";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import MapSearchDialog from "../../components/MapSearchDialog";
import SelectAutocomplete from "../../components/SelectAutocomplete";
import { findByInput, useLocationFilters } from "../../components/hooks/useLocationFilters";
import {
  buildSearchParamsFromFilters,
  type ListingsFilterValues,
  parseFiltersFromSearchParams,
} from "./filtersQuery";

function toPositiveInt(value?: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function toNonNegativeNumber(value?: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

type FiltersProps = {
  initialCityOptions?: LocationOption[];
};

export default function Filters({ initialCityOptions = [] }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);

  const [cityInput, setCityInput] = useState("");
  const [districtInput, setDistrictInput] = useState("");
  const [neighborhoodInput, setNeighborhoodInput] = useState("");
  const initialFilters = parseFiltersFromSearchParams(searchParams);

  const [cityId, setCityId] = useState(() => initialFilters.cityId ?? "");
  const [districtId, setDistrictId] = useState(
    () => initialFilters.districtId ?? "",
  );
  const [neighborhoodId, setNeighborhoodId] = useState(
    () => initialFilters.neighborhoodId ?? "",
  );

  const [listingTypeValue, setListingTypeValue] = useState(
    () => initialFilters.listingType ?? "",
  );
  const [propertyTypeValue, setPropertyTypeValue] = useState(
    () => initialFilters.propertyType ?? "",
  );
  const [roomTypeValue, setRoomTypeValue] = useState(
    () => initialFilters.roomType ?? "",
  );
  const [minPrice, setMinPrice] = useState(() => initialFilters.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(() => initialFilters.maxPrice ?? "");
  const [pageSize, setPageSize] = useState(
    () => searchParams.get("limit") ?? "9",
  );

  const {
    cityOptions,
    districtOptions,
    neighborhoodOptions,
    isCityLoading,
    isDistrictLoading,
    isNeighborhoodLoading,
  } = useLocationFilters({
    initialCityOptions,
    selectedCityValue: cityId,
    cityInput,
    selectedDistrictValue: districtId,
    districtInput,
  });

  const selectedCity = useMemo(
    () => cityOptions.find((option) => option.value === cityId) ?? null,
    [cityId, cityOptions],
  );
  const selectedDistrict = useMemo(
    () => districtOptions.find((option) => option.value === districtId) ?? null,
    [districtId, districtOptions],
  );
  const selectedNeighborhood = useMemo(
    () =>
      neighborhoodOptions.find((option) => option.value === neighborhoodId) ??
      null,
    [neighborhoodId, neighborhoodOptions],
  );

  const selectedListingType = useMemo(
    () =>
      listingTypeOptions.find((option) => option.value === listingTypeValue) ??
      null,
    [listingTypeValue],
  );
  const selectedPropertyType = useMemo(
    () =>
      propertyTypeOptions.find(
        (option) => option.value === propertyTypeValue,
      ) ?? null,
    [propertyTypeValue],
  );
  const selectedRoomType = useMemo(
    () =>
      roomTypeOptions.find((option) => option.value === roomTypeValue) ?? null,
    [roomTypeValue],
  );

  const parsedMinPrice = toNonNegativeNumber(minPrice) ?? undefined;
  const parsedMaxPrice = toNonNegativeNumber(maxPrice) ?? undefined;
  const isPriceRangeInvalid =
    parsedMinPrice !== undefined &&
    parsedMaxPrice !== undefined &&
    parsedMinPrice > parsedMaxPrice;

  const matchedCityFromInput = useMemo(
    () => findByInput(cityOptions, cityInput),
    [cityInput, cityOptions],
  );
  const matchedDistrictFromInput = useMemo(
    () => findByInput(districtOptions, districtInput),
    [districtInput, districtOptions],
  );
  const matchedNeighborhoodFromInput = useMemo(
    () => findByInput(neighborhoodOptions, neighborhoodInput),
    [neighborhoodInput, neighborhoodOptions],
  );

  const buildParams = () => {
    const values: ListingsFilterValues = {};

    const city = selectedCity ?? matchedCityFromInput;
    const district = selectedDistrict ?? matchedDistrictFromInput;
    const neighborhood = selectedNeighborhood ?? matchedNeighborhoodFromInput;

    const cityParam = toPositiveInt(city?.value);
    const districtParam = toPositiveInt(district?.value);
    const neighborhoodParam = toPositiveInt(neighborhood?.value);
    const min = toNonNegativeNumber(minPrice);
    const max = toNonNegativeNumber(maxPrice);

    if (cityParam) values.cityId = String(cityParam);
    if (districtParam) values.districtId = String(districtParam);
    if (neighborhoodParam) values.neighborhoodId = String(neighborhoodParam);
    if (listingTypeValue) values.listingType = listingTypeValue;
    if (propertyTypeValue) values.propertyType = propertyTypeValue;
    if (roomTypeValue) values.roomType = roomTypeValue;
    if (min !== null) values.minPrice = String(min);
    if (max !== null) values.maxPrice = String(max);
    if (pageSize) values.limit = pageSize;

    return buildSearchParamsFromFilters(values);
  };

  const applyFilters = () => {
    if (isPriceRangeInvalid) return;
    const params = buildParams();
    startTransition(() => {
      router.push(
        params.toString() ? `/listings?${params.toString()}` : "/listings",
      );
    });
  };

  const handleMapSearch = () => {
    if (isPriceRangeInvalid) return;
    const params = buildParams();
    setIsMapDialogOpen(false);
    startTransition(() => {
      router.push(
        params.toString() ? `/listings?${params.toString()}` : "/listings",
      );
    });
  };

  const clearFilters = () => {
    setCityId("");
    setCityInput("");
    setDistrictId("");
    setDistrictInput("");
    setNeighborhoodId("");
    setNeighborhoodInput("");
    setListingTypeValue("");
    setPropertyTypeValue("");
    setRoomTypeValue("");
    setMinPrice("");
    setMaxPrice("");
    setPageSize("9");
    startTransition(() => {
      router.push("/listings");
    });
  };

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
      }}
    >
      <Typography
        sx={{ fontSize: 16, fontWeight: 700, color: "text.primary", mb: 1.5 }}
      >
        Filters
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        <SelectAutocomplete
          id="listings-city"
          label="City"
          options={cityOptions}
          value={selectedCity}
          inputValue={cityInput}
          onChange={(value) => {
            setCityId(value?.value ?? "");
            setCityInput(value?.label ?? "");
            setDistrictId("");
            setDistrictInput("");
            setNeighborhoodId("");
            setNeighborhoodInput("");
          }}
          onInputChange={(value) => {
            setCityInput(value);
            setCityId("");
            setDistrictId("");
            setDistrictInput("");
            setNeighborhoodId("");
            setNeighborhoodInput("");
          }}
          freeSolo
          loading={isCityLoading}
          disabled={isCityLoading && cityOptions.length === 0}
        />
        <SelectAutocomplete
          id="listings-district"
          label="District"
          options={districtOptions}
          value={selectedDistrict}
          inputValue={districtInput}
          onChange={(value) => {
            setDistrictId(value?.value ?? "");
            setDistrictInput(value?.label ?? "");
            setNeighborhoodId("");
            setNeighborhoodInput("");
          }}
          onInputChange={(value) => {
            setDistrictInput(value);
            setDistrictId("");
            setNeighborhoodId("");
            setNeighborhoodInput("");
          }}
          freeSolo
          loading={isDistrictLoading}
          disabled={!cityId && !matchedCityFromInput || isDistrictLoading}
        />
        <SelectAutocomplete
          id="listings-neighborhood"
          label="Neighborhood"
          options={neighborhoodOptions}
          value={selectedNeighborhood}
          inputValue={neighborhoodInput}
          onChange={(value) => {
            setNeighborhoodId(value?.value ?? "");
            setNeighborhoodInput(value?.label ?? "");
          }}
          onInputChange={(value) => {
            setNeighborhoodInput(value);
            setNeighborhoodId("");
          }}
          freeSolo
          loading={isNeighborhoodLoading}
          disabled={!districtId && !matchedDistrictFromInput || isNeighborhoodLoading}
        />
        <SelectAutocomplete
          id="listings-listing-type"
          label="Listing Type"
          options={listingTypeOptions}
          value={selectedListingType}
          onChange={(value) => setListingTypeValue(value?.value ?? "")}
        />
        <SelectAutocomplete
          id="listings-property-type"
          label="Property Type"
          options={propertyTypeOptions}
          value={selectedPropertyType}
          onChange={(value) => setPropertyTypeValue(value?.value ?? "")}
        />
        <SelectAutocomplete
          id="listings-room-type"
          label="Room Type"
          options={roomTypeOptions}
          value={selectedRoomType}
          onChange={(value) => setRoomTypeValue(value?.value ?? "")}
        />
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          inputProps={{ min: 0 }}
          error={isPriceRangeInvalid}
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          inputProps={{ min: 0 }}
          error={isPriceRangeInvalid}
          helperText={
            isPriceRangeInvalid
              ? "Max price must be greater than or equal to min price."
              : " "
          }
        />
      </Box>

      <Box
        sx={{ mt: 1.5, display: "flex", gap: 1, justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsMapDialogOpen(true)}
          sx={{ minHeight: { xs: 46, md: 52 }, px: { xs: 1.8, md: 2.4 } }}
        >
          Search On Map
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={clearFilters}
          sx={{ minHeight: { xs: 46, md: 52 }, px: { xs: 1.8, md: 2.4 } }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilters}
          disabled={isPending || isPriceRangeInvalid}
          sx={{ minHeight: { xs: 46, md: 52 }, px: { xs: 1.8, md: 2.4 } }}
        >
          {isPending ? "Applying..." : "Apply Filters"}
        </Button>
      </Box>

      <MapSearchDialog
        open={isMapDialogOpen}
        onClose={() => setIsMapDialogOpen(false)}
        onSearch={handleMapSearch}
        isCityLoading={isCityLoading}
        isDistrictLoading={isDistrictLoading}
        isNeighborhoodLoading={isNeighborhoodLoading}
        cityOptions={cityOptions}
        districtOptions={districtOptions}
        neighborhoodOptions={neighborhoodOptions}
        listingTypeOptions={listingTypeOptions}
        propertyTypeOptions={propertyTypeOptions}
        roomTypeOptions={roomTypeOptions}
        selectedCity={selectedCity}
        cityInput={cityInput}
        selectedDistrict={selectedDistrict}
        districtInput={districtInput}
        selectedNeighborhood={selectedNeighborhood}
        neighborhoodInput={neighborhoodInput}
        selectedListingType={selectedListingType}
        selectedPropertyType={selectedPropertyType}
        selectedRoomType={selectedRoomType}
        onLocationChange={(value) => {
          setCityId(value?.value ?? "");
          setCityInput(value?.label ?? "");
          setDistrictId("");
          setDistrictInput("");
          setNeighborhoodId("");
          setNeighborhoodInput("");
        }}
        onLocationInputChange={(value) => {
          setCityInput(value);
          setCityId("");
          setDistrictId("");
          setDistrictInput("");
          setNeighborhoodId("");
          setNeighborhoodInput("");
        }}
        onDistrictChange={(value) => {
          setDistrictId(value?.value ?? "");
          setDistrictInput(value?.label ?? "");
          setNeighborhoodId("");
          setNeighborhoodInput("");
        }}
        onDistrictInputChange={(value) => {
          setDistrictInput(value);
          setDistrictId("");
          setNeighborhoodId("");
          setNeighborhoodInput("");
        }}
        onNeighborhoodChange={(value) => {
          setNeighborhoodId(value?.value ?? "");
          setNeighborhoodInput(value?.label ?? "");
        }}
        onNeighborhoodInputChange={(value) => {
          setNeighborhoodInput(value);
          setNeighborhoodId("");
        }}
        onListingTypeChange={(value) => setListingTypeValue(value?.value ?? "")}
        onPropertyTypeChange={(value) =>
          setPropertyTypeValue(value?.value ?? "")
        }
        onRoomTypeChange={(value) => setRoomTypeValue(value?.value ?? "")}
      />
    </Paper>
  );
}
