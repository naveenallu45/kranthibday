import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'
import ContinueButton from '../components/ContinueButton'
import { MOTHER_NAME, WISHER_NAME, HOME_MESSAGES } from '../utils/constants'
import { smoothEase } from '../utils/motion'

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
    }, 32)
    return () => clearInterval(interval)
  }, [messageIndex])

  useEffect(() => {
    if (!typingDone || messageIndex >= HOME_MESSAGES.length - 1) return
    const timeout = setTimeout(() => setMessageIndex((prev) => prev + 1), 2800)
    return () => clearTimeout(timeout)
  }, [typingDone, messageIndex])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts count={10} />

      <div className="absolute inset-0 bg-gradient-to-b from-rose-900/10 via-transparent to-black/50" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-28 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: smoothEase }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose-300/80 sm:text-sm">
            June 29 — Celebrating You
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-white glow-text sm:text-5xl md:text-7xl">
            <span className="block">Happy Birthday</span>
            <span className="mt-2 block bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200/90 bg-clip-text text-transparent">
              Mummy {MOTHER_NAME}
            </span>
          </h1>

          <p className="mt-6 font-[family-name:var(--font-display)] text-lg italic text-white/65 sm:text-xl">
            With all my heart, your daughter {WISHER_NAME}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: smoothEase }}
          className="mt-10 w-full max-w-2xl"
        >
          <div className="glass-card rounded-2xl px-6 py-6 sm:px-10 sm:py-8">
            <div className="relative min-h-[5rem] sm:min-h-[5.5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: smoothEase }}
                  className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-white/85 sm:text-2xl"
                >
                  {displayed}
                  {!typingDone && (
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                      className="ml-1 inline-block h-[1em] w-0.5 align-middle bg-rose-300"
                    />
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="mt-14">
          <ContinueButton
            onClick={onNext}
            label="Walk Through Our Memories"
            sublabel="made with love"
            delay={2.8}
          />
        </div>
      </div>
    </div>
  )
}
