import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CurtainReveal from '../components/CurtainReveal'
import { SECRET_CODES } from '../utils/constants'
import { fireConfettiExplosion } from '../utils/confetti'
import { smoothEase } from '../utils/motion'

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

export default function SecretPage({ onUnlock }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [curtainDone, setCurtainDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalized = code.trim().toUpperCase()

    if (SECRET_CODES.includes(normalized)) {
      setError(false)
      setUnlocking(true)
      fireConfettiExplosion()

      setTimeout(() => {
        onUnlock()
      }, 1800)
    } else {
      setError(true)
    }
  }

  return (
    <CurtainReveal onOpenComplete={() => setCurtainDone(true)}>
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/15 via-transparent to-purple-900/15" />

        <AnimatePresence mode="wait">
          {!unlocking ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: curtainDone ? 1 : 0, y: curtainDone ? 0 : 20 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1, ease: smoothEase }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="glass-card rounded-3xl p-8 text-center sm:p-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: curtainDone ? 1 : 0.8, opacity: curtainDone ? 1 : 0 }}
                  transition={{ delay: 0.2, duration: 0.9, ease: smoothEase }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/25 to-pink-500/15 ring-1 ring-rose-400/35"
                >
                  <motion.svg
                    className="h-9 w-9 text-rose-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d={HEART_PATH} />
                  </motion.svg>
                </motion.div>

                <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-white glow-text sm:text-3xl">
                  Someone made this with so much love, just for you
                </h1>

                <p className="mt-4 font-[family-name:var(--font-display)] text-base italic text-white/55">
                  Enter the secret code to open your surprise
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                  <motion.div
                    animate={error ? { x: [-12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <input
                      type="password"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value)
                        setError(false)
                      }}
                      placeholder="Enter Secret Code"
                      className={`w-full rounded-xl border bg-white/5 px-5 py-3.5 text-center text-white placeholder-white/30 outline-none transition-all duration-300 focus:ring-2 ${
                        error
                          ? 'border-red-400/60 ring-red-400/30'
                          : 'border-rose-300/15 focus:border-rose-400/50 focus:ring-rose-400/20'
                      }`}
                      autoComplete="off"
                    />
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 font-[family-name:var(--font-display)] text-sm italic text-rose-300"
                      >
                        Try again — love always finds a way
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(244,114,182,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-shadow duration-300"
                  >
                    Unlock With Love
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlock"
              initial={{ scale: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, ease: smoothEase }}
              className="fixed inset-0 z-20 bg-gradient-to-br from-rose-500/35 to-purple-600/30"
            />
          )}
        </AnimatePresence>
      </div>
    </CurtainReveal>
  )
}
