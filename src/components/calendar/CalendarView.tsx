import {Calendar} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import {useState} from 'react'
import AddEventModal from '../form/AddEventModal'
import RenderCell from './RenderCell'
import CalendarHeader from './CalendarHeader'
import WeeklyCalendar from './WeeklyCalendar'

const CalendarView: React.FC = () => {
 const [selectedDate, setSelectedDate] = useState<string>('')
 const [visible, setVisible] = useState<boolean>(false)
 const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())
 const [isChangingMonth, setIsChangingMonth] = useState<boolean>(false)
 const [selectedEvent, setSelectedEvent] = useState<any>(null)
 const [viewCard, setViewCard] = useState<boolean>(false)
 const [type, setType] = useState<'month' | 'week' | 'year'>('month') // Track calendar type

 const handleSelect = (date: Dayjs) => {
  const today = dayjs()
  if (
   date.isSame(currentMonth, 'month') &&
   date.isAfter(today.startOf('day'))
  ) {
   setSelectedDate(dayjs(date).format('DD-MM-YYYY'))
   setVisible(true)
   setViewCard(false)
   console.log('selected date', dayjs(date).format('DD-MM-YYYY'))
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
 }

 const isDateDisabled = (date: Dayjs) => {
  const today = dayjs()
  return date.isBefore(today, 'day')
 }

 return (
  <div>
   {/* Always render the CalendarHeader */}
   <CalendarHeader
    value={currentMonth}
    type={type}
    onChange={setCurrentMonth}
    onTypeChange={setType}
   />

   {/* Conditionally render WeeklyCalendar or AntD Calendar */}
   {type === 'week' ? null : (
    <Calendar
     value={currentMonth}
     mode={type}
     onSelect={(date) => {
      if (!isChangingMonth && !isDateDisabled(date)) {
       handleSelect(date)
      }
     }}
     headerRender={() => null}
     onPanelChange={handlePanelChange}
     cellRender={(date) => (
      <RenderCell date={date} onEventClick={handleEventClick} />
     )}
    />
   )}

   <AddEventModal
    visible={visible}
    setVisible={setVisible}
    selectedDate={selectedDate}
    event={selectedEvent}
    viewCard={viewCard}
    setViewCard={setViewCard}
   />
  </div>
 )
}

export default CalendarView
