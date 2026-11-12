import { Hono } from "hono";

export const app = new Hono();

app.get("/", (context) => context.text("Hello Hono!"));
