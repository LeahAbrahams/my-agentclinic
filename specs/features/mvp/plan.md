<div dir="rtl">

# תוכנית מימוש — MVP

**מפרט**: [`requirements.md`](./requirements.md)
**תאריך**: 2026-11-13
**ענף**: `feature/mvp`

## סיכום

הרחבת Agent Clinic המקומי לאחר Phase 2 באמצעות פעולות תמיכה טכניות
ל-Ailments, תהליך פגישת שירות לסוכני AI, Dashboard לצוות הדגמה, ונגישות/
הקשחה. כל הנתונים דמיוניים; אין מידע רפואי אנושי ואין התחברות במסגרת MVP.

## הקשר טכני

- **Runtime**: Node.js `24.13.0`, TypeScript `6.0.3`, ESM, Strict.
- **Web**: Hono `4.13.18`, Hono JSX ו-`@hono/node-server` `2.1.8`.
- **Database**: SQLite/`better-sqlite3` `13.1.1`; migrations ממוספרות,
  prepared statements, seed transaction ואילוצי FK.
- **UI**: Server-rendered Hebrew/RTL, Pico CSS `2.1.1` classless וקובץ
  CSS מקומי. אין Client JS או CDN.
- **Tests**: Vitest `4.1.12`; DB זמני/בזיכרון ובדיקות Hono דרך
  `app.request`; בדיקת HTTP ו-browser smoke לאחר הפעלת שרת production.
- **פריסה**: Build של Vercel מספק שער TypeScript ובדיקת פריסה עבור ענף
  `feature/mvp`; יש לוודא Build מוצלח לאחר כל תיקון.

## בדיקת התאמה לחוקה

| עיקרון | יישום |
|---|---|
| תכנון לפני מימוש | דרישות ממוספרות, משימות ועקיבות לפני שינויי MVP |
| עברית ו-RTL | כל עמוד/שגיאה/טופס משתמשים ב-Layout משותף בעברית |
| פרטיות ובטיחות | סוכני AI ותקלות טכניות בדיוניים; אין נתוני בריאות או זהות אדם |
| פעולה מקומית | SQLite וקובצי CSS מקומיים; Dashboard אינו מנגנון הרשאות |
| איכות | strict types, prepared statements, מיגרציות, בדיקות ובדיקת דפדפן |

## הנחיות שהוחלו

- להמשיך את דפוסי `src/db/migrate.ts`, `src/db/seed-data.ts`,
  `src/routes/` ו-`src/components/`.
- להתחיל בבדיקות חוזה למיגרציות, seeds, שאילתות, routes ושגיאות; בכל
  implementation batch להריץ בדיקות זמינות ולתעד pass/fail.
- לא לכתוב גוף POST, פרטי טופס או קלט משתמש ללוג. JSX מבצע escaping
  בפלט; יש להוסיף בדיקה מול `<script>`.
- כל מיגרציה עצמאית ואטומית; יחסי רבים-לרבים מוגנים ב-FK ובמפתח מורכב.
- Dashboard מיועד להרצה מקומית בלבד; אין להציגו כמאובטח לחשיפה ציבורית.

## תוכנית שלבים ומשימות

### Phase 1 — בסיס נתונים ופעולות תמיכה

#### Step 1.1 — בדיקות חוזה לסכימה, פעולות תמיכה ופגישות

דרישות: REQ-041, REQ-042, REQ-048, REQ-059.

**משימות**

- [x] T001 [Plan:1.1] הוסף בדיקות מיגרציה וסכימת טבלאות ל-`src/db/migrate.test.ts`.
- [x] T002 [Plan:1.1] הוסף בדיקות FK ואידמפוטנטיות seed עבור קשרי
  therapies ל-`src/db/seed.test.ts`.
- [x] T003 [Plan:1.1] הוסף בדיקות שאילתות/CRUD לפגישות ב-`src/db/queries.test.ts`.

#### Step 1.2 — מיגרציות

דרישות: REQ-042, REQ-048, REQ-059.

**משימות**

- [x] T004 [Plan:1.2] צור `src/db/migrations/004_create_therapies.sql`
  עם מפתח, שם ייחודי ותיאור.
