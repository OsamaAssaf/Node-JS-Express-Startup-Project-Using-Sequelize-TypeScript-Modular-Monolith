import "dotenv/config";
import app from "./app";
import { env } from "./schemas/env.schema.parsed";
import { connectPrisma } from "./lib/prisma";

const port = env.PORT ?? 3000;

connectPrisma()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error("DB connection failed:", e);
    process.exit(1);
  });
