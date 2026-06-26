import { motion } from 'framer-motion'
import { smoothEase } from '../utils/motion'

export default function JourneyProgress({ current, total }) {
  const progress = total > 1 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-0.5 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-amber-300/80"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.2, ease: smoothEase }}
        style={{ boxShadow: '0 0 10px rgba(244,114,182,0.35)' }}
      />
    </div>
  )
}
