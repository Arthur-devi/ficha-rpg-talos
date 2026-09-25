const ICONS = {
  dice: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 9h16M8 13h2M12 13h2M16 13h1M8 16h2M12 16h2" />
    </>
  ),
  reset: (
    <>
      <path d="M5 8V4m0 0h4M5 4l3 3" />
      <path d="M5.7 8A7 7 0 112 13" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V5M16 20v-7M22 20H2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2l1.4 5.1L18 9l-4.6 1.9L12 16l-1.4-5.1L6 9l4.6-1.9L12 2z" />
      <path d="M18.5 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3z" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21M12 3C9.5 5.5 8.2 8.5 8.2 12S9.5 18.5 12 21" />
    </>
  ),
  movement: (
    <>
      <path d="M4 12h16M16 8l4 4-4 4" />
      <path d="M8 5l-4 4 4 4" />
    </>
  ),
  ruler: (
    <>
      <path d="M4 18L18 4l2 2L6 20l-2-2z" />
      <path d="M14 8l2 2M11 11l2 2M8 14l2 2" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A3.5 3.5 0 017.5 2H12v18H7.5A3.5 3.5 0 004 23V5.5z" />
      <path d="M20 5.5A3.5 3.5 0 0016.5 2H12v18h4.5A3.5 3.5 0 0120 23V5.5z" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M8 14c-1.3-1-2-2.5-2-4a6 6 0 0112 0c0 1.5-.7 3-2 4-1 .8-1.3 1.5-1.5 2H9.5c-.2-.5-.5-1.2-1.5-2z" />
    </>
  ),
  run: (
    <>
      <circle cx="14" cy="5" r="2" />
      <path d="M9 21l2-6 2-3 3 3 3 1M7 11l4-3 3 2M13 12l-4 2-3 5" />
    </>
  ),
  walk: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M10 21l1-6-2-4 2-3 4 3M11 15l4 2 2 4M9 11l-4 3" />
    </>
  ),
  link: (
    <>
      <path d="M9 15l6-6" />
      <path d="M7 17H6a4 4 0 010-8h4M17 7h1a4 4 0 010 8h-4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l7 3v5c0 5-3 9-7 12-4-3-7-7-7-12V5l7-3z" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  money: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5c-.7-.9-1.9-1.5-3.3-1.5-1.8 0-3.2.9-3.2 2.2 0 3.3 6.5 1.4 6.5 4.7 0 1.4-1.5 2.4-3.5 2.4-1.5 0-2.8-.5-3.7-1.5M12 5.5v13" />
    </>
  ),
  box: (
    <>
      <path d="M4 7l8-4 8 4-8 4-8-4zM4 7v10l8 4 8-4V7M12 11v10" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  moon: (
    <path d="M19 15.5A7.5 7.5 0 018.5 5 8 8 0 1019 15.5z" />
  ),
  dna: (
    <>
      <path d="M7 3c0 6 10 12 10 18M17 3C17 9 7 15 7 21" />
      <path d="M9 6h6M8 10h8M8 14h8M9 18h6" />
    </>
  ),
  character: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" />
      <path d="M8.5 12.5c1 .7 2.2 1 3.5 1s2.5-.3 3.5-1" />
    </>
  ),
  attributes: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6v12M6 12h12" />
      <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" />
    </>
  ),
  combat: (
    <>
      <path d="M6 4l12 16M18 4L6 20" />
      <path d="M4.5 5.5L8 4l.2 3.7M19.5 5.5L16 4l-.2 3.7" />
      <path d="M4 19l3.2.8L8 16.5M20 19l-3.2.8-.8-3.3" />
    </>
  ),
  abilities: (
    <>
      <path d="M12 3l2.2 5.2L20 10l-4.4 3.8L17 20l-5-3-5 3 1.4-6.2L4 10l5.8-1.8L12 3z" />
    </>
  ),
  inventory: (
    <>
      <path d="M7 8h10l2 12H5L7 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
      <path d="M8.5 13h7" />
    </>
  ),
  powers: (
    <>
      <path d="M13 2L6.5 13H12l-1 9L18 10h-5l0-8z" />
    </>
  ),
  journal: (
    <>
      <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z" />
      <path d="M8 4v16M10.5 8H16M10.5 12H16" />
    </>
  ),
  import: (
    <>
      <path d="M4 19h16" />
      <path d="M12 3v11" />
      <path d="M8 10l4 4 4-4" />
    </>
  ),
  save: (
    <>
      <path d="M5 3h12l2 2v16H5V3z" />
      <path d="M8 3v6h8V3M8 21v-7h8v7" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-8.7-9C1.9 7.1 4.2 4 7.4 4c1.9 0 3.5 1 4.6 2.5C13.1 5 14.7 4 16.6 4c3.2 0 5.5 3.1 4.1 7-1.7 4.6-8.7 9-8.7 9z" />
  ),
  origin: (
    <>
      <path d="M12 3c3.8 0 7 3.2 7 7 0 5.3-7 11-7 11S5 15.3 5 10c0-3.8 3.2-7 7-7z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  vitality: (
    <>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
      <path d="M4.5 5.5c4-4 7.5 1 7.5 1s3.5-5 7.5-1c4.5 4.5-7.5 14.5-7.5 14.5S0 10 4.5 5.5z" />
    </>
  ),
  upgrade: (
    <>
      <path d="M12 20V5" />
      <path d="M7 10l5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  skills: (
    <>
      <path d="M4 5h16M4 10h16M4 15h16M4 20h10" />
      <circle cx="7" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  states: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 17h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.5v6" />
      <circle cx="12" cy="7.3" r=".75" fill="currentColor" stroke="none" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="8" rx="5" ry="2.5" />
      <path d="M4 8v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V8" />
      <path d="M10 14c.6 1.2 2.5 2 4.7 2 2.9 0 5.3-1.2 5.3-2.7V9.5c0-1.2-1.5-2.2-3.7-2.6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="M10 7l-5 5 5 5" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="M14 7l5 5-5 5" />
    </>
  ),
  engine: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </>
  ),
  progress: (
    <>
      <path d="M4 19V9M10 19V5M16 19V12M22 19H2" />
    </>
  ),
  rest: (
    <>
      <path d="M18 15.5A7.5 7.5 0 018.5 6 7.7 7.7 0 0018 15.5z" />
    </>
  ),
  map: (
    <>
      <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c.5-4 2.7-6 6-6s5.5 2 6 6M14 15c3.5-.5 6 1.2 7 5" />
    </>
  ),
  notes: (
    <>
      <path d="M5 3h14v18H5z" />
      <path d="M8 8h8M8 12h8M8 16h6" />
    </>
  ),
};

export default function TalosIcon({ name, size = 20, className = '', strokeWidth = 1.6, title }) {
  const glyph = ICONS[name] || ICONS.journal;
  return (
    <svg
      className={`talos-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {glyph}
    </svg>
  );
}
