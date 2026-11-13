<div dir="rtl">

# Agent Clinic — מבצע: שגרה בריאה

## על הפרויקט

Agent Clinic הוא רעיון לאפליקציית ווב בעברית שמציעה לאנשים עובדים רעיונות
מעשיים לכושר ולארוחות בריאות. העיצוב נקי ומזמין, עם רמזים עדינים לעולם
סוכנויות הביון והומור מכבד.

במסגרת קורס Spec-Driven Development נבנה כעת פיצ'ר לימודי בשם Agents and
Ailments: קטלוג של סוכני AI בדיוניים ותקלות תוכנה משעשעות. התוכן אינו מתאר
מטופלים או מחלות אנושיות. חזון הרווחה המקורי נשמר להמשך; אין אבחון, ייעוץ
רפואי או נתוני בריאות אישיים.

## מצב המימוש

היישום כולל דף בית, קטלוג סוכנים, פרופיל סוכן וקטלוג תקלות. דפי ה-HTML
מרונדרים בצד השרת ב-Hono וב-Hono JSX, בעברית ובכיוון RTL. נתוני הדוגמה
נשמרים ב-SQLite מקומי, עם מיגרציות SQL ו-seeds אידמפוטנטיים. Pico CSS וקובץ
העיצוב מוגשים מקומית, ללא CDN.

הפיצ'ר מומש ונבדק בעבר: 22 בדיקות אוטומטיות, TypeScript, Build, Seed,
Audit, בדיקות HTTP ובדיקת דפדפן ברוחבי 375px ו-1280px עברו. לאחר מכן ניסיון
התקנה נקייה נכשל בגלל כלי C++ חסרים ואי-תאימות זיהוי של Visual Studio 2026
ב-`node-gyp`. לכן `node_modules` חלקי, והבדיקות אינן ניתנות להרצה כרגע.
ההתקנה הנקייה והאימות שלאחריה **עדיין לא הושלמו**; הפרטים והצעדים הבאים
מתועדים ב-[לוח המשימות](./TASKS.md).

## טכנולוגיות ודרישות סביבת פיתוח

- Node.js `24.13.0` (טווח נתמך: `>=24.13.0 <25`).
- TypeScript `6.0.3` במצב Strict.
- Hono `4.13.18`, מתאם Node `@hono/node-server` `2.1.8`, ו-Vitest `4.1.12`.
- SQLite דרך `better-sqlite3` `13.1.1`; Pico CSS `2.1.1`.
- הגרסאות הישירות נעולות ב-`package.json` וב-`package-lock.json`.

ב-Windows, `better-sqlite3` מריץ בניית native בעת `npm ci`. נדרשים Visual
Studio 2022 Build Tools עם עומס העבודה **Desktop development with C++**,
רכיב **MSVC v143 x64/x86 build tools** ו-**Windows 10/11 SDK**. ה-`node-gyp`
שמצורף ל-npm בפרויקט הוא `11.4.2` ותומך בזיהוי Visual Studio 2019/2022, אך
אינו מזהה את Visual Studio 2026 שמותקן כרגע בסביבת הפיתוח. התקנת הכלים
חסרה היא פעולה במחשב ואינה מבוצעת אוטומטית בפרויקט.

## התקנה והרצה

לאחר התקנת דרישות סביבת הפיתוח:

```powershell
npm ci
npm run dev
```

שרת הפיתוח זמין בכתובת `http://localhost:3000/`. האתחול מפעיל את המיגרציות
ואת נתוני הדוגמה. אפשר להריץ seed ידני ואידמפוטנטי באמצעות `npm run seed`.
הקובץ המקומי `agentclinic.db` אינו נשמר ב-Git.

פקודות אימות:

```powershell
npm test
npm run typecheck
npm run build
npm audit
npm start
```

יש להריץ `npm run build` לפני `npm start`; פקודת `start` מפעילה את
ה-build שבתיקיית `dist`.

## נתיבים עיקריים

| נתיב | תוכן |
|---|---|
| `/` | דף הבית וקישורים לקטלוגים |
| `/agents` | רשימת סוכנים |
| `/agents/:id` | פרופיל סוכן ותקלות משויכות |
| `/ailments` | קטלוג תקלות תוכנה/AI |
| `/styles/pico.css`, `/styles.css` | נכסי CSS מקומיים |

## מסמכי הפרויקט

- [לוח המשימות](./TASKS.md)
- [הצהרת המשימה](./specs/mission.md)
- [מחסנית הטכנולוגיות וכללי הפיתוח](./specs/techstack.md)
- [מפת הדרכים](./specs/roadmap.md)
- [חוקת הפרויקט — טיוטה](./specs/constitution.md)
- [מפרט Agents and Ailments](./specs/features/agents-and-ailments/spec.md)
- [דרישות טכניות](./specs/features/agents-and-ailments/technical-requirements.md)
- [תוכנית Agents and Ailments](./specs/features/agents-and-ailments/plan.md)
- [תוכנית האימות](./specs/features/agents-and-ailments/validation.md)
- [דוח אימות ריצה](./runtime-validation-report.md)
- [יומן שינויים](./CHANGELOG.md)
- [Skill ליצירת CHANGELOG](./.claude/skills/changelog/SKILL.md)

</div>
