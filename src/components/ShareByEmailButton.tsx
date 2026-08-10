"use client";

import { siteConfig } from "@/config/site";

function getSharePageUrl() {
  return siteConfig.publicSiteUrl ?? window.location.href;
}

function buildGmailComposeUrl(pageUrl: string) {
  const subject = siteConfig.shareLinkName;
  const body = siteConfig.shareEmailBody
    .replace("{url}", pageUrl)
    .replace("{couple}", siteConfig.weddingTitle)
    .replace("{date}", siteConfig.hebrewDateLabel);

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function ShareByEmailButton() {
  function handleClick() {
    const url = buildGmailComposeUrl(getSharePageUrl());
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      className="share-gmail-btn"
      onClick={handleClick}
      aria-label="שיתוף הקישור ב-Gmail"
      title="שיתוף ב-Gmail"
    >
      <span className="share-gmail-btn__icon" aria-hidden="true">
        ✉️
      </span>
      <span className="share-gmail-btn__label">שתף ב-Gmail</span>
    </button>
  );
}
