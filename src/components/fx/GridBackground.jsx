/**
 * Subtle dotted-grid background overlay.
 * Place inside a `relative` parent — fills it absolutely.
 */
export function GridBackground({ className = '', fade = true }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-dot-grid ${className}`}
      style={
        fade
          ? {
              maskImage:
                'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 75%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 75%)',
            }
          : undefined
      }
    />
  )
}
