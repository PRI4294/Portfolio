import { techIcons } from '../../data/skills.js'

/**
 * Tech-stack chip with an inline SVG logo and label.
 * `accent` controls the hover glow color.
 */
export function TechPill({ name, icon, accent = '#22d3ee', size = 'md' }) {
  const iconPath = icon ? techIcons[icon] : null
  const padding = size === 'sm' ? 'px-2.5 py-1.5 text-[0.68rem]' : 'px-3 py-2 text-xs'
  const iconSize = size === 'sm' ? 12 : 14

  return (
    <span
      className={`tech-pill ${padding}`}
      style={{
        '--accent': accent,
        boxShadow: 'none',
      }}
    >
      {iconPath ? (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: accent }}
          aria-hidden="true"
        >
          <path d={iconPath} />
        </svg>
      ) : (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: accent }}
        />
      )}
      {name}
    </span>
  )
}
