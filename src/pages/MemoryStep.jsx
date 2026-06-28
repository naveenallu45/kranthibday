import { motion } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'
import ContinueButton from '../components/ContinueButton'
import { smoothEase } from '../utils/motion'

export default function MemoryStep({ memory, index, total, onNext }) {
  const isLast = index === total - 1
  const crop = memory.imageCrop
  const cropScale =
    crop != null ? 100 / (100 - crop.top - crop.bottom) : 1

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden px-4 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-16">
      <FloatingHearts count={5} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: smoothEase }}
        className="mb-3 shrink-0 text-center sm:mb-4"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-rose-300/70 sm:text-xs">
          A cherished memory — {index + 1} of {total}
        </p>
        {index === 0 && (
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-white glow-text sm:text-2xl">
            Moments I Hold Close
          </h2>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 1, ease: smoothEase }}
        className="mx-auto flex min-h-0 w-full max-w-5xl flex-1"
      >
        <div className="glass-card glow-border flex min-h-0 w-full overflow-hidden rounded-2xl">
          <div className="flex min-h-0 w-1/2 items-center justify-center overflow-hidden bg-black/20 p-2 sm:p-5">
            {crop ? (
              <img
                src={memory.image}
                alt={memory.alt}
                className="block w-full origin-center"
                style={{ transform: `scaleY(${cropScale})` }}
              />
            ) : (
              <img
                src={memory.image}
                alt={memory.alt}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>

          <div className="flex min-h-0 w-1/2 flex-col justify-center border-l border-white/10 p-3 sm:p-6 md:p-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-rose-400/70 sm:text-xs">
              Chapter {index + 1}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold leading-tight text-white sm:mt-2 sm:text-2xl md:text-3xl">
              {memory.title}
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-white/60 sm:mt-3 sm:text-sm md:text-base">
              {memory.caption}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: smoothEase }}
              className="love-line mt-2 text-sm sm:mt-4 sm:text-lg md:text-xl"
            >
              {memory.loveLine}
            </motion.p>
            <div className="mt-3 shrink-0 sm:mt-5">
              <ContinueButton
                onClick={onNext}
                label={isLast ? 'Read My Letter to You' : 'Next Cherished Memory'}
                sublabel={isLast ? 'from my heart' : 'keep going'}
                delay={0.9}
                className="!px-5 !py-2.5 sm:!px-8 sm:!py-3"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
