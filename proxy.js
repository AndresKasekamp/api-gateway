import amqp from "amqplib";
import { createProxyMiddleware } from "http-proxy-middleware";

export const moviesProxy = createProxyMiddleware({
  target: `http://${process.env.INVENTORY_APP_DNS}:8080/api/movies`,
  changeOrigin: true,
});

export const orderProxy = createProxyMiddleware({
  target: `http://${process.env.BILLING_APP_DNS}:8080/api/orders`,
  changeOrigin: true,
});

export const connectToRabbitMQ = async (billing_msg) => {
  const connection = await amqp.connect(
    `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASS}@${process.env.RABBITMQ_SERVER_DNS}:5672/`
  );
  const channel = await connection.createChannel();
  const result = await channel.assertQueue("billing_queue");
  channel.sendToQueue(
    "billing_queue",
    Buffer.from(JSON.stringify(billing_msg))
  );
  console.log("Billing sent succesfully to rabbit mq server");
};
