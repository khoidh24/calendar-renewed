import React, { createContext, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Event, EventContextProps } from '../types/types'

export const EventContext = createContext<EventContextProps | undefined>(
	undefined
)

export const EventProvider: React.FC = ({ children }: any) => {
	const [selectedDate, setSelectedDate] = useState<string>('')
	const [visible, setVisible] = useState<boolean>(false)
	const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())
	const [isChangingMonth, setIsChangingMonth] = useState<boolean>(false)
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
	const [viewCard, setViewCard] = useState<boolean>(false)

	return (
		<EventContext.Provider
			value={{
				selectedDate,
				setSelectedDate,
				visible,
				setVisible,
				currentMonth,
				setCurrentMonth,
				isChangingMonth,
				setIsChangingMonth,
				selectedEvent,
				setSelectedEvent,
				viewCard,
				setViewCard,
			}}
		>
			{children}
		</EventContext.Provider>
	)
}
