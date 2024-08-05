import { Calendar } from 'antd'
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

  const handleSelect = (date: Dayjs) => {
    const today = dayjs()
    if (
      date.isSame(currentMonth, 'month') &&
      date.isAfter(today.startOf('day'))
    ) {
      setSelectedDate(dayjs(date).format('DD-MM-YYYY'))
      setVisible(true)
    }
  }

  const handlePanelChange = (date: Dayjs) => {
    setCurrentMonth(date)
    setIsChangingMonth(false)
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
        cellRender={RenderCell}
      />
      <AddEventModal
        visible={visible}
        setVisible={setVisible}
        selectedDate={selectedDate}
      />
    </>
  )
}

export default CalendarView
