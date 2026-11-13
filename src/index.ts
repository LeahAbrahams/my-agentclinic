import { createAdaptorServer } from "@hono/node-server";
import type Database from "better-sqlite3";
import { createApp } from "./app.js";
import { openDatabase } from "./db/index.js";
import { initializeDatabase } from "./db/startup.js";

let database: Database.Database | undefined;

try {
  database = openDatabase();
  initializeDatabase(database);
} catch (error) {
  database?.close();
  console.error("Failed to initialize the Agent Clinic database:", error);
  process.exitCode = 1;
  throw error;
}

if (!database) {
  throw new Error("Database initialization completed without a database handle.");
}

const app = createApp(database);
const server = createAdaptorServer({ fetch: app.fetch });

server.once("error", (error: Error) => {
  console.error(`Failed to start the server on localhost:3000: ${error.message}`);
  database.close();
  process.exitCode = 1;
});

server.listen(3000, "localhost", () => {
  console.log("Agent Clinic is listening at http://localhost:3000");
});
