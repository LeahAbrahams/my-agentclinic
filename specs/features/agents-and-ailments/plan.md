<div dir="rtl">

# Implementation Plan — Agents and Ailments

**תאריך**: 2026-11-13 | **Spec**: `specs/features/agents-and-ailments/spec.md`

## סיכום

להרחיב את שירות Hono הקיים לאתר Server-rendered בעברית: Layout משותף, דף
בית, קטלוג Agents, פרטי Agent וקטלוג Ailments. התוכן ייטען מ-SQLite באמצעות
מיגרציות SQL ו-seeds אידמפוטנטיים. מימוש הקוד יתחיל רק לאחר אישור המפרט.

## הקשר טכני

- **שפה/גרסה**: TypeScript `6.0.3`, Node.js `24.13.0`, Strict.
- **תלויות עיקריות**: Hono `4.13.18`, מתאם Node `2.1.8`, Hono JSX;
  `better-sqlite3` `13.1.1`, טיפוסים `9.6.0`, Pico CSS `2.1.1`,
  Vitest `4.1.12`.
- **אחסון**: קובץ SQLite מקומי; בסיס הנתונים אינו נשמר ב-Git.
- **בדיקות**: Vitest ל-DB ולמסלולים, TypeScript, Build, npm audit ובדיקות
  HTTP/דפדפן.
- **פלטפורמה**: Windows ו-Node מקומי; הפעלת האפליקציה אינה תלויה ברשת חיצונית.
- **יעדים**: 100% מהנתיבים בהיקף נטענים ומציגים את התוכן הנדרש; אין גלילה
  אופקית ב-375px או ב-1280px.
- **אילוצים**: אין נתוני בריאות אנושיים, CDN, ORM, פריימוורק צד-לקוח,
  CRUD או יכולות Therapies/Bookings בשלב זה.

## בדיקת התאמה לחוקה

| עיקרון | תוצאה | התאמה |
|---|---|---|
| מפרט לפני מימוש | PASS לאחר אישור | משימות וראיות מקושרות ל-REQ-011–REQ-040 |
| עברית ו-RTL | PASS | כל עמוד מוגדר `he`/`rtl` ונבדק בנייד ובשולחן עבודה |
| פרטיות ותוכן | PASS | סוכנים ותקלות AI בדיוניים; אין מידע רפואי אנושי |
| פעולה מקומית | PASS | CSS מקומי, SQLite מקומי, ללא שירות CDN |
| טיפוסים והתמדה | PASS | Strict TypeScript, FK, מיגרציות ו-tests |

## הנחיות שהוחלו

אין תהליך הסבה או כלל טרנספורמציה ייעודי. תוכנית המיגרציות וה-seed נובעת
מחומרי Phase 2 של הקורס; יתר ההחלטות נובעות מהמפרט ומהחוקה.

## שלבי מימוש

### Phase 1 — Setup

#### Step 1.1 — הגדרת TSX ותלויות

- **דרישות**: REQ-026, REQ-027, REQ-035, REQ-036, REQ-039
- **קלט**: `spec.md`, `specs/techstack.md`, `package.json`, `tsconfig.json`
- **תיאור**: לנעול תלויות, להפעיל תמיכת Hono JSX ב-TypeScript, להגדיר פקודת
  seed ולהתעלם מקובצי SQLite.

### Phase 2 — Foundational

#### Step 2.1 — SQLite ומיגרציות

- **דרישות**: REQ-028, REQ-029, REQ-031, REQ-032
- **קלט**: ישויות ב-`spec.md`; אין artifact data-model נפרד בפרויקט.
- **תיאור**: ליצור פתיחת DB, FK, רישום migrations, מיון שמי והרצה אטומית
  פעם אחת. להוסיף Agents, Ailments וטבלת קשר עם אילוצי ייחוד ו-FK.

#### Step 2.2 — נתוני seed

- **דרישות**: REQ-021, REQ-022, REQ-024, REQ-030
- **קלט**: מודל הישויות והנחת תוכן AI בדיוני.
- **תיאור**: ליצור לפחות חמישה agents וחמש ailments בעברית, לקשר ביניהם,
  ולהפעיל seed ללא כפילויות.

### Phase 3 — User Story 1 (P1): Layout ודף בית

#### Step 3.1 — Layout משותף ונכסי עיצוב

- **דרישות**: REQ-011, REQ-012, REQ-013, REQ-023, REQ-027, REQ-036,
  REQ-037, REQ-038
- **קלט**: דרישת Phase 2 לצבעי כתום/שחור ולמעטפת משותפת.
- **תיאור**: ליצור רכיבי Header/Nav/Main/Footer, Props עצמאיים, עברית/RTL,
  טעינת Pico classless ונכסי CSS מקומיים עם עיצוב responsive.

