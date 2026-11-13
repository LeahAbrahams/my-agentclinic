<div dir="rtl">

# Agent Clinic

מרפאה טכנית דמיונית לסוכני AI — אפליקציית Web בעברית, עם תקלות תוכנה,
פעולות תמיכה ופגישות שירות באווירה קלילה.

## יכולות

- דף בית וניווט בעברית מלאה ובכיוון RTL.
- קטלוג סוכני AI ועמוד פרטים לכל סוכן, כולל תקלות משויכות.
- קטלוג תקלות ופעולות תמיכה טכניות.
- פתיחת פגישת שירות, אימות פרטים והצגת אישור.
- לוח צוות עם סיכום פעילות ועדכון מצב פגישות.
- SQLite עם SQL migrations ונתוני דוגמה.
- עיצוב רספונסיבי באמצעות Pico CSS וסגנונות מקומיים.

## טכנולוגיות

- Node.js `24.13.0`, TypeScript `6.0.3` במצב Strict.
- Hono `4.13.18` ו-`@hono/node-server` `2.1.8`.
- SQLite עם `better-sqlite3` `13.1.1`.
- Pico CSS `2.1.1`, Vitest `4.1.12`.

הגרסאות הישירות נעולות ב-`package.json` וב-`package-lock.json`.

## הרצה מקומית

נדרשים Node.js `24.13.0` ותלויות הפרויקט. ב-Windows, בניית SQLite מקוד מקור
עשויה לדרוש כלי C++ ו-Windows SDK.

```powershell
npm ci
npm run dev
```

האפליקציה זמינה בכתובת `http://localhost:3000/`. בהפעלה מתבצעות מיגרציות
מסד הנתונים וטעינת נתוני הדוגמה. אפשר להריץ טעינת נתונים חוזרת באמצעות
`npm run seed`.

## בדיקות ו-Build

```powershell
npm test
npm run typecheck
npm run build
npm audit
npm start
```

יש להריץ `npm run build` לפני `npm start`.

## נתיבים

| נתיב | תוכן |
|---|---|
| `/` | דף הבית |
| `/agents` | קטלוג סוכנים |
| `/agents/:id` | פרופיל סוכן |
| `/ailments` | קטלוג תקלות |
| `/therapies` | קטלוג פעולות תמיכה |
| `/appointments/new?agentId=...` | טופס פגישת שירות |
| `/appointments/:id/confirmation` | אישור פגישה |
| `/dashboard` | לוח צוות |

## אימות

בבדיקה האחרונה עברו 45 בדיקות אוטומטיות, TypeScript typecheck, Build,
בדיקת תלויות, בדיקות HTTP, מסע דפדפן ליצירת פגישה ועדכון מצב, ו-14 בדיקות
רספונסיביות ו-RTL ב-375px וב-1280px.

</div>
