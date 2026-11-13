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
              <h4>פעולות תמיכה מומלצות</h4>
              {ailment.therapies.length === 0 ? (
                <p>אין פעולות תמיכה משויכות כרגע.</p>
              ) : (
                <ul>
                  {ailment.therapies.map((therapy) => (
                    <li key={therapy.id}>
                      <strong>{therapy.name}</strong>
                      <p>{therapy.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      )}
    </Layout>
  );
}