- [x] T005 [Plan:1.2] צור `src/db/migrations/005_create_ailment_therapies.sql`
  עם FK ומפתח מורכב.
- [x] T006 [Plan:1.2] צור `src/db/migrations/006_create_appointments.sql`
  עם FK לסוכן, נותן שירות, מועד, סטטוס מאומת וזמן יצירה.

#### Step 1.3 — נתוני דוגמה ושכבת נתונים

דרישות: REQ-041, REQ-042, REQ-043, REQ-045–REQ-051, REQ-059.

**משימות**

- [x] T007 [Plan:1.3] הגדר טיפוסי `Therapy` ו-`Appointment` ב-`src/types/`.
- [x] T008 [Plan:1.3] הוסף 5 פעולות טכניות בדיוניות ב-`src/db/seeds/therapies.ts`.
- [x] T009 [Plan:1.3] הוסף קשרי תקלה-פעולה ב-`src/db/seeds/ailment-therapies.ts`.
- [x] T010 [Plan:1.3] הוסף פעולות, קשרים ופגישת דוגמה ל-`src/db/seed-data.ts`;
  השאר seed אידמפוטנטי וטרנזקציוני.
- [x] T011 [Plan:1.3] הוסף שאילתות פעולות סיוע ותקלה ב-`src/db/queries.ts`.
- [x] T012 [Plan:1.3] הוסף יצירה, קריאה ועדכון סטטוס פגישה ב-`src/db/queries.ts`;
  השתמש ב-prepared statements וסטטוסים מפורשים.
- [x] T013 [Plan:1.3] הוסף שאילתות Dashboard ונתוני פגישה ב-`src/db/queries.ts`.

### Phase 2 — קטלוג פעולות תמיכה

#### Step 2.1 — דפי טיפולים והמלצות

דרישות: REQ-041–REQ-043, REQ-052–REQ-054.

**משימות**

- [x] T014 [Plan:2.1] הוסף Props עצמאיים ל-`src/types/components.ts`.
- [x] T015 [Plan:2.1] צור `src/components/TherapiesList.tsx` לרשימה ולמצב ריק.
- [x] T016 [Plan:2.1] עדכן `src/components/AilmentsList.tsx` להצגת פעולות
  תמיכה מקושרות.
- [x] T017 [Plan:2.1] צור `src/routes/therapies.ts` ונתיב `GET /therapies`.
- [x] T018 [Plan:2.1] רשום נתיב וקישור ניווט לקטלוג הטיפולים ב-`src/app.ts`
  וב-`src/components/Layout.tsx`.
- [x] T019 [Plan:2.1] הוסף בדיקות נתיב/רשימה/מצב ריק/קישורים ב-
  `src/routes/therapies.test.ts` וב-`src/routes/ailments.test.ts`.

### Phase 3 — בקשת פגישת שירות

#### Step 3.1 — טופס, אימות ועמוד אישור

דרישות: REQ-044–REQ-048, REQ-052–REQ-054, REQ-057.

**משימות**

- [x] T020 [Plan:3.1] צור `src/components/AppointmentForm.tsx` עם שדות בעברית,
  `required`, ערכים שנשמרים אחרי שגיאה והצגת הודעה ברורה.
- [x] T021 [Plan:3.1] צור `src/components/AppointmentConfirmation.tsx`
  המציג פרטי פגישה כטקסט מקודד.
- [x] T022 [Plan:3.1] הוסף Props ציבוריים עצמאיים ב-`src/types/components.ts`.
- [x] T023 [Plan:3.1] צור `src/routes/appointments.ts`: טופס GET מזוהה-סוכן,
  POST מאומת, יצירה והפניית 302, ו-GET אישור.
- [x] T024 [Plan:3.1] הוסף קישור לקביעת פגישה לפרופיל ב-
  `src/components/AgentDetail.tsx`.
- [x] T025 [Plan:3.1] רשום נתיבי פגישות ב-`src/app.ts`.
- [x] T026 [Plan:3.1] בדוק POST תקין/חסר/מזהה לא קיים/מועד לא תקין ו-escaping
  ב-`src/routes/appointments.test.ts`.

### Phase 4 — Dashboard לצוות הדגמה

#### Step 4.1 — סיכומים ועדכון סטטוס

