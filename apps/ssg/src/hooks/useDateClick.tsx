import type { MouseEvent } from 'react'
import type { EventVO } from '@/types'
import { createContext, useContext } from 'react'

export const DateClickContext = createContext<(elementEvent: MouseEvent<HTMLDivElement>, events: EventVO[]) => void>(() => {})

export function useDateClick() {
  const context = useContext(DateClickContext)
  if (!context)
    throw new Error('useClick must be used within ClickProvider')
  return context
}
