import type { NotFoundPageProps } from "../types/components.js";
import { Layout } from "./Layout.js";

export function NotFoundPage({ title, message }: NotFoundPageProps) {
  return (
    <Layout title={title}>
      <p role="status">{message}</p>
      <p>
        <a href="/">חזרה לדף הבית</a>
      </p>
    </Layout>
  );
}
