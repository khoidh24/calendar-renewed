import { create } from 'zustand'
import { EventState, Event } from '../types/types'
import { createJSONStorage, persist } from 'zustand/middleware'

const useCalendar = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event: Event) =>
        set((state) => ({
          events: [...state.events, event]
        })),
      removeEvent: (id: string) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id)
        })),
      updateEvent: (event: Event) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === event.id ? { ...e, ...event } : e
          )
        }))
    }),
    {
      name: 'calendar-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCalendar
