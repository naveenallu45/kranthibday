import { motion } from 'framer-motion'

const HEART =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

export default function ContinueButton({
  onClick,
  label = 'Continue',
  sublabel,
  delay = 0,
  variant = 'primary',
  className = '',
}) {
  const base =
    'relative inline-flex flex-col items-center gap-1 rounded-full px-10 py-4 transition-shadow duration-500'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-rose-500/90 via-pink-500/90 to-purple-600/90 text-white ring-1 ring-rose-300/40 hover:shadow-[0_0_40px_rgba(244,114,182,0.4)]'
      : 'glass-card text-pink-300 hover:text-pink-200'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="flex items-center gap-2.5 text-sm font-medium tracking-wide">
        <motion.svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 fill-current opacity-80"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d={HEART} />
        </motion.svg>
        {label}
        <motion.svg
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </motion.svg>
      </span>
      {sublabel && (
        <span className="text-[11px] font-normal tracking-widest uppercase opacity-70">
          {sublabel}
        </span>
      )}
      <motion.span
        className="absolute inset-0 rounded-full ring-1 ring-rose-300/50"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.button>
  )
}
