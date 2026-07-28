export function PartyPopperIllustration() {
  return (
    <svg
      className="party-popper-svg"
      viewBox="0 0 110 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="popper-cone" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="35%" stopColor="#ff6bcb" />
          <stop offset="70%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#40c4ff" />
        </linearGradient>
        <linearGradient id="popper-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffe566" />
          <stop offset="50%" stopColor="#fff9c4" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        <filter id="popper-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ff6bcb" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#popper-glow)">
        {/* confetti burst — festive explosion from top */}
        <rect x="18" y="2" width="7" height="4" rx="1" fill="#ffd700" transform="rotate(-35 21 4)" />
        <rect x="72" y="4" width="6" height="4" rx="1" fill="#ff6bcb" transform="rotate(40 75 6)" />
        <rect x="48" y="0" width="8" height="5" rx="1" fill="#40c4ff" transform="rotate(5 52 2)" />
        <circle cx="30" cy="14" r="3.5" fill="#7bed9f" />
        <circle cx="78" cy="16" r="3" fill="#ffd700" />
        <circle cx="55" cy="8" r="4" fill="#ff4757" />
        <rect x="62" y="18" width="5" height="3" rx="1" fill="#e056fd" transform="rotate(25 64 19)" />
        <rect x="36" y="20" width="6" height="3" rx="1" fill="#ffa502" transform="rotate(-20 39 21)" />
        <path d="M55 12 L58 2 L61 12 Z" fill="#ffe066" />
        <path d="M42 10 L44 3 L47 11 Z" fill="#ff9ff3" />
        <path d="M66 11 L69 4 L72 12 Z" fill="#7bed9f" />

        {/* sparkle stars */}
        <text x="22" y="8" fontSize="10" fill="#ffd700">
          ✦
        </text>
        <text x="82" y="10" fontSize="9" fill="#ff6bcb">
          ✦
        </text>

        {/* gold rim / opening */}
        <ellipse cx="55" cy="36" rx="18" ry="7" fill="url(#popper-rim)" stroke="#ffb300" strokeWidth="1.5" />
        <ellipse cx="55" cy="35" rx="12" ry="4" fill="#fff8e1" opacity="0.7" />

        {/* festive cone body */}
        <path
          d="M28 118 Q22 80, 37 44 L55 36 L73 44 Q88 80, 82 118 Q55 128, 28 118 Z"
          fill="url(#popper-cone)"
        />

        {/* shiny highlight */}
        <path
          d="M38 110 Q34 75, 44 50 L48 48 Q40 72, 42 108 Z"
          fill="#ffffff"
          opacity="0.28"
        />

        {/* festive stripes */}
        <path d="M32 95 Q55 102, 78 95" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        <path d="M30 78 Q55 86, 80 78" stroke="#ffe066" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        <path d="M32 62 Q55 70, 78 62" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

        {/* bottom base */}
        <ellipse cx="55" cy="118" rx="28" ry="8" fill="#e040fb" opacity="0.85" />
        <ellipse cx="55" cy="116" rx="24" ry="6" fill="#ffd700" opacity="0.6" />

        {/* center badge — star */}
        <circle cx="55" cy="88" r="16" fill="#ffffff" fillOpacity="0.92" stroke="#ffd700" strokeWidth="2.5" />
        <path
          d="M55 78 L58 86 L66 86 L59.5 91 L62 99 L55 94 L48 99 L50.5 91 L44 86 L52 86 Z"
          fill="#ffd700"
        />
      </g>
    </svg>
  );
}
