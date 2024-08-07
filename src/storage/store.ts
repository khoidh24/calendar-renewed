import { create } from 'zustand'
import { EventState, Event } from '../types/types'
import { createJSONStorage, persist } from 'zustand/middleware'

const useCalendar = create<EventState>()(
	persist(
		(set, get) => ({
			events: [],
			addEvent: (event: Event) =>
				set((state) => ({
					events: [...state.events, event],
				})),
			removeEvent: (id: string) =>
				set((state) => ({
					events: state.events.filter((event) => event.id !== id),
				})),
			updateEvent: (updatedEvent: Event) =>
				set((state) => {
					const eventIndex = state.events.findIndex((e) => e.id === updatedEvent.id)
					if (eventIndex !== -1) {
						const updatedEvents = [...state.events]
						updatedEvents[eventIndex] = {
							...updatedEvents[eventIndex],
							...updatedEvent,
						}
						return {
							events: updatedEvents,
						}
					}
					// If the event does not exist, do nothing
					return state
				}),
			getEventsByDate: (date: string) =>
				get().events.filter((event) => event.startDate === date),
		}),
		{
			name: 'calendar-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)

export default useCalendar
