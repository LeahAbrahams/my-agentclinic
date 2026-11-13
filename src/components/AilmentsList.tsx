import type { AilmentsListProps } from "../types/components.js";
import { Layout } from "./Layout.js";

export function AilmentsList({ ailments }: AilmentsListProps) {
  return (
    <Layout title="קטלוג תקלות">
      {ailments.length === 0 ? (
        <p>אין תקלות להצגה כרגע.</p>
      ) : (
        <section class="card-grid" aria-label="רשימת תקלות">
          {ailments.map((ailment) => (
            <article key={ailment.id}>
              <h3>{ailment.name}</h3>
              <p>{ailment.description}</p>
            </article>
          ))}
        </section>
      )}
    </Layout>
  );
}
