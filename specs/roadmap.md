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

**סטטוס: הושלם ונבדק; אושר Fast-forward מקומי של `main` ל-`d8fc699`**

- סביבת TypeScript Strict, Git ומסמכי היסוד הוקמו; חיבור Claude Code/GitHub
  נותר לא מאומת.
- Feature Spec, Implementation Plan, 10 דרישות, 5 משימות ו-Validation הושלמו.
- מימוש Hono נשמר ב-`cbadbc7` על `feature/hello-hono`.
- Vitest ו-`npm test` החליפו את Node test runner בהתאם לחומרי הקורס.
- Vitest `4.1.12`, Typecheck, Build ו-`npm audit` (0 חולשות) אומתו ב-Branch
  `replanning`.
- `npm ci`, בדיקות, Typecheck, Build, `npm start`, `npm run dev`, HTTP ופורט
  תפוס אומתו; אין Push. Branches נשמרו.

## שלב ב — Replanning ובדיקות

**סטטוס: הושלם, נבדק ומוזג מקומית; `fef7f93` ו-`d8fc699`**

- המדיניות מגדירה Vitest, `npm test`, Typecheck ו-Build כחלק מכל שינוי.
- מפרטי Hello Hono ומחסנית הטכנולוגיות עודכנו בהתאם למדיניות.
- ממשק עתידי ייבנה mobile-first וייבדק בנייד ובשולחן עבודה. Hello Hono הוא
  API ללא ממשק, לכן אין להוסיף לו CSS או בדיקת פריסה מלאכותית.
- Skill ל-CHANGELOG נוצר; הסקריפט ויצירת היומן נבדקו ליצירה חוזרת ולקומיטים
  מרובים באותו יום. הפעלת Skill מתוך Claude Code לא אומתה, כי פקודת `claude`
  אינה זמינה בסביבה.
- דרישת הקורס לארגון מחדש של שלבי המוצר משתקפת בשלב ג.
- `npm test` (2/2), Typecheck, Build ו-`npm audit` (0 חולשות) עברו.
- Fast-forward ל-`main` בוצע רק לאחר אישור מפורש; אין Push או מחיקת Branch.

## שלב ג — Phase 2 מאוחדת: Layout, Agents ו-Ailments

**סטטוס: מומש בענף `feature/agents-and-ailments` ובוצע Fast-forward מקומי ל-main**

על פי Roadmap הקורס, שלבי Base Layout, Agent List, Agent Detail ו-Ailments
Catalog מאוחדים ל-Phase 2 אחד:

- Layout משותף, ניווט, רכיבי Header/Main/Footer ו-CSS רספונסיבי.
- SQLite עם SQL Migrations ונתוני seed עבור Agents ו-Ailments.
- מסכי רשימה/פרטים וקישור בין סוכנים לאתגרים שלהם.
- “Agents and Ailments” יוגדרו כתוכן בדיוני של סוכני AI; לא יאוחסנו מחלות או
  נתוני בריאות אישיים של אנשים.
- המפרט והתוכנית קיימים ב-`specs/features/agents-and-ailments/`; Commits
  מקומיים `4211417` ו-`457fc19` קיימים. Fast-forward מקומי ל-main בוצע
  באישור הרחב של המשתמשת. אין Push.
  `GET /` יהפוך לדף HTML וישמר את ברכת Hello Hono.

## שלב ד — יתרת MVP: Therapies, Appointments ו-Staff Dashboard

**סטטוס: הושלם ונבדק בענף `feature/mvp`; סטטוס Vercel עבור העדכון האחרון הצליח**

- מפרט: `specs/features/mvp/requirements.md`; 20 דרישות חדשות `REQ-041`–`REQ-060`.
- תוכנית: `specs/features/mvp/plan.md`; שמונה פריטי תוכנית ו-38 משימות.
- אימות: `specs/features/mvp/validation.md`; כולל DB, routes, HTTP, דפדפן,
  375/1280, logging, 404/500 ו-scorecard.
- התוכן יתאר שירותים טכניים בדיוניים לסוכני AI; אין בני אדם כמטופלים או
  מידע רפואי, ואין אימות משתמשים/הרשאות ב-Dashboard המקומי.
- מיגרציות, שכבת נתונים, מסכים, נתיבים, בדיקות, טיפול בשגיאות ו-CSS נכתבו
  לפי התוכנית. נוספה בדיקת קלט לתאריך לא תקין.
- בדיקת מועד פגישה משתמשת ברכיבים שנקראו אחרי אימות פורמט הקלט, עם בדיקת
  רגרסיה לחודש מחוץ לטווח.
- 45/45 בדיקות, Typecheck, Build, audit, Seed מבודד, בדיקות HTTP ומסעות דפדפן
  עברו; 14 צירופי מסך/רוחב נבדקו ב-375px וב-1280px.
- Vercel דיווח `Deployment has completed` עבור `5943e2c`; המימוש מוזג
  ל-`main` ונדחף ל-GitHub.
- התקנת התלויות המקומית בוצעה עם `npm ci --ignore-scripts`; Build Vercel
  הצליח. `npm ci` רגיל ב-Windows תלוי בכלי C++ לבניית `better-sqlite3`.

## שלב ה — Skills ו-Context7

**סטטוס: ממתין לאחר MVP**

- יצירה ובדיקה מעשית של Skill ל-Feature Spec.
- בדיקת Context7; דרישת הקורס היא CLI ו-Skills, לא MCP Server.
- התקנות/התחברויות רק לאחר אימות הוראות ואישור הנדרש.

## שלב ו — Legacy Support ו-Build Your Own Workflow

**סטטוס: ממתין לאחר MVP; ניתן להקים עותק מבודד מקוד הפרויקט**

- בידוד פרויקט Legacy, Reverse Engineering, TODO, README ומסמכי Constitution.
- Feature Spec ומימוש Feedback Form; אין לשנות את Agent Clinic.
- נדרש מקור Legacy זמין לפני ביצוע; Commit/Merge באישור בלבד.

## שלב ז — הרחבות רשות וניידות בין סוכנים

**סטטוס: ממתין; הרחבות אינן חלק מה-MVP**

- GitHub Spec Kit, OpenSpec ו-Research Backlog.
- Codex, OpenCode ו-ACP Registry.
- אין התקנה או שינוי מערכת לפני הצגת ההשפעה וקבלת אישור.

## מקורות והחלטות תכולה

- מקור קורס: [מאגר הקבצים הרשמי של DeepLearning.AI](https://github.com/https-deeplearning-ai/sc-spec-driven-development-files),
  בפרט `Video09_Project_Replanning`, `Video10_The_second_feature_phase`,
  `Video11_The_MVP`, `Video12_Legacy_support`,
  `Video13_Build_your_own_workflow` ו-`Video14_Agents_replaceability`.
- מקור הקורס מאשר את Agents & Ailments ואת איחוד שלבי Layout/Agent List/Detail/
  Ailments; התוכן ימומש רק כאתגרי AI בדיוניים, לא כמעקב רפואי.
- הצהרת המשימה הקיימת, שאושרה קודם, מתמקדת ברווחה לאנשים עובדים. עדכון זה
  משמר אותה; Agents/Ailments ייחשבו לתוכן לימודי בדיוני בלבד, והקשר ביניהם
  יתועד במפרט לפני מימוש. לא יישמרו מחלות או נתוני בריאות של אנשים.
- Driver ל-SQLite וגרסת Pico נבחרו במפרט Phase 2 ונעשה בהם שימוש במימוש.

</div>
