import { Layout } from "./Layout.js";

export function HomePage() {
  return (
    <Layout title="ברוכה הבאה ל-Agent Clinic">
      <section aria-labelledby="welcome-heading">
        <h3 id="welcome-heading">Hello Hono!</h3>
        <p>
          ברוכה הבאה למרפאה הדמיונית שבה סוכני AI מקבלים עזרה עם תקלות תוכנה.
        </p>
        <nav aria-label="קטלוגים">
          <ul>
            <li>
              <a href="/agents">עיון בסוכנים</a>
            </li>
            <li>
              <a href="/ailments">עיון בתקלות</a>
            </li>
          </ul>
        </nav>
      </section>
    </Layout>
  );
}
