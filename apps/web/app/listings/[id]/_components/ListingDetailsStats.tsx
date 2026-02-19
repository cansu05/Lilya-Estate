import type { ListingDetailDto } from "@/api/listings";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BalconyOutlinedIcon from "@mui/icons-material/BalconyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

function inferBeds(roomType?: string | null) {
  if (roomType === "studio") return 1;
  const parsed = Number(String(roomType ?? "").split("+")[0]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2;
}

function formatPropertyType(value?: string | null) {
  if (!value) return "-";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatParkingType(value?: string | null) {
  if (value === "open") return "Open Parking";
  if (value === "closed") return "Closed Parking";
  return "No Parking";
}

function formatHeatingType(value?: string | null) {
  if (value === "central") return "Central Heating";
  if (value === "combi") return "Combi";
  if (value === "stove") return "Stove";
  if (value === "floor_heating") return "Floor Heating";
  return "No Heating";
}

type ListingDetailsStatsProps = {
  listing: ListingDetailDto;
};

export default function ListingDetailsStats({ listing }: ListingDetailsStatsProps) {
  const beds = inferBeds(listing.room_type);
  const bathrooms = Math.max(1, beds - 1);
  const balconyCount = Math.max(0, listing.balcony_count ?? 0);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0,1fr))",
          md: "repeat(3, minmax(0,1fr))",
          lg: "repeat(5, minmax(0,1fr))",
        },
        gap: 1.4,
      }}
    >
      <Stat icon={<BedOutlinedIcon />} label={`${beds} Beds`} />
      <Stat icon={<BathtubOutlinedIcon />} label={`${bathrooms} Bathrooms`} />
      <Stat icon={<SquareFootOutlinedIcon />} label={`${listing.net_area} m2`} />
      <Stat icon={<CalendarMonthOutlinedIcon />} label={`${listing.building_age} Years`} />
      <Stat
        icon={<HomeWorkOutlinedIcon />}
        label={formatPropertyType(listing.property_type)}
      />
      <Stat
        icon={<LocalParkingOutlinedIcon />}
        label={formatParkingType(listing.parking)}
      />
      <Stat
        icon={<DeviceThermostatOutlinedIcon />}
        label={formatHeatingType(listing.heating)}
      />
      <Stat
        icon={<BalconyOutlinedIcon />}
        label={`${balconyCount} ${balconyCount === 1 ? "Balcony" : "Balconies"}`}
      />
      <Stat
        icon={<ElevatorOutlinedIcon />}
        label={listing.has_elevator ? "Elevator" : "No Elevator"}
      />
    </Box>
  );
}

function Stat({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Box
      sx={{
        p: 1.2,
        borderRadius: 2,
        bgcolor: "rgba(145,159,144,0.12)",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ color: "secondary.dark", display: "grid", placeItems: "center" }}>
        {icon}
      </Box>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
        {label}
      </Typography>
    </Box>
  );
}
