import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'
import ContinueButton from '../components/ContinueButton'
import { MOTHER_NAME, WISHER_NAME, HOME_MESSAGES } from '../utils/constants'

export default function HomePage({ onNext }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setTypingDone(false)
    const text = HOME_MESSAGES[messageIndex]
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setTypingDone(true)
        clearInterval(interval)
      }
    }, 38)
    return () => clearInterval(interval)
  }, [messageIndex])

  useEffect(() => {
    if (!typingDone || messageIndex >= HOME_MESSAGES.length - 1) return
    const timeout = setTimeout(() => setMessageIndex((prev) => prev + 1), 2200)
    return () => clearTimeout(timeout)
  }, [typingDone, messageIndex])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts count={14} />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-rose-900/10 via-transparent to-black/50"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-28 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose-300/80 sm:text-sm"
          >
            June 29 — Celebrating You
          </motion.p>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-white glow-text sm:text-5xl md:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="block"
            >
              Happy Birthday
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="mt-2 block bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200/90 bg-clip-text text-transparent"
            >
              Mummy {MOTHER_NAME}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="mt-6 font-[family-name:var(--font-display)] text-lg italic text-white/65 sm:text-xl"
          >
            With all my heart, your daughter {WISHER_NAME}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.9 }}
          className="mt-10 w-full max-w-2xl"
        >
          <div className="glass-card rounded-2xl px-6 py-6 sm:px-10 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="min-h-[4.5rem] font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-white/85 sm:min-h-[5rem] sm:text-2xl"
              >
                {displayed}
                {!typingDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="ml-1 inline-block h-[1em] w-0.5 align-middle bg-rose-300"
                  />
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-14">
          <ContinueButton
            onClick={onNext}
            label="Walk Through Our Memories"
            sublabel="made with love"
            delay={3.5}
          />
        </div>
      </div>
    </div>
  )
}
