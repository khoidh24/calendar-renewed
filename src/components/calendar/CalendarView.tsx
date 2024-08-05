import { Calendar } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import AddEventModal from '../form/AddEventModal'
import CalendarHeader from './CalendarHeader'

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
  const [isChangingMonth, setIsChangingMonth] = useState<boolean>(false)

  const handleSelect = (date: Dayjs) => {
    const today = dayjs()
    if (
      date.isSame(currentDate, 'month') &&
      date.isAfter(today.startOf('day'))
    ) {
      setSelectedDate(dayjs(date).format('DD-MM-YYYY hh:mm A'))
      setVisible(true)
    }
  }

  const handlePanelChange = (date: Dayjs) => {
    setCurrentDate(date)
    setIsChangingMonth(false)
  }

  return (
    <>
      <Calendar
        disabledDate={(current: Dayjs) => {
          const today = dayjs()
          return (
            current.isBefore(today, 'day') || !current.isSame(today, 'month')
          )
        }}
        onSelect={(date) => {
          if (!isChangingMonth) handleSelect(date)
        }}
        headerRender={(props) => (
          <CalendarHeader {...props} setCurrentDate={setCurrentDate} />
        )}
        value={currentDate}
        onPanelChange={handlePanelChange}
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
