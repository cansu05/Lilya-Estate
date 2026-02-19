"use client";

import { Autocomplete, TextField } from "@mui/material";

type Option = {
  value: string;
  label: string;
};

type SelectAutocompleteProps = {
  id: string;
  label: string;
  options: Option[];
  value?: Option | null;
  onChange?: (value: Option | null) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  freeSolo?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export default function SelectAutocomplete({
  id,
  label,
  options,
  value = null,
  onChange,
  inputValue,
  onInputChange,
  freeSolo = false,
  loading = false,
  disabled = false,
}: SelectAutocompleteProps) {
  return (
    <Autocomplete
      id={id}
      disablePortal
      freeSolo={freeSolo}
      loading={loading}
      disabled={disabled}
      options={options}
      value={value as Option | null}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          onChange?.({ value: newValue, label: newValue });
          return;
        }
        onChange?.(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === "reset") return;
        onInputChange?.(newInputValue);
      }}
      slotProps={{
        popper: {
          placement: "bottom-start",
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "preventOverflow",
              options: {
                mainAxis: false,
                altAxis: false,
              },
            },
          ],
          sx: { zIndex: 1400 },
        },
      }}
      sx={{ width: "100%" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      isOptionEqualToValue={(option, selected) => option.value === selected.value}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
