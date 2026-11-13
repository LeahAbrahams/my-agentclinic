import type { TherapiesListProps } from "../types/components.js";
import { Layout } from "./Layout.js";

export function TherapiesList({ therapies }: TherapiesListProps) {
  return (
    <Layout title="קטלוג פעולות תמיכה">
      {therapies.length === 0 ? (
        <p>אין פעולות תמיכה להצגה כרגע.</p>
      ) : (
        <section class="card-grid" aria-label="רשימת פעולות תמיכה">
          {therapies.map((therapy) => (
            <article key={therapy.id}>
              <h3>{therapy.name}</h3>
              <p>{therapy.description}</p>
            </article>
          ))}
        </section>
      )}
    </Layout>
  );
}
