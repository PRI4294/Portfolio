import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic.js'

/**
 * Button (or anchor) that subtly pulls toward the cursor.
 *  - primary   : violet → cyan gradient with refined glow
 *  - secondary : glass with hover-cyan border
 *  - ghost     : text only
 */
const variants = {
  primary:
    'text-white bg-gradient-to-r from-violet via-violet to-cyan ' +
    'border border-white/10 ' +
    'shadow-[0_8px_30px_-8px_rgba(124,58,237,0.5)] ' +
    'hover:shadow-[0_10px_40px_-6px_rgba(34,211,238,0.55)]',
  secondary:
    'text-white bg-bg-card/85 backdrop-blur-md ' +
    'border border-violet/30 ' +
    'shadow-[0_4px_20px_-8px_rgba(124,58,237,0.40)] ' +
    'hover:border-cyan/60 hover:bg-bg-card/95 ' +
    'hover:shadow-[0_8px_30px_-8px_rgba(34,211,238,0.55)]',
  ghost:
    'text-slate-300 hover:text-white',
}

export const MagneticButton = forwardRef(function MagneticButton(
  {
    as: Tag = 'a',
    variant = 'primary',
    children,
    className = '',
    icon: Icon,
    iconRight: IconRight,
    href,
    onClick,
    type,
    ...rest
  },
  _refIgnored,
) {
  const magnetRef = useMagnetic({ strength: 0.2, radius: 60 })

  const base =
    'group relative inline-flex items-center justify-center gap-2 ' +
    'px-6 py-3 rounded-xl ' +
    'font-semibold text-[0.82rem] tracking-tight ' +
    'overflow-hidden glow-btn ' +
    'transition-[box-shadow,background,border-color,transform] duration-300 select-none'

  return (
    <Tag
      ref={magnetRef}
      data-magnetic
      href={href}
      onClick={onClick}
      type={type}
      className={`${base} ${variants[variant] ?? ''} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={15} className="opacity-90 relative z-10" />}
      <span className="relative z-10">{children}</span>
      {IconRight && (
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          className="opacity-90 relative z-10"
        >
          <IconRight size={15} />
        </motion.span>
      )}
    </Tag>
  )
})
