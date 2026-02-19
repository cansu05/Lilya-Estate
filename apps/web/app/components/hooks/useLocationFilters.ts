"use client";

import {
  getDistrictOptions,
  getLocationOptions,
  getNeighborhoodOptions,
  type LocationOption,
} from "@/api/locations";
import { useEffect, useMemo, useState } from "react";

export function normalizeTr(text: string) {
  return text
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function findByInput(options: LocationOption[], input: string) {
  return (
    options.find((option) => normalizeTr(option.label) === normalizeTr(input)) ??
    null
  );
}

type UseLocationFiltersParams = {
  initialCityOptions?: LocationOption[];
  selectedCityValue?: string;
  cityInput?: string;
  selectedDistrictValue?: string;
  districtInput?: string;
};

export function useLocationFilters({
  initialCityOptions = [],
  selectedCityValue,
  cityInput = "",
  selectedDistrictValue,
  districtInput = "",
}: UseLocationFiltersParams) {
  const [cityOptions, setCityOptions] = useState<LocationOption[]>(
    initialCityOptions,
  );
  const [districtOptions, setDistrictOptions] = useState<LocationOption[]>([]);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<
    LocationOption[]
  >([]);

  const [isCityLoading, setIsCityLoading] = useState(
    initialCityOptions.length === 0,
  );
  const [isDistrictLoading, setIsDistrictLoading] = useState(false);
  const [isNeighborhoodLoading, setIsNeighborhoodLoading] = useState(false);

  const effectiveCity = useMemo(() => {
    const matched = findByInput(cityOptions, cityInput);
    return selectedCityValue || matched?.value || "";
  }, [cityInput, cityOptions, selectedCityValue]);

  const effectiveDistrict = useMemo(() => {
    const matched = findByInput(districtOptions, districtInput);
    return selectedDistrictValue || matched?.value || "";
  }, [districtInput, districtOptions, selectedDistrictValue]);

  useEffect(() => {
    if (cityOptions.length > 0) {
      setIsCityLoading(false);
      return;
    }

    const controller = new AbortController();
    const run = async () => {
      setIsCityLoading(true);
      try {
        const options = await getLocationOptions(controller.signal);
        setCityOptions(options);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("City options fetch failed:", error);
      } finally {
        if (!controller.signal.aborted) {
          setIsCityLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [cityOptions.length]);

  useEffect(() => {
    if (!effectiveCity) {
      setDistrictOptions([]);
      setNeighborhoodOptions([]);
      setIsDistrictLoading(false);
      return;
    }

    const controller = new AbortController();
    const run = async () => {
      setIsDistrictLoading(true);
      try {
        const options = await getDistrictOptions(effectiveCity, controller.signal);
        setDistrictOptions(options);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("District options fetch failed:", error);
      } finally {
        if (!controller.signal.aborted) {
          setIsDistrictLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [effectiveCity]);

  useEffect(() => {
    if (!effectiveDistrict) {
      setNeighborhoodOptions([]);
      setIsNeighborhoodLoading(false);
      return;
    }

    const controller = new AbortController();
    const run = async () => {
      setIsNeighborhoodLoading(true);
      try {
        const options = await getNeighborhoodOptions(
          effectiveDistrict,
          controller.signal,
        );
        setNeighborhoodOptions(options);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Neighborhood options fetch failed:", error);
      } finally {
        if (!controller.signal.aborted) {
          setIsNeighborhoodLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [effectiveDistrict]);

  return {
    cityOptions,
    districtOptions,
    neighborhoodOptions,
    isCityLoading,
    isDistrictLoading,
    isNeighborhoodLoading,
  };
}
