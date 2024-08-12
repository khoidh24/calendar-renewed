import React from 'react'
import dayjs, {Dayjs} from 'dayjs'

interface Event {
 id: number
 title: string
 start: Dayjs
 end: Dayjs
 color: string
}

interface WeeklyCalendarProps {
 currentDate: Dayjs
 events: Event[]
}

const hours = Array.from({length: 23}, (_, i) => i + 1)

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
 currentDate,
 events,
}) => {
 const startOfWeek = currentDate.startOf('week')
 const daysOfWeek = Array.from({length: 7}, (_, i) => startOfWeek.add(i, 'day'))
 const now = dayjs()

 const renderEvents = (day: Dayjs, hour: number) => {
  return events
   .filter(
    (event) =>
     event.start.isSame(day, 'day') &&
     event.start.hour() <= hour &&
     event.end.hour() >= hour,
   )
   .map((event) => (
    <div
     key={event.id}
     className='absolute w-full'
     style={{
      backgroundColor: event.color,
      top: `${(event.start.minute() / 60) * 100}%`,
      height: `${(event.end.diff(event.start, 'minute') / 60) * 100}%`,
     }}
    >
     {event.title}
    </div>
   ))
 }

 const renderCurrentTimeLine = (day: Dayjs) => {
  if (!now.isSame(day, 'day')) return null

  const currentHour = now.hour()
  const currentMinute = now.minute()
  const totalMinutesInDay = 24 * 60
  const currentTotalMinutes = currentHour * 60 + currentMinute
  const topPosition = (currentTotalMinutes / totalMinutesInDay) * 100

  return (
   <div
    className='absolute w-full border-t border-red-500'
    style={{
     top: `calc(${topPosition}% - 1px)`, // Adjusted to center the line on the hour
     left: 0,
     zIndex: 10, // Ensure it stays above other elements
    }}
   >
    <div className='absolute left-0 w-full h-0.5 bg-red-500'></div>
   </div>
  )
 }

 return (
  <div className='grid grid-cols-8 border-t border-l'>
   <div className='border-b border-r p-2 bg-gray-100'>
    <div className='h-16 p-2 flex justify-center items-center' />
    {hours.map((hour) => (
     <div key={hour} className='h-16 p-2 flex justify-center items-center'>
      {`${hour}:00`}
     </div>
    ))}
   </div>
   {daysOfWeek.map((day) => (
    <div key={day.format('YYYY-MM-DD')} className='relative border-b border-r'>
     <div className='p-2 text-center font-bold bg-gray-200'>
      {day.format('ddd, MMM D')}
     </div>
     {hours.map((hour) => (
      <div key={hour} className='relative h-16 border-b'>
       {renderEvents(day, hour)}
      </div>
     ))}
     {renderCurrentTimeLine(day)}
    </div>
   ))}
  </div>
 )
}

export default WeeklyCalendar
