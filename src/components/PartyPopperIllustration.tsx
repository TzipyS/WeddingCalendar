export function PartyPopperIllustration() {
  return (
    <svg
      className="party-popper-svg"
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="popper-body" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="40%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7b2f" />
        </linearGradient>
        <linearGradient id="popper-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="popper-label" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff9ee" />
          <stop offset="50%" stopColor="#f5e6c8" />
          <stop offset="100%" stopColor="#e8d5a8" />
        </linearGradient>
        <linearGradient id="popper-gold-band" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="50%" stopColor="#ffe566" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <filter id="popper-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#4a1c2b" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#popper-shadow)">
        {/* confetti hints */}
        <rect x="38" y="4" width="6" height="3" rx="1" fill="#d4af37" transform="rotate(-30 41 5)" />
        <rect x="76" y="6" width="5" height="3" rx="1" fill="#d4899a" transform="rotate(35 78 7)" />
        <circle cx="52" cy="10" r="2.5" fill="#c9a962" />
        <circle cx="68" cy="8" r="2" fill="#4a1c2b" opacity="0.7" />
        <rect x="58" y="2" width="5" height="3" rx="1" fill="#e8d5a8" transform="rotate(10 60 3)" />

        {/* strings */}
        <path d="M54 22 C48 10, 42 4, 36 1" stroke="#fff9ee" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M66 22 C72 10, 78 4, 84 1" stroke="#f5ebe3" strokeWidth="2" strokeLinecap="round" />

        {/* neck */}
        <rect x="44" y="26" width="32" height="20" rx="5" fill="#8b2942" />
        <rect x="42" y="42" width="36" height="12" rx="4" fill="url(#popper-gold-band)" />

        {/* nozzle */}
        <ellipse cx="60" cy="26" rx="12" ry="6" fill="#4a1c2b" />
        <ellipse cx="60" cy="25" rx="7" ry="3" fill="#2d1219" />

        {/* body */}
        <path
          d="M36 52 Q32 98, 35 140 Q38 178, 50 190 Q60 198, 70 190 Q82 178, 85 140 Q88 98, 84 52 Z"
          fill="url(#popper-body)"
        />
        <path
          d="M36 52 Q32 98, 35 140 Q38 178, 50 190 Q60 198, 70 190 Q82 178, 85 140 Q88 98, 84 52 Z"
          fill="url(#popper-shine)"
        />

        {/* label */}
        <rect x="34" y="96" width="52" height="58" rx="8" fill="url(#popper-label)" stroke="#d4af37" strokeWidth="2" />
        <text
          x="60"
          y="118"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="11"
          fontWeight="700"
          fill="#4a1c2b"
        >
          PARTY
        </text>
        <text
          x="60"
          y="136"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="11"
          fontWeight="700"
          fill="#9a7b2f"
        >
          POPPER
        </text>
        <path d="M44 148 L60 142 L76 148" stroke="#d4af37" strokeWidth="1.5" fill="none" />

        {/* base ring */}
        <ellipse cx="60" cy="190" rx="30" ry="8" fill="#4a1c2b" opacity="0.25" />
      </g>
    </svg>
  );
}
