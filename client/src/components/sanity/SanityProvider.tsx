import { createContext, useContext, ReactNode } from 'react'
import { useSiteSettings } from '@/hooks/useSanity'

interface SanityContextType {
  siteSettings: any
  isLoading: boolean
}

const SanityContext = createContext<SanityContextType | undefined>(undefined)

export function SanityProvider({ children }: { children: ReactNode }) {
  const { data: siteSettings, isLoading } = useSiteSettings()
  
  return (
    <SanityContext.Provider value={{ siteSettings, isLoading }}>
      {children}
    </SanityContext.Provider>
  )
}

export function useSanityContext() {
  const context = useContext(SanityContext)
  if (context === undefined) {
    throw new Error('useSanityContext must be used within a SanityProvider')
  }
  return context
}