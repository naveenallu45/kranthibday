import confetti from 'canvas-confetti'

export function fireConfetti(duration = 3000) {
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f472b6', '#a855f7', '#d4a574', '#f8f4ff'],
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#f472b6', '#a855f7', '#d4a574', '#f8f4ff'],
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

export function fireConfettiBurst() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#f472b6', '#a855f7', '#d4a574', '#f8f4ff', '#ec4899'],
  })
}

export function fireConfettiExplosion() {
  const count = 200
  const defaults = { origin: { y: 0.7 }, colors: ['#f472b6', '#a855f7', '#d4a574'] }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}
