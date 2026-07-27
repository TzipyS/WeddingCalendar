"use client";

import { useCallback, useEffect, useState } from "react";
import type { Wish } from "@/types/wish";
import { WishForm } from "./WishForm";

function formatHebrewDate(iso: string) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "שגיאה בטעינת ברכות");
      }

      setDbConfigured(data.configured !== false);
      setWishes(data.wishes ?? []);
    } catch {
      setWishes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 15000);
    return () => clearInterval(interval);
  }, [fetchWishes]);

  async function handleSubmit(authorName: string, message: string) {
    const res = await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author_name: authorName, message }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "שגיאה בשליחה");
    }
    setWishes((prev) => [data.wish, ...prev]);
  }

  async function handleDelete(id: string) {
    if (!confirm("למחוק את הברכה הזו?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/wishes?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "שגיאה במחיקה");
      }
      setWishes((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "שגיאה במחיקה");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="wishes-section">
      <WishForm onSubmit={handleSubmit} disabled={!dbConfigured} />

      {!dbConfigured && (
        <div className="mt-6 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          חיבור למסד הנתונים טרם הוגדר. ראו README להגדרת Supabase.
        </div>
      )}

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-burgundy">קיר האיחולים</h2>
          <span className="text-sm text-burgundy/50">
            {wishes.length} {wishes.length === 1 ? "ברכה" : "ברכות"}
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="wish-card animate-pulse opacity-50">
                <div className="h-4 w-24 rounded bg-burgundy/10" />
                <div className="mt-3 h-3 w-full rounded bg-burgundy/10" />
                <div className="mt-2 h-3 w-2/3 rounded bg-burgundy/10" />
              </div>
            ))}
          </div>
        ) : wishes.length === 0 ? (
          <div className="wish-card text-center text-burgundy/50">
            <p>עדיין אין ברכות — היו הראשונים לכתוב!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {wishes.map((wish) => (
              <li key={wish.id} className="wish-card group">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg text-burgundy">{wish.author_name}</p>
                    <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-burgundy/85">
                      {wish.message}
                    </p>
                    <time
                      className="mt-3 block text-xs text-burgundy/40"
                      dateTime={wish.created_at}
                    >
                      {formatHebrewDate(wish.created_at)}
                    </time>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(wish.id)}
                    disabled={deletingId === wish.id || !dbConfigured}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs text-burgundy/40 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:opacity-30"
                    aria-label="מחיקת ברכה"
                  >
                    {deletingId === wish.id ? "..." : "מחק"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