#### Step 3.2 — דף הבית

- **דרישות**: REQ-014, REQ-025
- **קלט**: חוזה Hello Hono ההיסטורי והחלטת השינוי שבמפרט.
- **תיאור**: להציג את ברכת Hello Hono בתוך עמוד HTML סמנטי וקישורים לקטלוגים.

### Phase 4 — User Story 2 (P1): Agents

#### Step 4.1 — שאילתות וסוגי Agent

- **דרישות**: REQ-015, REQ-017, REQ-018, REQ-020, REQ-024, REQ-032, REQ-033
- **קלט**: סכימת DB; אין DAO/ORM.
- **תיאור**: ליצור טיפוסי Domain/Props נפרדים ושאילתות prepared statement
  לרשימה, לפרופיל ולקשרים. מזהה לא תקין/חסר יחזיר Not Found.

#### Step 4.2 — רשימת Agents ופרופיל

- **דרישות**: REQ-015, REQ-016, REQ-017, REQ-018, REQ-020, REQ-025, REQ-036
- **קלט**: Step 4.1 ורכיבי Layout.
- **תיאור**: ליצור מסלולים ורכיבי JSX לרשימה ולפרופיל, כולל קישורים, מצב,
  סוג מודל ותקלות מקושרות.

### Phase 5 — User Story 3 (P2): Ailments

#### Step 5.1 — קטלוג Ailments

- **דרישות**: REQ-019, REQ-021, REQ-024, REQ-025, REQ-032, REQ-033, REQ-036
- **קלט**: סכימת DB ו-Layout.
- **תיאור**: ליצור שאילתה ורכיב להצגת שם ותיאור, לרבות מצב רשימה ריקה.

### Phase 6 — User Story 4 (P2): תוכן זמין לאחר הפעלה מחדש

#### Step 6.1 — Bootstrap ואתחול

- **דרישות**: REQ-022, REQ-028, REQ-029, REQ-030, REQ-031, REQ-040
- **קלט**: DB, migrations ו-seed.
- **תיאור**: להריץ מיגרציות ו-seeds לפני פתיחת השרת ולוודא שהתוכן נשאר
  זמין לאחר הפעלה מחדש.

### Phase 7 — בדיקות ושחרור מקומי

#### Step 7.1 — בדיקות, שימושיות וסקירה

- **דרישות**: REQ-023, REQ-024, REQ-026, REQ-027, REQ-032, REQ-033,
  REQ-034, REQ-035, REQ-036, REQ-037, REQ-038, REQ-039, REQ-040
- **קלט**: כל מסלולי המשתמש, המפרט ותוכנית Validation.
- **תיאור**: להריץ בדיקות יחידה/אינטגרציה, Typecheck, Build, npm audit,
  HTTP ודפדפן בשני רוחבים; להפעיל סקירת subagents, לתקן ממצאים מאומתים,
  לעדכן README/TASKS/Roadmap/CHANGELOG. Commit ו-Merge נפרדים ימתינו לאישור.

## מבנה הפרויקט המתוכנן

```text
src/
├── app.ts
├── index.ts
├── components/
│   ├── Layout.tsx
│   ├── HomePage.tsx
│   ├── AgentsList.tsx
│   ├── AgentDetail.tsx
│   └── AilmentsList.tsx
├── db/
│   ├── index.ts
│   ├── migrate.ts
│   ├── seed.ts
│   ├── migrations/
│   └── seeds/
├── routes/
│   ├── agents.ts
│   └── ailments.ts
├── static/
│   └── styles.css
└── types/
    ├── agent.ts
    ├── ailment.ts
    └── components.ts
```

## אסטרטגיית בדיקות

- **appType**: אתר HTML מרונדר בצד השרת.
- **מסעות קריטיים**: ניווט בין דפים; פתיחת פרופיל וקבלת תקלות; עיון
  בקטלוג; הפעלה מחדש תוך שמירת תוכן.
- **כלי אימות**: Vitest, SQLite זמני/בזיכרון, Hono `app.request`, TypeScript,
  Build, npm audit ובדיקת דפדפן.
- **תשתית**: ללא Docker או שירות חיצוני; מסד הבדיקות מבודד ונסגר בתום כל בדיקה.
- **בדיקת דפדפן**: 375px ו-1280px; אם כלי דפדפן אינו זמין, לבצע HTTP probes
  ולציין במפורש שחסרה בדיקה חזותית.
- **קריטריון קבלה**: כל דרישות ה-REQ מכוסות; Scorecard לפחות 9/10; אין כשל
  בנתיב, 404, מיגרציה, seed, RTL או נכס מקומי.
