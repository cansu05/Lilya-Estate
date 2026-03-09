import "dotenv/config";
import { createApp } from "./app.js";
import { config } from "./config.js";
import { warmupDatabase } from "./db.js";

const app = createApp({ corsOrigins: config.corsOrigins });
await warmupDatabase();

app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
});
