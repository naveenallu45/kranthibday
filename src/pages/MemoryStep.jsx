import { motion } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'
import ContinueButton from '../components/ContinueButton'
import { smoothEase } from '../utils/motion'

export default function MemoryStep({ memory, index, total, onNext }) {
  const isLast = index === total - 1

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-28 pt-20">
      <FloatingHearts count={5} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: smoothEase }}
        className="mb-8 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-rose-300/70">
          A cherished memory — {index + 1} of {total}
        </p>
        {index === 0 && (
          <>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-white glow-text sm:text-4xl">
              Moments I Hold Close
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/45">
              Every chapter of our story is written in your love
            </p>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 1, ease: smoothEase }}
        className="w-full max-w-lg"
      >
        <div className="glass-card overflow-hidden rounded-2xl glow-border">
          <div className="relative overflow-hidden">
            <img
              src={memory.image}
              alt={memory.alt}
              className="h-56 w-full object-cover sm:h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-rose-900/10" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-400/70">
              Chapter {index + 1}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
              {memory.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              {memory.caption}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: smoothEase }}
              className="love-line mt-5 text-lg sm:text-xl"
            >
              {memory.loveLine}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="mt-12">
        <ContinueButton
          onClick={onNext}
          label={isLast ? 'Read My Letter to You' : 'Next Cherished Memory'}
          sublabel={isLast ? 'from my heart' : 'keep going'}
          delay={0.9}
        />
      </div>
    </div>
  )
}
