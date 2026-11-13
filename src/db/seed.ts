import { openDatabase } from "./index.js";
import { runMigrations } from "./migrate.js";
import { seedDatabase } from "./seed-data.js";

const database = openDatabase();

try {
  runMigrations(database);
  seedDatabase(database);
  console.log("Agent Clinic seed data is ready.");
} finally {
  database.close();
}
