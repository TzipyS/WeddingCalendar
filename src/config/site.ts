export const siteConfig = {
  /** שמות הזוג */
  coupleNames: "אסתי&זאבי",
  /** כותרת החתונה */
  weddingTitle: "אסתי & זאבי !!!",
  /** כותרת משנה */
  subtitle: "סופרים את הימים לחתונה הגדולה",
  /** יום בחודש העברי */
  kislevDay: 14,
  /** שנה עברית (למשל תשפ\"ז = 5787) */
  hebrewYear: 5787,
  /** תווית לתאריך העברי — מוצגת בעמוד */
  hebrewDateLabel: 'י"ד בכסליו תשפ"ז',
  /** שם הקישור בשיתוף (מייל, תצוגה מקדימה) */
  shareLinkName: "החתונה מתקרבת!!!",
  /** כתובת האתר לשיתוף (תמיד תישלח בקישור, גם מ-localhost) */
  publicSiteUrl: "https://wedding-pndb.vercel.app/",
  /** מוזיקת רקע — שימו קובץ MP3 בתיקיית public/ (למשל music.mp3). null לביטול */
  backgroundMusicSrc: "/music.mp3" as string | null,
} as const;
