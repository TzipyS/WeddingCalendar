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

function WishCard({
  author,
  message,
  dateTime,
  onDelete,
  deleting,
  canDelete,
}: {
  author: string;
  message: string;
  dateTime?: string;
  onDelete?: () => void;
  deleting?: boolean;
  canDelete?: boolean;
}) {
  return (
    <li className="wish-card group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg text-burgundy">{author}</p>
          <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-burgundy/85">
            {message}
          </p>
          {dateTime && (
            <time className="mt-3 block text-xs text-burgundy/40" dateTime={dateTime}>
              {formatHebrewDate(dateTime)}
            </time>
          )}
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting || !canDelete}
            className="shrink-0 rounded-lg px-2 py-1 text-xs text-burgundy/40 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:opacity-30"
            aria-label="מחיקת ברכה"
          >
            {deleting ? "..." : "מחק"}
          </button>
        )}
      </div>
    </li>
  );
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

  const latestWishes = wishes.slice(0, 2);
  const olderWishes = wishes.slice(2);

  return (
    <section className="wishes-section">
      <h2 className="wishes-section-title">ברכות ואיחולים</h2>
      <div className="festive-divider" aria-hidden="true" />

      {/* שתי הברכות האחרונות */}
      {loading ? (
        <div className="mt-8 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="wish-card animate-pulse opacity-50">
              <div className="h-4 w-24 rounded bg-burgundy/10" />
              <div className="mt-3 h-3 w-full rounded bg-burgundy/10" />
              <div className="mt-2 h-3 w-2/3 rounded bg-burgundy/10" />
            </div>
          ))}
        </div>
      ) : latestWishes.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {latestWishes.map((wish) => (
            <WishCard
              key={wish.id}
              author={wish.author_name}
              message={wish.message}
              dateTime={wish.created_at}
              onDelete={() => handleDelete(wish.id)}
              deleting={deletingId === wish.id}
              canDelete={dbConfigured}
            />
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-center text-burgundy/50">עדיין אין ברכות — היו הראשונים לכתוב!</p>
      )}

      {/* טופס שליחת ברכה */}
      <div className="mt-12">
        <h3 className="wish-form-heading">לשליחת ברכה</h3>
        <div className="festive-divider mb-6" aria-hidden="true" />
        <WishForm onSubmit={handleSubmit} disabled={!dbConfigured} />
      </div>

      {!dbConfigured && (
        <div className="mt-6 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          חיבור למסד הנתונים טרם הוגדר. ראו README להגדרת Supabase.
        </div>
      )}

      {/* שאר הברכות */}
      {!loading && olderWishes.length > 0 && (
        <div className="mt-12">
          <h3 className="wishes-all-title">כל הברכות</h3>
          <div className="festive-divider mb-6" aria-hidden="true" />
          <ul className="space-y-4">
            {olderWishes.map((wish) => (
              <WishCard
                key={wish.id}
                author={wish.author_name}
                message={wish.message}
                dateTime={wish.created_at}
                onDelete={() => handleDelete(wish.id)}
                deleting={deletingId === wish.id}
                canDelete={dbConfigured}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