- **בדיקת סקירה**: לוודא שאין חריגה להיקף, SQL injection, HTML לא מקודד,
  נתונים לא בדיוניים או תלות CSS חיצונית.

## משימות

### Phase 1 — Setup

- [x] T001 [Plan:1.1] הוסף `better-sqlite3@13.1.1`, `@types/better-sqlite3@9.6.0`, `@picocss/pico@2.1.1` ותצורת TSX מדויקת ב-`package.json`, `package-lock.json`, `tsconfig.json`.
- [x] T002 [Plan:1.1] הוסף החרגה של `agentclinic.db`, `agentclinic.db-shm` ו-`agentclinic.db-wal` ל-`.gitignore`.

### Phase 2 — Foundational

- [x] T003 [Plan:2.1] כתוב בדיקות למיגרציה פעמיים, סכימה ו-FK ב-`src/db/migrate.test.ts`.
- [x] T004 [Plan:2.1] צור פתיחת SQLite והפעלת foreign keys ב-`src/db/index.ts`.
- [x] T005 [Plan:2.1] צור Runner ממוין ואטומי ורישום applied migrations ב-`src/db/migrate.ts`.
- [x] T006 [Plan:2.1] צור מיגרציות Agents, Ailments ו-Agent-Ailment ב-`src/db/migrations/001_create_agents.sql`, `002_create_ailments.sql`, `003_create_agent_ailments.sql`.
- [x] T007 [Plan:2.2] כתוב בדיקות seed חוזר, ספירות וקשרים ב-`src/db/seed.test.ts`.
- [x] T008 [Plan:2.2] צור נתוני seed וטיפוסי Domain ב-`src/db/seeds/agents.ts`, `src/db/seeds/ailments.ts`, `src/types/agent.ts`, `src/types/ailment.ts`.
- [x] T009 [Plan:2.2] צור פקודת seed נפרדת ב-`src/db/seed.ts` והוסף סקריפט `seed` ל-`package.json`.

### Phase 3 — User Story 1 (P1)

- [x] T010 [US1] [Plan:3.1] כתוב בדיקות Layout, שפה, RTL, ניווט ונכסים ב-`src/components/Layout.test.tsx`.
- [x] T011 [US1] [Plan:3.1] צור Props עצמאיים ו-Layout משותף ב-`src/types/components.ts` וב-`src/components/Layout.tsx`.
- [x] T012 [US1] [Plan:3.1] הוסף הגשה מקומית של Pico classless ו-CSS כתום/שחור mobile-first ב-`src/app.ts` וב-`src/static/styles.css`.
- [x] T013 [US1] [Plan:3.2] כתוב בדיקת בית ל-`Hello Hono!` ולניווט ב-`src/app.test.ts`.
- [x] T014 [US1] [Plan:3.2] החלף את תשובת הטקסט בדף בית HTML סמנטי ב-`src/components/HomePage.tsx` וב-`src/app.ts`.

### Phase 4 — User Story 2 (P1)

- [x] T015 [US2] [Plan:4.1,4.2] כתוב בדיקות רשימה/פרופיל/404 וקשרים ב-`src/routes/agents.test.ts`.
- [x] T016 [US2] [Plan:4.1] צור שאילתות Agents פרמטריות עם טיפוסי תוצאה ב-`src/db/queries.ts`.
- [x] T017 [US2] [Plan:4.2] צור רכיבי Props נפרדים לרשימה ולפרטים ב-`src/components/AgentsList.tsx`, `src/components/AgentDetail.tsx` וב-`src/types/components.ts`.
- [x] T018 [US2] [Plan:4.2] צור ורשום מסלולי `GET /agents` ו-`GET /agents/:id` ב-`src/routes/agents.ts` וב-`src/app.ts`.

### Phase 5 — User Story 3 (P2)

- [x] T019 [US3] [Plan:5.1] כתוב בדיקות קטלוג ושמות/תיאורים ב-`src/routes/ailments.test.ts`.
- [x] T020 [US3] [Plan:5.1] הוסף שאילתת Ailments פרמטרית ורכיב רשימה עם Props עצמאיים ב-`src/db/queries.ts`, `src/components/AilmentsList.tsx` וב-`src/types/components.ts`.
- [x] T021 [US3] [Plan:5.1] צור ורשום `GET /ailments` ב-`src/routes/ailments.ts` וב-`src/app.ts`.

### Phase 6 — User Story 4 (P2)

- [x] T022 [Plan:6.1] כתוב בדיקת אתחול ונתונים יציבים בין פתיחות DB ב-`src/db/startup.test.ts`.
- [x] T023 [Plan:6.1] הרץ מיגרציות ו-seed לפני האזנה ב-`src/index.ts`, ודווח שגיאות הפעלה באופן גלוי.

