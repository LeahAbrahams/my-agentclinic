import type Database from "better-sqlite3";
import { runMigrations } from "./migrate.js";
import { seedDatabase } from "./seed-data.js";

export function initializeDatabase(
  database: Database.Database,
  migrationsDirectory?: string,
): void {
  if (migrationsDirectory === undefined) {
    runMigrations(database);
  } else {
    runMigrations(database, migrationsDirectory);
  }
  seedDatabase(database);
}
