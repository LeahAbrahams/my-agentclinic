<div dir="rtl">

# מפת דרכים — Agent Clinic

מפת דרכים זו מתארת את רצף העבודה בקורס. `TASKS.md` הוא לוח המעקב המפורט
והעדכני; אין לסמן אבני דרך כהושלמות לפני אימות.

## עקרונות תיעדוף

1. קודם מאמתים דרישות ותנאי קבלה, ורק אחר כך מממשים.
2. פיצ'רים הנדרשים בקורס קודמים להרחבות רשות.
3. רעיונות שאינם מאושרים לא ייכנסו ל-MVP ולא ישנו את מפת הדרכים.
4. משימות שתלויות באישור או בחומרי קורס יסומנו כחסומות, ולא ייחשבו שהושלמו.

## שלב א — סביבת עבודה, Constitution ו-Hello Hono

**סטטוס: הושלם מקומית; Merge ל-main טרם אושר**

- סביבת TypeScript Strict, Git ומסמכי היסוד הוקמו; חיבור Claude Code/GitHub
  נותר לא מאומת.
- Feature Spec, Implementation Plan, 10 דרישות, 5 משימות ו-Validation הושלמו.
- מימוש Hono נשמר ב-`cbadbc7` על `feature/hello-hono`.
- Vitest ו-`npm test` החליפו את Node test runner בהתאם לחומרי הקורס.
- Vitest `4.1.12`, Typecheck, Build ו-`npm audit` (0 חולשות) אומתו ב-Branch
  `replanning`.
- `npm ci`, בדיקות, Typecheck, Build, `npm start`, `npm run dev`, HTTP ופורט
  תפוס אומתו; אין Push או Merge.

## שלב ב — Replanning ובדיקות

**סטטוס: הושלם ונבדק מקומית ב-Branch `replanning`; Commit ממתין לאישור**

- המדיניות מגדירה Vitest, `npm test`, Typecheck ו-Build כחלק מכל שינוי.
- מפרטי Hello Hono ומחסנית הטכנולוגיות עודכנו בהתאם למדיניות.
- ממשק עתידי ייבנה mobile-first וייבדק בנייד ובשולחן עבודה. Hello Hono הוא
  API ללא ממשק, לכן אין להוסיף לו CSS או בדיקת פריסה מלאכותית.
- Skill ל-CHANGELOG נוצר; הסקריפט ויצירת היומן נבדקו ליצירה חוזרת ולקומיטים
  מרובים באותו יום. הפעלת Skill מתוך Claude Code לא אומתה, כי פקודת `claude`
  אינה זמינה בסביבה.
- דרישת הקורס לארגון מחדש של שלבי המוצר משתקפת בשלב ג.
- `npm test` (2/2), Typecheck, Build ו-`npm audit` (0 חולשות) עברו.
- לא בוצע Commit, Merge או Push; Commit של שלב זה ממתין לאישור מפורש.

## שלב ג — Phase 2 מאוחדת: Layout, Agents ו-Ailments

**סטטוס: ממתין למפרט ב-Branch `feature/agents-and-ailments`**

על פי Roadmap הקורס, שלבי Base Layout, Agent List, Agent Detail ו-Ailments
Catalog מאוחדים ל-Phase 2 אחד:

- Layout משותף, ניווט, רכיבי Header/Main/Footer ו-CSS רספונסיבי.
- SQLite עם SQL Migrations ונתוני seed עבור Agents ו-Ailments.
- מסכי רשימה/פרטים וקישור בין סוכנים לאתגרים שלהם.
- “Agents and Ailments” יוגדרו כתוכן בדיוני של סוכני AI; לא יאוחסנו מחלות או
  נתוני בריאות אישיים של אנשים.
- היקף, סכימה, בחירות ממשק ותנאי קבלה ייקבעו במפרט לפני המימוש.

## שלב ד — יתרת MVP: Therapies, Appointments ו-Staff Dashboard

**סטטוס: ממתין למפרט MVP**

- קטלוג Therapies וקישור לאתגרים בדיוניים.
- הזמנת Appointments, אימות טופס ואישור.
- Staff Dashboard וסיכומי פעילות, לפי המפרט והרובריקה.
- נתוני דוגמה, בדיקות, Spec Validation והשוואה בין המפרט למימוש.

## שלב ה — Skills ו-Context7

**סטטוס: ממתין**

- יצירה ובדיקה מעשית של Skill ל-Feature Spec.
- בדיקת Context7; דרישת הקורס היא CLI ו-Skills, לא MCP Server.
- התקנות/התחברויות רק לאחר אימות הוראות ואישור הנדרש.

## שלב ו — Legacy Support ו-Build Your Own Workflow

**סטטוס: חסום עד לזמינות סביבת Legacy נפרדת**

- בידוד פרויקט Legacy, Reverse Engineering, TODO, README ומסמכי Constitution.
- Feature Spec ומימוש Feedback Form; אין לשנות את Agent Clinic.
- נדרש מקור Legacy זמין לפני ביצוע; Commit/Merge באישור בלבד.

## שלב ז — הרחבות רשות וניידות בין סוכנים

**סטטוס: ממתין; לא חלק מה-MVP**

- GitHub Spec Kit, OpenSpec ו-Research Backlog.
- Codex, OpenCode ו-ACP Registry.
- אין התקנה או שינוי מערכת לפני הצגת ההשפעה וקבלת אישור.

## מקורות והחלטות תכולה

- מקור קורס: [מאגר הקבצים הרשמי של DeepLearning.AI](https://github.com/https-deeplearning-ai/sc-spec-driven-development-files),
  בפרט `Video09_Project_Replanning` ו-`Video10_The_second_feature_phase`.
- מקור הקורס מאשר את Agents & Ailments ואת איחוד שלבי Layout/Agent List/Detail/
  Ailments; התוכן ימומש רק כאתגרי AI בדיוניים, לא כמעקב רפואי.
- הצהרת המשימה הקיימת, שאושרה קודם, מתמקדת ברווחה לאנשים עובדים. עדכון זה
  משמר אותה; Agents/Ailments ייחשבו לתוכן לימודי בדיוני בלבד, והקשר ביניהם
  יתועד במפרט לפני מימוש. לא יישמרו מחלות או נתוני בריאות של אנשים.
- Driver ל-SQLite, כלי מיגרציות ותכולת MVP מדויקת ייקבעו במפרטים.

</div>
