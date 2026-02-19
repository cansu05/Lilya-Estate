import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import listingsRouter from "./routes/listings.js";
import locationsRouter from "./routes/locations.js";

export function createApp({ corsOrigins }) {
  const app = express();

  app.use((req, res, next) => {
    const requestId = req.get("x-request-id") || randomUUID();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);
    next();
  });

  app.use(
    cors({
      origin: corsOrigins,
    })
  );
  app.use(express.json());

  app.use("/locations", locationsRouter);
  app.use("/listings", listingsRouter);

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
