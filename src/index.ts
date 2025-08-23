import 'dotenv/config';
import app from './app';
import { env } from './schemas/env.schema.parsed';

import { AppDataSource } from './data-source';

const port = env.PORT ?? 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log('Data source initialized');
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('DB connection failed:', error);
    process.exit(1);
  });