דרישות: REQ-049–REQ-052, REQ-057–REQ-058.

**משימות**

- [x] T027 [Plan:4.1] צור `src/components/Dashboard.tsx` עם מדדים, טבלאות
  ומצב ריק.
- [x] T028 [Plan:4.1] צור `src/routes/dashboard.ts` לקריאה ולעדכון סטטוס פגישה.
- [x] T029 [Plan:4.1] רשום נתיב וקישור Dashboard ב-`src/app.ts` וב-Layout;
  הבהר כי הוא מיועד להדגמה מקומית וללא auth.
- [x] T030 [Plan:4.1] הוסף בדיקות ספירות, רשימות, שינוי סטטוס, ערכים שגויים
  ו-Dashboard ריק ל-`src/routes/dashboard.test.ts`.

### Phase 5 — נגישות והקשחה

#### Step 5.1 — טיפול שגיאות ולוג בקשות

דרישות: REQ-052–REQ-057.

**משימות**

- [x] T031 [Plan:5.1] צור `src/components/ServerErrorPage.tsx` לשגיאה כללית.
- [x] T032 [Plan:5.1] הוסף `NotFound` ו-`onError` ב-`src/app.ts`, תוך רישום
  שגיאה פנימי והסתרת פרטי מימוש מהתגובה.
- [x] T033 [Plan:5.1] צור `src/middleware/logger.ts` לרישום method/path/status/
  משך בלי body או query values.
- [x] T034 [Plan:5.1] רשום middleware לפני הנתיבים והוסף בדיקות 404/500 ולוג
  ב-`src/app.test.ts`.

#### Step 5.2 — בדיקות UX, שילוב ותיעוד

דרישות: REQ-052–REQ-056, REQ-060.

**משימות**

- [x] T035 [Plan:5.2] בדוק ועדכן `src/static/styles.css` לטבלאות, טפסים,
  focus גלוי ופריסה ב-375px/1280px.
- [x] T036 [Plan:5.2] הרץ `npm ci`, `npm test`, `npm run typecheck`,
  `npm run build`, `npm audit` ו-`npm run seed`; תעד exit codes ותוצאות.
- [x] T037 [Plan:5.2] הפעל שרת production ובדוק ב-HTTP את כל דפי MVP,
  POST/redirect/status, נכסים, 404 ושגיאות; בדוק בדפדפן מסעות שימוש ורוחבים.
- [x] T038 [Plan:5.2] עדכן `README.md`, `specs/roadmap.md`, `TASKS.md` ואת
  `runtime-validation-report.md` לפי ראיות; אין לסמן בדיקות שלא הורצו.

**תוצאות T036–T038:** `npm ci --ignore-scripts` הצליח; `npm test` עבר 45/45,
Typecheck, Build, audit (0 חולשות), מיגרציות ו-seed מבודד עברו. בדיקות HTTP,
יצירת פגישה, אישור, עדכון סטטוס ו-14 בדיקות דפדפן RTL/רספונסיביות עברו.
פריסת Vercel עבור `5943e2c` הושלמה בהצלחה. ב-Windows, `npm ci` רגיל דורש
כלי C++ לבניית `better-sqlite3`.

## אסטרטגיית בדיקות

- **appType**: אתר HTML מרונדר בצד השרת.
- **מסעות קריטיים**: ניווט לקבוצת טיפולים; פתיחת פרופיל וקביעת פגישה;
  שגיאת טופס ואישור; Dashboard ואישור/ביטול; שגיאת 404/500.
- **בדיקות יחידה/אינטגרציה**: Vitest, מסדי SQLite זמניים/בזיכרון, Hono
  `app.request`; תלות SQLite היא embedded, ללא Docker, broker או APIs חיצוניים.
- **דפדפן**: בדיקת מסעות UI מול שרת production ב-375px וב-1280px. להשתמש
  בדפדפן האינטגרטיבי הזמין; אין להוסיף Playwright לתלויות בלי צורך/אישור.
- **נתוני בדיקה**: seed דטרמיניסטי לכל test DB; להפעיל cleanup/close בסיום.
- **תנאי PASS**: כל דרישות 041–060 מכוסות; בדיקות, typecheck, build,
  audit ו-HTTP מסתיימים בקוד 0; אין גלילה אופקית או תוכן שגיאה חשוף.
