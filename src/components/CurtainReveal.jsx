import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { smoothEase } from '../utils/motion'

const OPEN_DELAY = 0.7
const OPEN_DURATION = 2.8
const FOLDS = 11

/** Build one draped fold path for theater-style velvet */
function foldPath(index, total, w, h, side) {
  const fw = w / total
  const x0 = index * fw
  const x1 = x0 + fw
  const inward = side === 'left'
  const edge = inward ? x1 : x0
  const outer = inward ? x0 : x1
  const bulge = fw * 0.22

  const c1x = edge + (inward ? -bulge : bulge)
  const c2x = edge + (inward ? -bulge * 0.6 : bulge * 0.6)
  const pool = fw * 0.12

  return `
    M ${outer} 0
    L ${edge} 0
    C ${c1x} ${h * 0.25}, ${c2x} ${h * 0.55}, ${edge + (inward ? -pool : pool)} ${h * 0.82}
    C ${edge + (inward ? pool * 1.5 : -pool * 1.5)} ${h * 0.94}, ${outer + (inward ? pool : -pool)} ${h * 0.98}, ${outer + (inward ? pool * 0.5 : -pool * 0.5)} ${h}
    L ${outer} 0
    Z
  `
}

function VelvetDefs({ uid }) {
  return (
    <defs>
      <filter id={`${uid}-fabric`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" result="n" />
        <feColorMatrix
          type="matrix"
          values="0.3 0 0 0 0  0 0.15 0 0 0  0 0 0.2 0 0  0 0 0 0.35 0"
          in="n"
          result="fn"
        />
        <feBlend in="SourceGraphic" in2="fn" mode="multiply" />
      </filter>

      <linearGradient id={`${uid}-fold-light`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1a0610" />
        <stop offset="18%" stopColor="#5c1838" />
        <stop offset="42%" stopColor="#a8325c" />
        <stop offset="58%" stopColor="#c4456f" />
        <stop offset="78%" stopColor="#6e2042" />
        <stop offset="100%" stopColor="#220810" />
      </linearGradient>

      <linearGradient id={`${uid}-fold-dark`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#12040a" />
        <stop offset="25%" stopColor="#3d1025" />
        <stop offset="50%" stopColor="#7a2848" />
        <stop offset="75%" stopColor="#451528" />
        <stop offset="100%" stopColor="#18060e" />
      </linearGradient>

      <linearGradient id={`${uid}-rod`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3d2810" />
        <stop offset="40%" stopColor="#8b6914" />
        <stop offset="55%" stopColor="#d4a84b" />
        <stop offset="70%" stopColor="#8b6914" />
        <stop offset="100%" stopColor="#2a1a08" />
      </linearGradient>

      <radialGradient id={`${uid}-spot`} cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="rgba(255,220,230,0.2)" />
        <stop offset="50%" stopColor="rgba(244,114,182,0.06)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </radialGradient>
    </defs>
  )
}

function CurtainHalf({ side, isOpening }) {
  const uid = useId().replace(/:/g, '')
  const isLeft = side === 'left'
  const w = 520
  const h = 1100

  const folds = Array.from({ length: FOLDS }, (_, i) => ({
    d: foldPath(i, FOLDS, w, h, side),
    fill: i % 2 === 0 ? `url(#${uid}-fold-light)` : `url(#${uid}-fold-dark)`,
  }))

  return (
    <motion.div
      className={`fixed top-0 z-[60] h-full ${isLeft ? 'left-0' : 'right-0'}`}
      style={{
        width: '54%',
        transformOrigin: isLeft ? 'right center' : 'left center',
      }}
      initial={{ x: 0, scaleX: 1 }}
      animate={{
        x: isOpening ? (isLeft ? '-108%' : '108%') : 0,
        scaleX: isOpening ? 0.88 : 1,
      }}
      transition={{
        x: { duration: OPEN_DURATION, ease: [0.42, 0, 0.18, 1], delay: isOpening ? OPEN_DELAY : 0 },
        scaleX: { duration: OPEN_DURATION * 0.85, ease: smoothEase, delay: isOpening ? OPEN_DELAY + 0.1 : 0 },
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className={`h-full w-full ${isLeft ? 'drop-shadow-[4px_0_24px_rgba(0,0,0,0.5)]' : 'drop-shadow-[-4px_0_24px_rgba(0,0,0,0.5)]'}`}
      >
        <VelvetDefs uid={uid} />
        <g filter={`url(#${uid}-fabric)`}>
          {folds.map((fold, i) => (
            <path key={i} d={fold.d} fill={fold.fill} opacity={0.97} />
          ))}
          <ellipse cx={w / 2} cy={h - 8} rx={w * 0.48} ry={28} fill="rgba(0,0,0,0.35)" />
        </g>
      </svg>

      {/* inner edge shadow */}
      <div
        className={`absolute top-0 bottom-0 w-16 ${isLeft ? 'right-0' : 'left-0'}`}
        style={{
          background: isLeft
            ? 'linear-gradient(to left, rgba(0,0,0,0.55), transparent)'
            : 'linear-gradient(to right, rgba(0,0,0,0.55), transparent)',
        }}
      />
    </motion.div>
  )
}

function CurtainRod({ isOpening }) {
  const uid = useId().replace(/:/g, '')

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[62]"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -30 : 0 }}
      transition={{ duration: 1, delay: isOpening ? OPEN_DELAY + OPEN_DURATION * 0.4 : 0, ease: smoothEase }}
    >
      <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="h-14 w-full">
        <VelvetDefs uid={`rod-${uid}`} />
        <rect x="0" y="8" width="1200" height="28" rx="4" fill={`url(#rod-${uid}-rod)`} />
        <rect x="0" y="6" width="1200" height="4" fill="rgba(255,220,180,0.15)" />
        {/* finials */}
        <circle cx="24" cy="22" r="18" fill={`url(#rod-${uid}-rod)`} />
        <circle cx="1176" cy="22" r="18" fill={`url(#rod-${uid}-rod)`} />
        <rect x="0" y="36" width="1200" height="12" fill="rgba(30,10,20,0.8)" />
      </svg>
    </motion.div>
  )
}

export default function CurtainReveal({ children, onOpenComplete }) {
  const [isOpening, setIsOpening] = useState(false)
  const [showCurtains, setShowCurtains] = useState(true)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    const startTimer = setTimeout(() => setIsOpening(true), 400)
    const doneTimer = setTimeout(
      () => {
        setShowCurtains(false)
        onOpenComplete?.()
      },
      (OPEN_DELAY + OPEN_DURATION) * 1000 + 500,
    )
    return () => {
      clearTimeout(startTimer)
      clearTimeout(doneTimer)
    }
  }, [onOpenComplete])

  return (
    <div className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 1 : 0 }}
        transition={{ duration: 1.5, ease: smoothEase, delay: OPEN_DELAY + 0.8 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {showCurtains && (
          <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
            {/* stage */}
            <motion.div
              className="absolute inset-0 bg-[#050208]"
              animate={{ opacity: isOpening ? 0 : 1 }}
              transition={{ duration: OPEN_DURATION, delay: OPEN_DELAY, ease: smoothEase }}
            />

            {/* spotlight on stage */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <defs>
                <radialGradient id={`spot-${uid}-spot`} cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,220,230,0.2)" />
                  <stop offset="50%" stopColor="rgba(244,114,182,0.06)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
              <motion.ellipse
                cx="50%"
                cy="42%"
                rx="28%"
                ry="38%"
                fill={`url(#spot-${uid}-spot)`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpening ? 1 : 0 }}
                transition={{ duration: 2, delay: OPEN_DELAY + 0.5, ease: smoothEase }}
              />
            </svg>

            {/* center seam shadow when closed */}
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-24 -translate-x-1/2"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.7), transparent)' }}
              animate={{ opacity: isOpening ? 0 : 0.9 }}
              transition={{ duration: 1, delay: OPEN_DELAY }}
            />

            <CurtainRod isOpening={isOpening} />
            <CurtainHalf side="left" isOpening={isOpening} />
            <CurtainHalf side="right" isOpening={isOpening} />

            {/* floor */}
            <motion.div
              className="absolute right-0 bottom-0 left-0 h-40"
              style={{ background: 'linear-gradient(to top, rgba(40,10,25,0.5), transparent)' }}
              animate={{ opacity: isOpening ? 1 : 0 }}
              transition={{ duration: 1.5, delay: OPEN_DELAY + 1 }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
