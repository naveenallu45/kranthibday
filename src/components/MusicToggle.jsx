import { createContext, useContext, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const play = useCallback(async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const unmute = useCallback(async () => {
    if (!audioRef.current) return
    audioRef.current.muted = false
    setIsMuted(false)
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setIsMuted(audioRef.current.muted)
  }, [])

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, play, pause, toggleMute, unmute }}>
      <audio
        ref={audioRef}
        loop
        muted
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_8f7c8e8f2a.mp3?filename=soft-piano-ambient-124008.mp3"
      />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}

export default function MusicToggle({ className = '' }) {
  const { isMuted, toggleMute, unmute } = useMusic()

  const handleClick = async () => {
    if (isMuted) {
      await unmute()
    } else {
      toggleMute()
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`glass-card fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-pink-300 transition-colors hover:text-pink-200 ${className}`}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.svg
            key="muted"
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 20 }}
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="playing"
            initial={{ opacity: 0, rotate: 20 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -20 }}
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
