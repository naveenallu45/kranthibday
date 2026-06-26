export default function WarmGlow() {
  return (
    <>
      <div className="warm-glow pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,6,18,0.45)_100%)]"
        aria-hidden="true"
      />
    </>
  )
}
