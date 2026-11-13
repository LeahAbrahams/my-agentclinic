import type { LayoutProps } from "../types/components.js";

const navigation = [
  { href: "/", label: "בית" },
  { href: "/agents", label: "סוכנים" },
  { href: "/ailments", label: "תקלות" },
];

export function Layout({ title, children }: LayoutProps) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title} — Agent Clinic</title>
        <link rel="stylesheet" href="/styles/pico.css" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header>
          <h1>
            <a href="/">Agent Clinic</a>
          </h1>
          <p>מרפאה דמיונית לתקלות של סוכני AI</p>
          <nav aria-label="ניווט ראשי">
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main id="main-content">
          <h2>{title}</h2>
          {children}
        </main>
        <footer>
          <p>תרגיל לימודי בדיוני — אין כאן מטופלים, מידע רפואי או עצות טיפוליות.</p>
        </footer>
      </body>
    </html>
  );
}
