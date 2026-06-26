import { createContext, useContext } from 'react'

const JourneyContext = createContext({
  isTransitioning: false,
})

export function JourneyProvider({ children, isTransitioning }) {
  return (
    <JourneyContext.Provider value={{ isTransitioning }}>
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  return useContext(JourneyContext)
}
