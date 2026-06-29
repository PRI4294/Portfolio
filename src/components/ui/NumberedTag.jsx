/**
 * Editorial _01 / _02 / _03 style label used on Projects.
 */
export function NumberedTag({ number, accent = '#22d3ee' }) {
  const padded = String(number).padStart(2, '0')
  return (
    <span
      className="font-mono text-xs tracking-widest opacity-80"
      style={{ color: accent }}
    >
      _{padded}
    </span>
  )
}
