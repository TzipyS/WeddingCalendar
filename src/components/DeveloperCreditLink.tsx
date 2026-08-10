import { siteConfig } from "@/config/site";

function buildLeadsGmailUrl() {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    su: siteConfig.developerLeadsSubject,
  });

  if (siteConfig.developerEmail) {
    params.set("to", siteConfig.developerEmail);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function DeveloperCreditLink() {
  return (
    <a
      href={buildLeadsGmailUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="developer-credit-link"
      aria-label="פנייה ל-TzipyS — פיתוח ועיצוב"
      title="פנייה לפיתוח ועיצוב"
    >
      <span>כל הזכויות שמורות</span>
      <span className="developer-credit-link__sep" aria-hidden="true">
        •
      </span>
      <span>© TzipyS</span>
      <span className="developer-credit-link__sep" aria-hidden="true">
        •
      </span>
      <span>פיתוח ועיצוב</span>
    </a>
  );
}