- **סביבה**: אין צורך ב-Docker עבור SQLite המוטמע. יש להריץ את שערי
  הבדיקות וה-runtime בסביבה שבה התלויות זמינות.

## מבנה פרויקט יעד

```text
src/
├── app.ts
├── index.ts
├── middleware/logger.ts
├── components/
│   ├── AppointmentConfirmation.tsx
│   ├── AppointmentForm.tsx
│   ├── Dashboard.tsx
│   ├── ServerErrorPage.tsx
│   └── TherapiesList.tsx
├── db/
│   ├── migrations/004_create_therapies.sql
│   ├── migrations/005_create_ailment_therapies.sql
│   ├── migrations/006_create_appointments.sql
│   └── seeds/therapies.ts
├── routes/
│   ├── appointments.ts
│   ├── dashboard.ts
│   └── therapies.ts
└── types/
    ├── appointment.ts
    └── therapy.ts
```

## Requirement Mapping

| REQ ID | תיאור | Plan Items | ראיית מימוש |
|---|---|---|---|
| REQ-041 | קטלוג פעולות תמיכה | 1.1, 1.3, 2.1 | `src/db/seeds/therapies.ts`, `src/routes/therapies.ts`, `src/components/TherapiesList.tsx` |
| REQ-042 | קשרי תקלה-פעולה | 1.1–1.3 | migrations 005, seed links, `src/db/queries.ts` |
| REQ-043 | הצגת המלצות לתקלה | 1.3, 2.1 | `src/components/AilmentsList.tsx` |
| REQ-044 | טופס מזוהה-סוכן | 3.1 | `src/components/AgentDetail.tsx`, `src/routes/appointments.ts` |
| REQ-045 | אימות שדות פגישה | 1.1–1.3, 3.1 | migration 006, form route, `appointments.test.ts` |
| REQ-046 | שמירה ואישור PRG | 1.1–1.3, 3.1 | appointment queries, confirmation component, route tests |
| REQ-047 | שגיאות טופס ללא כתיבה | 3.1 | `src/routes/appointments.test.ts` |
| REQ-048 | סכימה וסטטוסים מוגבלים | 1.1–1.3 | migration 006, `src/types/appointment.ts`, DB tests |
| REQ-049 | מדדי Dashboard | 1.3, 4.1 | dashboard queries, route/component tests |
| REQ-050 | רשימות ושינוי סטטוס | 1.3, 4.1 | `src/routes/dashboard.ts`, `src/components/Dashboard.tsx` |
| REQ-051 | אימות סטטוס | 1.1, 1.3, 4.1 | DB operation and dashboard route tests |
| REQ-052 | Layout וניווט | 2.1–4.1 | `Layout.tsx`, routes, navigation tests |
| REQ-053 | responsive ו-focus | 2.1–5.2 | `src/static/styles.css`, browser evidence |
| REQ-054 | HTML סמנטי ומקומי | 2.1–5.2 | JSX pages, CSS routes, page tests |
| REQ-055 | דפי 404/500 בטוחים | 5.1 | `NotFoundPage.tsx`, `ServerErrorPage.tsx`, `src/app.test.ts` |
| REQ-056 | לוג בקשות בטוח | 5.1 | `src/middleware/logger.ts`, spy test |
| REQ-057 | הצגה בטוחה של טקסט קלט | 3.1, 4.1 | JSX escaping and injection regression tests |
| REQ-058 | תוכן AI בדיוני בלבד | 1.3, 3.1, 4.1 | seed data, labels, README/spec review |
| REQ-059 | מיגרציות ו-seeds חוזרים | 1.1–1.3 | migration/seed tests |
| REQ-060 | שערי אימות מלאים | 5.2 | test/build/audit/runtime report |

## עקיבות משימות

| Plan item | משימות |
|---|---|
| 1.1 | T001–T003 |
| 1.2 | T004–T006 |
| 1.3 | T007–T013 |
| 2.1 | T014–T019 |
| 3.1 | T020–T026 |
| 4.1 | T027–T030 |
| 5.1 | T031–T034 |
| 5.2 | T035–T038 |

</div>
