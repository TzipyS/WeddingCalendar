"use client";

import { FormEvent, useState } from "react";

type WishFormProps = {
  onSubmit: (authorName: string, message: string) => Promise<void>;
  disabled?: boolean;
};

export function WishForm({ onSubmit, disabled }: WishFormProps) {
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = authorName.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("נא למלא שם וברכה");
      return;
    }

    if (trimmedMessage.length > 500) {
      setError("הברכה ארוכה מדי (עד 500 תווים)");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(trimmedName, trimmedMessage);
      setAuthorName("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בשליחת הברכה");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="wish-form">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-burgundy/80">השם שלכם</span>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="למשל: משפחת כהן"
            maxLength={80}
            disabled={disabled || submitting}
            className="wish-input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-burgundy/80">הברכה שלכם</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="מזל טוב! שתזכו לבנות בית נאמן בישראל..."
            rows={4}
            maxLength={500}
            disabled={disabled || submitting}
            className="wish-input resize-none"
          />
        </label>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled || submitting}
        className="btn-gold mt-6 w-full rounded-full px-6 py-3.5 text-base"
      >
        {submitting ? "שולח..." : "שליחת ברכה"}
      </button>
    </form>
  );
}
