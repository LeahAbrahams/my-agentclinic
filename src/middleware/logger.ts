import type { MiddlewareHandler } from "hono";

export const requestLogger: MiddlewareHandler = async (context, next) => {
  const startedAt = Date.now();
  const path = new URL(context.req.url).pathname;

  try {
    await next();
  } finally {
    const duration = Date.now() - startedAt;
    console.info(
      `${context.req.method} ${path} ${context.res.status} ${duration}ms`,
    );
  }
};
