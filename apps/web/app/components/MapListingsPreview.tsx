"use client";

import type { ListingItemDto } from "@/api/listings";
import { Box, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, Popup, TileLayer, CircleMarker } from "react-leaflet";

type MapListingsPreviewProps = {
  center: { lat: number; lon: number };
  zoom: number;
  listings: ListingItemDto[];
};

export default function MapListingsPreview({
  center,
  zoom,
  listings,
}: MapListingsPreviewProps) {
  return (
    <Box
      sx={{
        borderRadius: 1.6,
        overflow: "hidden",
        border: "1px solid rgba(145,159,144,0.42)",
        height: { xs: 300, md: 490 },
      }}
    >
      <MapContainer
        key={`${center.lat}-${center.lon}`}
        center={[center.lat, center.lon]}
        zoom={zoom}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {listings.map((listing) => {
          const lat = listing.latitude ? Number(listing.latitude) : null;
          const lon = listing.longitude ? Number(listing.longitude) : null;
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
          if (lat === null || lon === null) return null;

          return (
            <CircleMarker
              key={listing.id}
              center={[lat, lon]}
              radius={10}
              pathOptions={{
                color: "#9D7A69",
                fillColor: "#b78e79",
                fillOpacity: 0.92,
                weight: 2,
              }}
            >
              <Popup>
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                  {listing.title}
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  ${Number(listing.price).toLocaleString("en-US")}
                </Typography>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </Box>
  );
}
