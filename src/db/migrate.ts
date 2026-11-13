import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type Database from "better-sqlite3";

const defaultMigrationsDirectory = resolve(
  process.cwd(),
  "src",
  "db",
  "migrations",
);

export function runMigrations(
  database: Database.Database,
  migrationsDirectory = defaultMigrationsDirectory,
): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrations = readdirSync(migrationsDirectory)
    .filter((name) => /^\d+_[a-z0-9_-]+\.sql$/i.test(name))
    .sort();

  for (const name of migrations) {
    const alreadyApplied = database
      .prepare("SELECT 1 FROM schema_migrations WHERE name = ?")
      .get(name);

    if (alreadyApplied) {
      continue;
    }

    const sql = readFileSync(resolve(migrationsDirectory, name), "utf8");
    const applyMigration = database.transaction(() => {
      database.exec(sql);
      database.prepare("INSERT INTO schema_migrations (name) VALUES (?)").run(name);
    });

    applyMigration();
  }
}
