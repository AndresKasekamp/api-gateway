import express from "express";

import cors from "cors";
import { moviesProxy, orderProxy } from "./proxy.js";
import { moviesRoute, orderRoute, billingRoute, router } from "./routes.js";

// Express server config
const app = express();

const PORT = 3000;

app.use(cors());

// Regular movie API
app.use(moviesRoute, moviesProxy);

// Billing orders API for orders
app.use(orderRoute, orderProxy);

// Billing amqp API to send billing through amqp
app.use(billingRoute, router);

app.listen(PORT, () => {
  console.log("API Gateway listening on port: " + PORT);
});
