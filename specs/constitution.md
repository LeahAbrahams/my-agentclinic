<div dir="rtl">

<!--
Sync Impact Report
Version change: 0.1.0 → 0.1.1 (בחירות טכנולוגיות Phase 2 והקשר הקורס תועדו; העקרונות לא השתנו)
Modified principles: none
Added sections: Migration Mode, Core Principles, Target Technology Stack,
Additional Constraints, Development Workflow, Governance
Removed sections: none
Templates requiring updates:
✅ Reviewed and aligned in project docs: README.md, specs/mission.md,
   specs/techstack.md, specs/roadmap.md, TASKS.md
✅ Reviewed; no project-local copies to update:
   creating-implementation-plan/templates/plan-template.md
   feature-inventory/templates/spec-template.md
⚠ Pending: breaking-down-tasks/templates/tasks-template.md was unavailable at
   the expected skill path; no project-local template exists.
⚠ Pending: generic skill files were not edited; they are outside this project.
Follow-up TODOs:
- Ratification date awaits user approval.
- The official course requires a fictional Agents/Ailments Phase 2; its scope
  and relationship to the approved wellness mission are documented in the
  feature specification. It contains no human health data.
- Select and verify exact Phase 2 dependency versions before implementation.
-->

# Agent Clinic Constitution

## Migration Mode

**Mode**: REWRITE

**Justification**: סביבת העבודה הייתה ריקה ולא נמצא בה פרויקט קיים. לכן מדובר
בפרויקט חדש ולא בשדרוג או בהסבה של מערכת קיימת.

## Core Principles

### I. מפרט לפני מימוש

כל פיצ'ר מתחיל במפרט עם מטרות, דרישות, תנאי הצלחה ותוכנית עבודה. אין להוסיף
התנהגות מוצרית שלא אושרה או שלא נובעת מדרישה מתועדת. פערי הבהרה נשארים גלויים
עד להכרעה.

### II. שימושיות בעברית וב-RTL

ממשק משתמש שייכתב עבור הפרויקט יהיה בעברית ובכיוון RTL כברירת מחדל. כל מסך
חדש ייבדק ברוחבים צרים ורחבים ובתרחישי שימוש מרכזיים לפני הכרזת השלמה.

### III. גבולות תוכן בריאותי ופרטיות

המערכת מספקת רעיונות כלליים לאורח חיים, מזון ופעילות גופנית ואינה מאבחנת או
מטפלת. אין לאסוף או לשמור נתוני בריאות אישיים או מעקב מחלות ללא דרישה מפורשת,
בדיקת השלכות ואישור המשתמשת.

### IV. פעולה אמינה בסביבת NetFree

תוכן, סגנונות ונכסים החיוניים לפעולת האפליקציה יהיו מקומיים. נתיב שימוש מרכזי
לא ייכשל עקב CDN, API חיצוני, גופן מרוחק או שירות צד שלישי שאינו זמין.

### V. טיפוסים, התמדה ובדיקות

קוד TypeScript ייבדק במצב Strict; תלויות ישירות יינעלו בגרסאות מדויקות
ובקובץ Lock; שינויי SQLite ינוהלו באמצעות מיגרציות גרסאיות. פיצ'ר ייחשב שלם
רק לאחר שבדיקותיו ותנאי הקבלה שלו עברו.

## Target Technology Stack

| Component | Target Version | Notes |
|-----------|---------------|-------|
| Node.js | 24.13.0 זמין בסביבה | יש לקבוע גרסת פרויקט נתמכת בשלד |
| TypeScript | 6.0.3 זמין גלובלית | גרסת פרויקט תינעל בתלויות |
| Framework | Hono `4.13.18` | Hono server-rendered JSX; ננעל בפרויקט |
| Database | SQLite עם `better-sqlite3` `13.1.1` | מיגרציות SQL גרסאיות; יאומת בהתקנה |
| CSS | Pico CSS `2.1.1` | גרסת classless מקומית, ללא CDN |
| JDK | לא רלוונטי | הפרויקט מתוכנן ל-Node.js |

## Additional Constraints

- חומרי הקורס או מפרט מאושר גוברים על הנחות זמניות; סתירה תתועד ותועלה
  להכרעה לפני מימוש.
- חומרי הקורס הרשמיים דורשים Agents and Ailments כדוגמת תוכן בדיונית של
  סוכני AI; אין בכך היתר לאסוף מחלות או נתוני בריאות של אנשים.
- ממשק, נתונים, אימות משתמשים ותכונות מעבר לתוכן שהוגדר במפרט מאושר נשארים
  מחוץ להיקף.
- המעטפת ההומוריסטית תישאר מכבדת, לא רפואית ונגישה.

## Development Workflow

- העבודה מתבצעת בשלבים קטנים לפי `TASKS.md` ו-`specs/roadmap.md`.
- מפרט נבדק לפני מימוש; שינוי היקף מחייב עדכון מפרט, Roadmap ולוח משימות.
- בדיקות וטיפוסים יורצו לאחר שינוי רלוונטי; התוצאות יתועדו ולא ינוחשו.
- Branch, Commit ופעולות שיתוף יבוצעו רק בנקודות האישור שנקבעו עם המשתמשת.
- Push, Merge, מחיקה ושינוי מרוחק מחייבים אישור מפורש מראש.

## Governance

החוקה מגדירה את עקרונות הפרויקט. שינוי בעקרון מחייב תיעוד של הסיבה, השפעה
על מסמכים ופיצ'רים תלויים, ועדכון גרסה; שינוי מהותי יאושר על ידי המשתמשת.
תיקוני ניסוח שאינם משנים משמעות יקבלו PATCH, עקרון או סעיף חדש יקבל MINOR,
ושינוי שמסיר או מגדיר מחדש עקרון באופן לא תואם יקבל MAJOR.

בכל Feature Spec, תכנון ומימוש תיבדק התאמה לעקרונות הרלוונטיים. חריגה מחייבת
הסבר, חלופה פשוטה יותר שנשקלה ואישור לפני מימוש. `TASKS.md` הוא רישום התקדמות,
בדיקות, החלטות, חסימות ואישורים.

**Version**: 0.1.1 | **Ratified**: TODO(RATIFICATION_DATE): ממתין לאישור המשתמשת | **Last Amended**: 2026-11-13

</div>
