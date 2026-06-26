import { motion } from 'framer-motion'

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

export default function FloatingHearts({ count = 12, intensity = 'normal' }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 14 + (intensity === 'high' ? 14 : 10),
    duration: Math.random() * 10 + (intensity === 'high' ? 8 : 12),
    delay: Math.random() * 6,
    opacity: Math.random() * 0.35 + (intensity === 'high' ? 0.35 : 0.2),
    color: i % 3 === 0 ? 'text-rose-300/50' : i % 3 === 1 ? 'text-pink-400/55' : 'text-amber-200/40',
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.svg
          key={heart.id}
          viewBox="0 0 24 24"
          width={heart.size}
          height={heart.size}
          className={`absolute ${heart.color}`}
          style={{ left: heart.left, bottom: '-5%' }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '-110vh',
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, 12, -12, 0],
            x: [0, 8, -6, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          fill="currentColor"
        >
          <path d={HEART_PATH} />
        </motion.svg>
      ))}
    </div>
  )
}
