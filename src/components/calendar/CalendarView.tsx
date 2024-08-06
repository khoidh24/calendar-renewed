import { Calendar, message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import AddEventModal from '../form/AddEventModal'
import CalendarHeader from './CalendarHeader'
import RenderCell from './RenderCell'

const CalendarView: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<string>('')
	const [visible, setVisible] = useState<boolean>(false)
	const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())
	const [isChangingMonth, setIsChangingMonth] = useState<boolean>(false)
	const [selectedEvent, setSelectedEvent] = useState<any>(null)
	const [viewCard, setViewCard] = useState<boolean>(false)

	const handleSelect = (date: Dayjs) => {
		const today = dayjs()
		if (
			date.isSame(currentMonth, 'month') &&
			date.isAfter(today.startOf('day'))
		) {
			setSelectedDate(dayjs(date).format('DD-MM-YYYY'))
			setVisible(true)
			setViewCard(false)
		}
	}

	const handlePanelChange = (date: Dayjs) => {
		setCurrentMonth(date)
		setIsChangingMonth(false)
	}

	const handleEventClick = (event: any) => {
		setSelectedEvent(event)
		setVisible(true)
		setViewCard(true)
		message.open({
			content: 'You can modify any field during view mode.',
			duration: 2,
			type: 'info',
		})
	}

	return (
		<>
			<Calendar
				disabledDate={(current: Dayjs) => {
					const today = dayjs()
					return current.isBefore(today, 'day')
				}}
				onSelect={(date) => {
					if (!isChangingMonth) handleSelect(date)
				}}
				headerRender={(props) => (
					<CalendarHeader {...props} setCurrentMonth={setCurrentMonth} />
				)}
				onPanelChange={handlePanelChange}
				cellRender={(date) => (
					<RenderCell date={date} onEventClick={handleEventClick} />
				)}
			/>
			<AddEventModal
				visible={visible}
				setVisible={setVisible}
				selectedDate={selectedDate}
				event={selectedEvent}
				viewCard={viewCard}
			/>
		</>
	)
}

export default CalendarView
