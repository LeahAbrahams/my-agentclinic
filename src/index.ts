import { createAdaptorServer } from "@hono/node-server";
import { app } from "./app.js";

const server = createAdaptorServer({ fetch: app.fetch });

server.once("error", (error: Error) => {
  console.error(`Failed to start the server on localhost:3000: ${error.message}`);
  process.exitCode = 1;
});

server.listen(3000, "localhost", () => {
  console.log("Agent Clinic is listening at http://localhost:3000");
});
