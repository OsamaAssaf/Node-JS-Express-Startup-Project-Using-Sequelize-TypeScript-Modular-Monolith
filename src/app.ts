import express from 'express';

import i18n from './shared/lib/i18n';
import { errorHandler, notFound } from './shared/middlewares/error.middleware';
import { localeMiddleware } from './shared/middlewares/locale.middleware';
import routes from './shared/routes';

const app = express();

app.use(express.json());

app.use(i18n.init);
app.use(localeMiddleware);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
