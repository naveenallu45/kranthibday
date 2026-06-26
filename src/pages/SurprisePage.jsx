import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'
import { useMusic } from '../components/MusicToggle'
import { MOTHER_NAME, SURPRISE_LINES } from '../utils/constants'
import { fireConfetti, fireConfettiBurst } from '../utils/confetti'

export default function SurprisePage({ onRestart }) {
  const { unmute } = useMusic()
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    fireConfettiBurst()
    const confettiInterval = setInterval(() => fireConfetti(2000), 4000)
    unmute()

    const lineInterval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % SURPRISE_LINES.length)
    }, 4500)

    return () => {
      clearInterval(confettiInterval)
      clearInterval(lineInterval)
    }
  }, [unmute])

  const handleReplay = useCallback(() => {
    fireConfettiBurst()
    unmute()
  }, [unmute])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts count={24} intensity="high" />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 40%, rgba(251,191,185,0.18) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 55%, rgba(244,114,182,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 60%, rgba(212,165,116,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 40%, rgba(251,191,185,0.18) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-rose-300/80 sm:text-sm"
          >
            For the Woman I Love Most
          </motion.p>

          <motion.h1
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-white glow-text sm:text-6xl md:text-8xl"
          >
            Happy Birthday
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-4 block bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 bg-clip-text text-transparent"
            >
              {MOTHER_NAME}
            </motion.span>
          </motion.h1>

          <div className="mx-auto mt-10 h-16 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7 }}
                className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-white/70 sm:text-2xl"
              >
                {SURPRISE_LINES[lineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mx-auto mt-6 max-w-md font-[family-name:var(--font-handwriting)] text-2xl text-rose-300/80 sm:text-3xl"
          >
            I love you, Amma. Always.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.9 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            onClick={handleReplay}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(244,114,182,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white"
          >
            Feel the Love Again
          </motion.button>

          <motion.button
            type="button"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full glass-card px-10 py-4 text-sm font-medium tracking-wide text-rose-300 hover:text-rose-200"
          >
            Relive Our Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
