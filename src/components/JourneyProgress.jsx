import { motion } from 'framer-motion'

export default function JourneyProgress({ current, total }) {
  const progress = total > 1 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-0.5 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-amber-300/80"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ boxShadow: '0 0 12px rgba(244,114,182,0.5)' }}
      />
    </div>
  )
}
