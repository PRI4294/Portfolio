import { motion } from 'framer-motion'

/**
 * Full-screen loader — neural net SVG draws itself in,
 * then the bar fills, then App.jsx swaps it out.
 */
export default function Loader({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-bg-base"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      {/* Animated neural-net mark */}
      <motion.svg
        viewBox="0 0 80 80"
        width={80}
        height={80}
        className="mb-7"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <defs>
          <linearGradient id="ld-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {[
          ['n1','n4'],['n1','n5'],['n1','n6'],
          ['n2','n4'],['n2','n5'],['n2','n6'],
          ['n3','n4'],['n3','n5'],['n3','n6'],
          ['n4','n7'],['n5','n7'],['n6','n7'],
        ].map(([from, to], i) => {
          const pts = {
            n1: [14, 20], n2: [14, 40], n3: [14, 60],
            n4: [40, 22], n5: [40, 40], n6: [40, 58],
            n7: [66, 40],
          }
          const [x1,y1] = pts[from], [x2,y2] = pts[to]
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#ld-grad)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.04 }}
            />
          )
        })}

        {/* Nodes */}
        {[
          [14,20],[14,40],[14,60],
          [40,22],[40,40],[40,58],
          [66,40],
        ].map(([cx,cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx} cy={cy} r={3}
            fill="url(#ld-grad)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.15 + i * 0.04 }}
          />
        ))}
      </motion.svg>

      <motion.p
        className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Initialising Portfolio
      </motion.p>

      <div className="w-56 h-[3px] bg-bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
            boxShadow: '0 0 14px rgba(34,211,238,0.7)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.7, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  )
}
