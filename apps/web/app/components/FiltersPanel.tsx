"use client";

import type { LocationOption } from "@/api/locations";
import {
  listingTypeOptions,
  propertyTypeOptions,
  roomTypeOptions,
} from "@repo/shared";
import { Box, Button, Container, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MapSearchDialog from "./MapSearchDialog";
import SelectAutocomplete from "./SelectAutocomplete";
import { findByInput, useLocationFilters } from "./hooks/useLocationFilters";

function toPositiveInt(value?: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

type FiltersPanelProps = {
  initialCityOptions?: LocationOption[];
};

export default function FiltersPanel({
  initialCityOptions = [],
}: FiltersPanelProps) {
  const router = useRouter();
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState<LocationOption | null>(null);
  const [cityInput, setCityInput] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState<LocationOption | null>(
    null,
  );
  const [districtInput, setDistrictInput] = useState("");

  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<LocationOption | null>(null);
  const [neighborhoodInput, setNeighborhoodInput] = useState("");

  const [selectedListingType, setSelectedListingType] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const {
    cityOptions,
    districtOptions,
    neighborhoodOptions,
    isCityLoading,
    isDistrictLoading,
    isNeighborhoodLoading,
  } = useLocationFilters({
    initialCityOptions,
    selectedCityValue: selectedCity?.value,
    cityInput,
    selectedDistrictValue: selectedDistrict?.value,
    districtInput,
  });

  const buildSearchQuery = () => {
    const params = new URLSearchParams();

    const city = selectedCity ?? findByInput(cityOptions, cityInput);
    const district = selectedDistrict ?? findByInput(districtOptions, districtInput);
    const neighborhood =
      selectedNeighborhood ?? findByInput(neighborhoodOptions, neighborhoodInput);

    const cityId = toPositiveInt(city?.value);
    const districtId = toPositiveInt(district?.value);
    const neighborhoodId = toPositiveInt(neighborhood?.value);

    if (cityId) params.set("cityId", String(cityId));
    if (districtId) params.set("districtId", String(districtId));
    if (neighborhoodId) params.set("neighborhoodId", String(neighborhoodId));

    if (selectedListingType?.value) {
      params.set("listingType", selectedListingType.value);
    }
    if (selectedPropertyType?.value) {
      params.set("propertyType", selectedPropertyType.value);
    }
    if (selectedRoomType?.value) {
      params.set("roomType", selectedRoomType.value);
    }

    return params.toString();
  };

  const handleSearch = () => {
    const query = buildSearchQuery();
    router.push(query ? `/listings?${query}` : "/listings");
  };

  const handleMapSearch = () => {
    const query = buildSearchQuery();
    setIsMapDialogOpen(false);
    router.push(query ? `/listings?${query}` : "/listings");
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 3 } }}>
      <Box
        sx={{
          p: { xs: 1.5, md: 3 },
          borderRadius: { xs: 2, md: 3 },
          bgcolor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
          display: "grid",
          gap: { xs: 1.25, md: 2 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr)) auto auto",
          },
        }}
      >
        {isCityLoading && cityOptions.length === 0 ? (
          <Skeleton variant="rounded" height={56} />
        ) : (
          <SelectAutocomplete
            id="city-autocomplete"
            label="City"
            options={cityOptions}
            value={selectedCity}
            inputValue={cityInput}
            onChange={(value) => {
              setSelectedCity(value);
              setCityInput(value?.label ?? "");
              setSelectedDistrict(null);
              setDistrictInput("");
              setSelectedNeighborhood(null);
              setNeighborhoodInput("");
            }}
            onInputChange={(value) => {
              setCityInput(value);
              setSelectedCity(null);
              setSelectedDistrict(null);
              setDistrictInput("");
              setSelectedNeighborhood(null);
              setNeighborhoodInput("");
            }}
            freeSolo
            loading={isCityLoading}
            disabled={isCityLoading && cityOptions.length === 0}
          />
        )}

        <SelectAutocomplete
          id="listing-type-autocomplete"
          label="Listing Type"
          options={listingTypeOptions}
          value={selectedListingType}
          onChange={setSelectedListingType}
        />
        <SelectAutocomplete
          id="property-type-autocomplete"
          label="Property Type"
          options={propertyTypeOptions}
          value={selectedPropertyType}
          onChange={setSelectedPropertyType}
        />
        <SelectAutocomplete
          id="room-type-autocomplete"
          label="Room Type"
          options={roomTypeOptions}
          value={selectedRoomType}
          onChange={setSelectedRoomType}
        />

        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
            gridColumn: { xs: "1 / -1", lg: "5 / span 2" },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsMapDialogOpen(true)}
            sx={{
              minHeight: { xs: 48, md: 56 },
              whiteSpace: "nowrap",
              px: { xs: 1, md: 3 },
              color: "primary.dark",
              fontSize: { xs: 12, md: 14 },
            }}
          >
            Search On Map
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              minHeight: { xs: 48, md: 56 },
              whiteSpace: "nowrap",
              px: { xs: 1, md: 3 },
              fontSize: { xs: 12, md: 14 },
            }}
          >
            Search Properties
          </Button>
        </Box>
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
          setSelectedCity(value);
          setCityInput(value?.label ?? "");
          setSelectedDistrict(null);
          setDistrictInput("");
          setSelectedNeighborhood(null);
          setNeighborhoodInput("");
        }}
        onLocationInputChange={(value) => {
          setCityInput(value);
          setSelectedCity(null);
          setSelectedDistrict(null);
          setDistrictInput("");
          setSelectedNeighborhood(null);
          setNeighborhoodInput("");
        }}
        onDistrictChange={(value) => {
          setSelectedDistrict(value);
          setDistrictInput(value?.label ?? "");
          setSelectedNeighborhood(null);
          setNeighborhoodInput("");
        }}
        onDistrictInputChange={(value) => {
          setDistrictInput(value);
          setSelectedDistrict(null);
          setSelectedNeighborhood(null);
          setNeighborhoodInput("");
        }}
        onNeighborhoodChange={(value) => {
          setSelectedNeighborhood(value);
          setNeighborhoodInput(value?.label ?? "");
        }}
        onNeighborhoodInputChange={setNeighborhoodInput}
        onListingTypeChange={setSelectedListingType}
        onPropertyTypeChange={setSelectedPropertyType}
        onRoomTypeChange={setSelectedRoomType}
      />
    </Container>
  );
}
