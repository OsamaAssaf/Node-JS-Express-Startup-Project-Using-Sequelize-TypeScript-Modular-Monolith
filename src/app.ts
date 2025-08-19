import express from "express";

import i18n from "./config/i18n";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { localeMiddleware } from "./middlewares/locale.middleware";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(i18n.init);
app.use(localeMiddleware);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
