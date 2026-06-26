import { useMemo } from 'react'
import { motion } from 'framer-motion'

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

function seededRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export default function FloatingHearts({ count = 12, intensity = 'normal' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = seededRandom(i + 1)
        const r2 = seededRandom(i + 11)
        const r3 = seededRandom(i + 21)
        const r4 = seededRandom(i + 31)
        const r5 = seededRandom(i + 41)
        return {
          id: i,
          left: `${r1 * 100}%`,
          size: r2 * 12 + (intensity === 'high' ? 12 : 8),
          duration: r3 * 8 + (intensity === 'high' ? 14 : 18),
          delay: r4 * 8,
          opacity: r5 * 0.25 + (intensity === 'high' ? 0.3 : 0.18),
          color:
            i % 3 === 0 ? 'text-rose-300/45' : i % 3 === 1 ? 'text-pink-400/50' : 'text-amber-200/35',
        }
      }),
    [count, intensity],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.svg
          key={heart.id}
          viewBox="0 0 24 24"
          width={heart.size}
          height={heart.size}
          className={`absolute gpu-layer ${heart.color}`}
          style={{ left: heart.left, bottom: '-5%' }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-110vh',
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, 8, -8, 0],
            x: [0, 6, -4, 0],
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
