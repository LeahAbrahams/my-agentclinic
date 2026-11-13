import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export function openDatabase(
  filePath = resolve(process.cwd(), "agentclinic.db"),
): Database.Database {
  if (filePath !== ":memory:") {
    mkdirSync(dirname(filePath), { recursive: true });
  }

  const database = new Database(filePath);
  database.pragma("foreign_keys = ON");

  return database;
}
