import type { ServerErrorPageProps } from "../types/components.js";
import { Layout } from "./Layout.js";

export function ServerErrorPage({ message = "אירעה שגיאה ולא ניתן להשלים את הבקשה כרגע." }: ServerErrorPageProps) {
  return (
    <Layout title="שגיאת שרת">
      <p role="alert">{message}</p>
      <p><a href="/">חזרה לדף הבית</a></p>
    </Layout>
  );
}