### Phase 7 — בדיקות ושחרור מקומי

- [x] T024 [Plan:7.1] עדכן בדיקת RTL/קידוד טקסט ו-404 לכל מסך ב-`src/app.test.ts` ובבדיקות המסלולים.
- [x] T025 [Plan:7.1] אמת נגישות, נכסי CSS ו-375/1280 בדפדפן; תקן `src/static/styles.css` בלבד לפי ממצאים.
- [x] T026 [Plan:7.1] הרץ `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm audit`, שרת ו-`git diff --check`; תעד תוצאות ב-`TASKS.md`.
- [x] T027 [Plan:7.1] בצע Code Review עמוק עם subagents, אמת כל ממצא, תקן ממצאים רלוונטיים והריץ בדיקות חוזרות.
- [x] T028 [Plan:7.1] עדכן README, TASKS, Roadmap ו-CHANGELOG לפי המימוש המאומת.

## מיפוי דרישות

| REQ ID | תיאור | פריטי תוכנית | ראיית מימוש |
|---|---|---|---|
| REQ-011 | Layout משותף | 3.1 | `src/components/Layout.tsx` |
| REQ-012 | עברית ו-RTL | 3.1, 7.1 | Layout ובדיקות |
| REQ-013 | ניווט | 3.1, 3.2 | Layout ודף בית |
| REQ-014 | דף בית עם Hello Hono | 3.2 | `HomePage.tsx`, `app.test.ts` |
| REQ-015 | שדות ברשימת סוכנים | 4.1, 4.2 | `queries.ts`, `AgentsList.tsx` |
| REQ-016 | קישור לפרופיל | 4.2 | `AgentsList.tsx` ובדיקת מסלול |
| REQ-017 | פרטי סוכן ותקלות | 4.1, 4.2 | שאילתות ו-`AgentDetail.tsx` |
| REQ-018 | 404 למזהה לא תקין/חסר | 4.1, 4.2 | `agents.ts` ובדיקת 404 |
| REQ-019 | קטלוג תקלות | 5.1 | `AilmentsList.tsx` ובדיקות |
| REQ-020 | קשר רבים-לרבים | 2.1, 4.1 | מיגרציה ו-join query |
| REQ-021 | לפחות 5+5 seeds | 2.2 | seed ובדיקות ספירה |
| REQ-022 | seed אידמפוטנטי | 2.2, 6.1 | seed ובדיקת ריצה חוזרת |
| REQ-023 | שימושיות רספונסיבית | 3.1, 7.1 | CSS ובדיקת דפדפן |
| REQ-024 | נתונים בדיוניים בלבד | 2.2, 7.1 | seed ובדיקת סקירה |
| REQ-025 | מצב ריק ו-404 | 3.2, 4.2, 5.1 | רכיבים ובדיקות |
| REQ-026 | TypeScript Strict ו-Props | 1.1, 3.1, 4.2, 5.1, 7.1 | `tsconfig`, types ו-typecheck |
| REQ-027 | Pico מקומי וכתום/שחור | 1.1, 3.1, 7.1 | CSS, routes ובדיקת נכסים |
| REQ-028 | SQLite ללא ORM | 2.1, 6.1 | DB bootstrap |
| REQ-029 | מיגרציות אטומיות ואידמפוטנטיות | 2.1 | `migrate.ts` ובדיקות |
| REQ-030 | Seeds לאחר מיגרציות | 2.2, 6.1 | `seed.ts`, `index.ts` |
| REQ-031 | מפתחות ו-FK | 2.1 | SQL migrations ובדיקות |
| REQ-032 | שאילתות פרמטריות | 4.1, 5.1 | `queries.ts` |
| REQ-033 | קידוד HTML | 4.2, 5.1, 7.1 | Hono JSX ובדיקת טקסט |
| REQ-034 | כיסוי בדיקות | 2.1, 2.2, 3.1–7.1 | קבצי Vitest |
| REQ-035 | Gates לפני השלמה | 7.1 | תוצאות בדיקה מתועדות |
| REQ-036 | Hono JSX server-side | 1.1, 3.1–5.1 | `app.ts`, רכיבי TSX |
| REQ-037 | Locale, RTL וקידוד טקסט | 3.1, 4.2, 5.1, 7.1 | Layout ורכיבים |
| REQ-038 | נכסים מקומיים בלבד | 3.1, 7.1 | CSS routes ובדיקות HTTP |
| REQ-039 | גרסאות ישירות מדויקות ו-Lockfile | 1.1, 7.1 | `package.json`, Lockfile |
| REQ-040 | כשל אתחול גלוי ב-DB/Migration | 6.1, 7.1 | `index.ts` ובדיקת startup |

</div>
