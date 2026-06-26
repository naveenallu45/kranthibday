import { useMemo } from 'react'
import { motion } from 'framer-motion'
import ContinueButton from '../components/ContinueButton'
import { LETTER_CONTENT } from '../utils/constants'
import { smoothEase } from '../utils/motion'

function seededRandom(seed) {
  const x = Math.sin(seed * 7777) * 10000
  return x - Math.floor(x)
}

function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${5 + seededRandom(i) * 90}%`,
        delay: seededRandom(i + 10) * 6,
        duration: seededRandom(i + 20) * 4 + 14,
        size: seededRandom(i + 30) * 12 + 8,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute bg-gradient-to-br from-rose-200/35 to-pink-300/20"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.5,
            top: '-5%',
            borderRadius: '50% 0 50% 50%',
          }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, 18, -10, 5],
            rotate: [0, 160, 320],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function WaxSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 1, ease: smoothEase }}
      className="absolute -bottom-5 -right-3 flex h-16 w-16 items-center justify-center sm:-right-5 sm:h-20 sm:w-20"
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-lg ring-2 ring-rose-400/30">
        <svg className="h-7 w-7 text-rose-200/90 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </motion.div>
  )
}

export default function LetterPage({ onNext }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: smoothEase }}
        className="mb-8 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-rose-300/70">
          Words I Have Carried in My Heart
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white glow-text sm:text-4xl">
          A Letter for You, Amma
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1.1, ease: smoothEase }}
        className="relative w-full max-w-2xl"
      >
        <FloatingPetals />
        <WaxSeal />

        <div className="paper-texture relative rounded-sm px-8 py-10 shadow-2xl sm:px-12 sm:py-14">
          <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />

          <p className="font-[family-name:var(--font-handwriting)] text-3xl font-semibold text-stone-700 sm:text-4xl">
            {LETTER_CONTENT.greeting}
          </p>

          <div className="mt-7 space-y-6">
            {LETTER_CONTENT.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.2, duration: 0.9, ease: smoothEase }}
                className="font-[family-name:var(--font-handwriting)] text-xl leading-relaxed text-stone-600 sm:text-2xl"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1, ease: smoothEase }}
            className="mt-12 border-t border-rose-200/60 pt-8 text-right"
          >
            <p className="font-[family-name:var(--font-handwriting)] text-xl text-stone-500 sm:text-2xl">
              {LETTER_CONTENT.closing}
            </p>
            <p className="mt-3 font-[family-name:var(--font-handwriting)] text-4xl font-bold text-rose-600 sm:text-5xl">
              {LETTER_CONTENT.signature}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-14">
        <ContinueButton
          onClick={onNext}
          label="One Last Surprise for You"
          sublabel="just for you, Amma"
          delay={2.2}
        />
      </div>
    </div>
  )
}
