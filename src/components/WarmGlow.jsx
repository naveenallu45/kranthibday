import { motion } from 'framer-motion'

export default function WarmGlow() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1]"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(244,114,182,0.12) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 50% at 60% 50%, rgba(212,165,116,0.1) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 40% 45%, rgba(168,85,247,0.1) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(244,114,182,0.12) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,6,18,0.45)_100%)]"
        aria-hidden="true"
      />
    </>
  )
}
