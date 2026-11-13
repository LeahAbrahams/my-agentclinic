import type { Therapy } from "../../types/therapy.js";

export const therapies: Therapy[] = [
  {
    id: "therapy-prompt-review",
    name: "בדיקת מסלול",
    description: "סקירת שלבי ההנחיה כדי לזהות היכן הסוכן חוזר לנקודת ההתחלה.",
  },
  {
    id: "therapy-api-map",
    name: "מפת API",
    description: "השוואת נקודות הקצה שבשימוש לתיעוד ולנתיבים הקיימים.",
  },
  {
    id: "therapy-json-shaping",
    name: "עיצוב JSON",
    description: "תרגול מבנה התשובה מול החוזה ובדיקת שדות חסרים.",
  },
  {
    id: "therapy-cache-refresh",
    name: "רענון מטמון",
    description: "בדיקת תוקף המידע ושחזור תשובה עדכנית ממקור הנתונים.",
  },
  {
    id: "therapy-error-trace",
    name: "מעקב שגיאה",
    description: "איתור שלב הכשל ביומן טכני וצמצום מסלול השחזור.",
  },
];
