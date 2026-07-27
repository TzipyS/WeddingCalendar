# לוח ספירה עברי לחתונה

אתר אלגנטי לספירת ימים עד **י"ד בכסליו**, עם קיר איחולים שכל מי שמקבל את הקישור יכול לכתוב בו, לראות ולמחוק ברכות.

## התאמה אישית

ערכו את `src/config/site.ts`:

```ts
export const siteConfig = {
  coupleNames: "ישראל ושרה",      // שמות הזוג
  subtitle: "מספרים את הימים...",
  kislevDay: 14,
  hebrewYear: 5787,               // תשפ"ז
  hebrewDateLabel: 'י"ד בכסליו תשפ"ז',
};
```

## הרצה מקומית

```bash
npm install
cp .env.example .env.local
# מלאו את מפתחות Supabase ב-.env.local
npm run dev
```

פתחו [http://localhost:3000](http://localhost:3000)

## הגדרת Supabase (חינם)

1. צרו חשבון ב-[supabase.com](https://supabase.com)
2. **New Project** → בחרו שם וסיסמה
3. ב-**SQL Editor** → הריצו את `supabase/schema.sql`
4. ב-**Settings → API** העתיקו:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. שימו את הערכים ב-`.env.local`

## העלאה ל-Vercel (ענן)

1. דחפו את הפרויקט ל-GitHub
2. היכנסו ל-[vercel.com](https://vercel.com) → **Import Project**
3. ב-**Environment Variables** הוסיפו:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** — תקבלו קישור כמו `https://your-app.vercel.app`

### דומיין משלך (אופציונלי)

ב-Vercel: **Settings → Domains** → הוסיפו דומיין.

## מבנה

| קובץ | תפקיד |
|------|--------|
| `src/config/site.ts` | שמות, תאריך עברי |
| `src/lib/hebrew-date.ts` | חישוב ספירה עם `@hebcal/core` |
| `src/components/Countdown.tsx` | תצוגת הספירה |
| `src/components/WishesWall.tsx` | קיר ברכות |
| `src/app/api/wishes/route.ts` | API לברכות |
| `supabase/schema.sql` | טבלת מסד נתונים |

## הערות

- **מחיקה פתוחה:** כל מי עם הקישור יכול למחוק כל ברכה. אם תרצו להגביל — עדכנו את מדיניות RLS ב-Supabase.
- **עדכון בזמן אמת:** הברכות מתרעננות כל 15 שניות אוטומטית.
