<div dir="rtl">

# Agent Clinic — מבצע: שגרה בריאה

## על הפרויקט

Agent Clinic הוא רעיון לאפליקציית ווב בעברית שמציעה לאנשים עובדים רעיונות
מעשיים לכושר ולארוחות בריאות. העיצוב נקי ומזמין, עם רמזים עדינים לעולם
סוכנויות הביון והומור מכבד.

במסגרת קורס Spec-Driven Development הפרויקט מדגים מרפאה טכנית בדיונית
לסוכני AI: קטלוג סוכנים, תקלות תוכנה, פעולות תמיכה, בקשות שירות ולוח צוות.
התוכן אינו מתאר מטופלים או מחלות אנושיות. חזון הרווחה המקורי נשמר להמשך;
אין אבחון, ייעוץ רפואי או נתוני בריאות אישיים.

## מצב המימוש

היישום כולל דף בית, קטלוג סוכנים, פרופיל סוכן, קטלוג תקלות ופעולות תמיכה,
טופס ואישור בקשת שירות ולוח צוות מקומי. דפי ה-HTML מרונדרים בצד השרת ב-Hono
וב-Hono JSX, בעברית ובכיוון RTL. נתוני הדוגמה נשמרים ב-SQLite מקומי, עם
מיגרציות SQL ו-seeds אידמפוטנטיים. Pico CSS וקובץ העיצוב מוגשים מקומית,
ללא CDN.

המימוש בענף `feature/mvp` כולל מיגרציות ושכבת נתונים, מסכי Therapies,
Appointments ו-Dashboard, בדיקות ייעודיות ועיצוב RTL רספונסיבי. הענף פורסם
לריפו GitHub של הפרויקט. בדוח Build של Vercel שהועבר ב-13 בנובמבר זוהתה
בעיית טיפוסים באימות מועד פגישה; הקוד תוקן ונוספה בדיקת קלט לתאריך לא תקין.
אימות הפריסה לאחר התיקון יופיע ב-[לוח המשימות](./TASKS.md) וב-
[דוח האימות](./runtime-validation-report.md).

## טכנולוגיות ודרישות סביבת פיתוח

- Node.js `24.13.0` (טווח נתמך: `>=24.13.0 <25`).
- TypeScript `6.0.3` במצב Strict.
- Hono `4.13.18`, מתאם Node `@hono/node-server` `2.1.8`, ו-Vitest `4.1.12`.
- SQLite דרך `better-sqlite3` `13.1.1`; Pico CSS `2.1.1`.
- הגרסאות הישירות נעולות ב-`package.json` וב-`package-lock.json`.

ב-Windows, בניית `better-sqlite3` עשויה לדרוש כלי C++ תואמים ו-Windows SDK.
בסביבת Linux של Vercel אין צורך בכלי Windows אלה.

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
| `/therapies` | קטלוג פעולות תמיכה טכניות |
| `/appointments/new?agentId=...` | בקשת פגישת שירות לסוכן |
| `/appointments/:id/confirmation` | אישור בקשת שירות |
| `/dashboard` | סיכום מקומי ועדכון מצב פגישות; ללא אימות משתמשים |
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
- [מפרט דרישות MVP](./specs/features/mvp/requirements.md)
- [תוכנית מימוש MVP](./specs/features/mvp/plan.md)
- [תוכנית אימות MVP](./specs/features/mvp/validation.md)
- [Skill ליצירת Feature Spec](./.claude/skills/feature-spec/SKILL.md)
- [יומן שינויים](./CHANGELOG.md)
- [Skill ליצירת CHANGELOG](./.claude/skills/changelog/SKILL.md)

</div>
