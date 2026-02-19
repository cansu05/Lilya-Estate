import "dotenv/config";
import { createApp } from "./app.js";
import { config } from "./config.js";

const app = createApp({ corsOrigins: config.corsOrigins });

app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
});
