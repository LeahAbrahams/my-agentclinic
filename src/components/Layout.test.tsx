import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { Layout } from "./Layout.js";

describe("shared page layout", () => {
  it("renders a Hebrew RTL page with semantic landmarks and navigation", () => {
    const html = renderToString(
      <Layout title="קטלוג לדוגמה">
        <p>תוכן לדוגמה</p>
      </Layout>,
    );

    expect(html).toContain('<html lang="he" dir="rtl">');
    expect(html).toContain("<header>");
    expect(html).toContain("<nav");
    expect(html).toContain("<main");
    expect(html).toContain("<footer>");
    expect(html).toContain('href="/agents"');
    expect(html).toContain('href="/ailments"');
    expect(html).toContain('href="/styles/pico.css"');
    expect(html).toContain('href="/styles.css"');
    expect(html).toContain("<title>קטלוג לדוגמה");
    expect(html).not.toContain("https://");
  });

  it("renders child values as text rather than active markup", () => {
    const html = renderToString(
      <Layout title="בדיקת קידוד">
        {"<script>alert(1)</script>"}
      </Layout>,
    );

    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>alert(1)</script>");
  });
});
