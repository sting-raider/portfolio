export function CrabMark({ title }: { title?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">
        <ellipse cx="32" cy="30" rx="15" ry="10" />
        <rect x="23.4" y="10" width="3" height="10" rx="1.5" />
        <rect x="37.6" y="10" width="3" height="10" rx="1.5" />
        <circle cx="24.9" cy="8.4" r="4.4" />
        <circle cx="39.1" cy="8.4" r="4.4" />
        <path d="M18.5 25 6.8 16.4a3.2 3.2 0 0 1 3.5-5.3l11.6 8.6a3.2 3.2 0 0 1-3.4 5.3Z" />
        <path d="M45.5 25l11.7-8.6a3.2 3.2 0 0 0-3.5-5.3L42.1 19.7a3.2 3.2 0 0 0 3.4 5.3Z" />
        <rect x="12" y="36" width="9" height="2.6" rx="1.3" transform="rotate(24 12 36)" />
        <rect x="43" y="36" width="9" height="2.6" rx="1.3" transform="rotate(-24 52 36)" />
      </g>
      <circle cx="24.9" cy="8.4" r="1.7" fill="var(--bg)" />
      <circle cx="39.1" cy="8.4" r="1.7" fill="var(--bg)" />
    </svg>
  )
}

export function CrabActor({ onDone }: { onDone: () => void }) {
  return (
    <div className="crab-actor" aria-hidden="true" onAnimationEnd={onDone}>
      <CrabMark />
    </div>
  )
}
