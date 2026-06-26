export const smoothEase = [0.16, 1, 0.3, 1]
export const softEase = [0.25, 0.46, 0.45, 0.94]

export const STEP_TRANSITION = {
  duration: 1.15,
  ease: smoothEase,
}

export const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: STEP_TRANSITION,
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.85, ease: softEase },
  },
}

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: smoothEase },
})
