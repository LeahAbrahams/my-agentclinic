import type { Ailment } from "../../types/ailment.js";

export const ailments: Ailment[] = [
  {
    id: "ailment-loopback",
    name: "לולאת מחשבה אינסופית",
    description: "הסוכן חוזר שוב ושוב לאותה נקודה במקום להשלים את המשימה.",
  },
  {
    id: "ailment-hallucinated-endpoint",
    name: "נקודת קצה מדומיינת",
    description: "הסוכן מפנה למסלול API שלא קיים במערכת.",
  },
  {
    id: "ailment-json-allergy",
    name: "אלרגיה ל-JSON",
    description: "הסוכן מתקשה להחזיר JSON תקין לפי החוזה.",
  },
  {
    id: "ailment-cache-split",
    name: "פיצול זהות במטמון",
    description: "תשובות ישנות נשמרות במטמון ומוצגות כאילו הן עדכניות.",
  },
  {
    id: "ailment-status-500",
    name: "תסמונת 500",
    description: "תקלה פנימית גורמת לשרת להחזיר שגיאה במקום תוצאה.",
  },
];
