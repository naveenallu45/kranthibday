import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
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
import { JourneyProvider } from './JourneyContext'
import { TIMELINE_MEMORIES } from '../utils/constants'
import { pageVariants, STEP_TRANSITION } from '../utils/motion'

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

function JourneyFlow() {
  const steps = useMemo(() => buildSteps(), [])
  const [stepIndex, setStepIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const unlockTimer = useRef(null)

  const currentStep = steps[stepIndex]

  useEffect(() => {
    TIMELINE_MEMORIES.forEach((memory) => {
      const img = new Image()
      img.src = memory.image
    })
  }, [])

  useEffect(() => {
    return () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current)
    }
  }, [])

  const beginTransition = useCallback((advance) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    advance()
    unlockTimer.current = setTimeout(() => {
      setIsTransitioning(false)
    }, STEP_TRANSITION.duration * 1000 + 200)
  }, [isTransitioning])

  const goNext = useCallback(() => {
    beginTransition(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
    })
  }, [beginTransition, steps.length])

  const goBack = useCallback(() => {
    beginTransition(() => {
      setStepIndex((prev) => Math.max(prev - 1, 0))
    })
  }, [beginTransition])

  const restart = useCallback(() => {
    beginTransition(() => {
      setStepIndex(1)
    })
  }, [beginTransition])

  const showProgress = currentStep.type !== 'secret'
  const showBack = stepIndex > 1 && currentStep.type !== 'surprise'

  return (
    <JourneyProvider isTransitioning={isTransitioning}>
      <div className="relative min-h-screen overflow-hidden gradient-bg">
        <ParticleBackground density={currentStep.type === 'surprise' ? 55 : 40} />
        <WarmGlow />
        <MusicToggle />
        {showProgress && <JourneyProgress current={stepIndex} total={steps.length} />}

        {showBack && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={goBack}
            disabled={isTransitioning}
            className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-card text-white/50 transition-colors hover:text-pink-300 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Go back"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep.id}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="gpu-layer relative z-10 min-h-screen"
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
    </JourneyProvider>
  )
}

export default function BirthdayJourney() {
  return (
    <MusicProvider>
      <JourneyFlow />
    </MusicProvider>
  )
}
