import { Router } from "express";
import express from "express";
import { connectToRabbitMQ } from "./proxy.js";

export const moviesRoute = "/api/movies";
export const billingRoute = "/api/billing";
export const orderRoute = "/api/orders";

export const router = Router();

router.post("/", express.json(), async (req, res) => {
  const billing_msg = req.body;

  const { user_id, number_of_items, total_amount } = billing_msg;

  console.log("Billing msg received", billing_msg);
  if (
    user_id === undefined ||
    number_of_items === undefined ||
    total_amount === undefined
  ) {
    res.status(400).send("Wrong parameters provided");
    return;
  }

  await connectToRabbitMQ(billing_msg);

  console.log("Billing info sent to user");

  res.status(200).send("Billing info sent succesfully");
});
