import { useMemo, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'
import WarmGlow from '../components/WarmGlow'
import MusicToggle, { MusicProvider } from '../components/MusicToggle'
import JourneyProgress from '../components/JourneyProgress'
import SecretPage from '../pages/SecretPage'
import HomePage from '../pages/HomePage'
import MemoryStep from '../pages/MemoryStep'
import LetterPage from '../pages/LetterPage'
import SurprisePage from '../pages/SurprisePage'
import { TIMELINE_MEMORIES } from '../utils/constants'

function buildSteps() {
  return [
    { id: 'secret', type: 'secret' },
    { id: 'home', type: 'home' },
    ...TIMELINE_MEMORIES.map((memory, index) => ({
      id: `memory-${memory.id}`,
      type: 'memory',
      memory,
      index,
    })),
    { id: 'letter', type: 'letter' },
    { id: 'surprise', type: 'surprise' },
  ]
}

const pageVariants = {
  initial: { opacity: 0, y: 50, scale: 0.97, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -40, scale: 1.01, filter: 'blur(4px)' },
}

function JourneyFlow() {
  const steps = useMemo(() => buildSteps(), [])
  const [stepIndex, setStepIndex] = useState(0)

  const currentStep = steps[stepIndex]

  const goNext = useCallback(() => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const goBack = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const restart = useCallback(() => {
    setStepIndex(1)
  }, [])

  const showProgress = currentStep.type !== 'secret'
  const showBack = stepIndex > 1 && currentStep.type !== 'surprise'

  return (
    <div className="relative min-h-screen overflow-hidden gradient-bg">
      <ParticleBackground density={currentStep.type === 'surprise' ? 70 : 55} />
      <WarmGlow />
      <MusicToggle />
      {showProgress && <JourneyProgress current={stepIndex} total={steps.length} />}

      {showBack && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goBack}
          className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-card text-white/50 transition-colors hover:text-pink-300"
          aria-label="Go back"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 min-h-screen"
        >
          {currentStep.type === 'secret' && <SecretPage onUnlock={goNext} />}
          {currentStep.type === 'home' && <HomePage onNext={goNext} />}
          {currentStep.type === 'memory' && (
            <MemoryStep
              memory={currentStep.memory}
              index={currentStep.index}
              total={TIMELINE_MEMORIES.length}
              onNext={goNext}
            />
          )}
          {currentStep.type === 'letter' && <LetterPage onNext={goNext} />}
          {currentStep.type === 'surprise' && <SurprisePage onRestart={restart} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function BirthdayJourney() {
  return (
    <MusicProvider>
      <JourneyFlow />
    </MusicProvider>
  )
}
