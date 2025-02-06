import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Define a simple HTTP function (just to use `onRequest`)
export const helloWorld = onRequest((req, res) => {
  logger.info("Hello World function triggered!");
  res.send("Hello from Firebase!");
});
