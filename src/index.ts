import 'dotenv/config';
import app from './app';
import { env } from './schemas/env.schema.parsed';
import sequelize from './lib/sequelize';

const port = env.PORT ?? 3000;

sequelize
  .authenticate()
  .then(() => {
    sequelize
      .sync({ force: true })
      .then(() => {
        console.log('Data base initialized');
        app.listen(port, () => {
          console.log(`🚀 Server running at http://localhost:${port}`);
        });
      })
      .catch((error) => {
        console.error('DB connection failed:', error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error('DB connection failed:', error);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});
