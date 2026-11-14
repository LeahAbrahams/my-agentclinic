<div dir="rtl">

# מפרט פיצ'ר: MVP — Therapies, Appointments, Dashboard

- **Branch**: `feature/mvp`
- **תאריך**: 2026-11-13
- **סטטוס**: הושלם ואומת; מוזג ל-`main` ונדחף ל-GitHub ב-Commit `5943e2c`
- **מקורות**: `specs/mission.md`, `specs/techstack.md`, `specs/roadmap.md`,
  מפרט Agents and Ailments, Video 11 ו-Video 12 מהמאגר הרשמי של הקורס.

## סיכום

שלב זה משלים את Agent Clinic ל-MVP מלא באמצעות שלושה רכיבים:

1. **קטלוג Therapies** — פעולות תמיכה טכניות בדיוניות לסוכני AI, וקשר
   רבים-לרבים לתקלות.
2. **Appointments** — טופס קביעת פגישת שירות לסוכן AI, ולידציה, PRG
   ועמוד אישור.
3. **Staff Dashboard** — לוח צוות עם מדדים, רשימות ועדכון סטטוס פגישות.

## מסמכים קשורים

| מסמך | קישור |
|---|---|
| דרישות מלאות (REQ-041–060) | [`requirements.md`](./requirements.md) |
| תוכנית מימוש (8 שלבים, 38 משימות) | [`plan.md`](./plan.md) |
| תוכנית אימות ו-Scorecard | [`validation.md`](./validation.md) |
| Checklist דרישות | [`checklists/requirements.md`](./checklists/requirements.md) |

## תוצאות אימות

- **45/45 בדיקות אוטומטיות** עברו (Vitest).
- **TypeScript typecheck** — קוד יציאה 0.
- **Build** — קוד יציאה 0.
- **npm audit** — 0 חולשות.
- **Vercel deployment** — `success` עבור Commit `5943e2c`.
- **14 בדיקות רספונסיביות** ב-375px ו-1280px עברו ללא גלילה אופקית.
- **מסע דפדפן מלא** — יצירת פגישה, אישור, Dashboard ועדכון סטטוס.

## גבולות היקף

**כלול**: קטלוג טיפולים, קשרי תקלה-טיפול, טופס פגישה, PRG, Dashboard,
עדכון סטטוס, 404/500, logging, RTL, responsive, TypeScript strict, SQL
migrations, seed אידמפוטנטי, HTML escaping.

**לא כלול**: מטופלים אנושיים, מידע רפואי, חשבונות משתמשים, הרשאות,
אימייל, תשלומים, פרופילי מטפלים.

</div>
