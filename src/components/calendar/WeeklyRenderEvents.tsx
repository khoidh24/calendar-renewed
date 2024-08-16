import React from 'react'
import dayjs, {Dayjs} from 'dayjs'
import useCalendar from '../../storage/store'
import {Tooltip} from 'antd'

type WeeklyRenderEventsProps = {
 currentDate: Dayjs
 onEventClick: (event: any) => void
}

const WeeklyRenderEvents: React.FC<WeeklyRenderEventsProps> = ({
 currentDate,
 onEventClick,
}) => {
 const events = useCalendar((state) => state.events)
 const groupedEvents: {[key: string]: any[]} = {}

 // Get the start and end of the selected week
 const startOfWeek = dayjs(currentDate).startOf('week')
 const endOfWeek = dayjs(currentDate).endOf('week')

 // Filter events that fall within the selected week
 const weeklyEvents = events.filter((event) => {
  const eventDate = dayjs(event.startDate, 'DD-MM-YYYY')
  return (
   (eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek)) ||
   eventDate.isSame(startOfWeek) ||
   eventDate.isSame(endOfWeek)
  )
 })

 weeklyEvents.forEach((event) => {
  const startTime = dayjs(event.during[0])
  const dayIndex = startTime.day()
  const key = `${startTime.format('HH:mm')}-${dayIndex}`

  if (!groupedEvents[key]) {
   groupedEvents[key] = []
  }

  groupedEvents[key].push(event)
 })

 return (
  <>
   {Object.keys(groupedEvents).flatMap((key) => {
    const eventsInGroup = groupedEvents[key]

    return eventsInGroup.map((event) => {
     const startTime = dayjs(event.during[0])
     const endTime = dayjs(event.during[1])
     const durationInMinutes = endTime.diff(startTime, 'minute')

     const startRow =
      startTime.hour() * 12 + Math.floor(startTime.minute() / 5) + 8
     const dayIndex = dayjs(event.startDate, 'DD-MM-YYYY').day() + 1
     return (
      <Tooltip
       key={event.id}
       placement='left'
       title={`${event.title} (${
        event.during[0] ? dayjs(event.during[0]).format('hh:mm A') : 'N/A'
       } - 
            ${
             event.during[1] ? dayjs(event.during[1]).format('hh:mm A') : 'N/A'
            })`}
      >
       <li
        className='relative flex'
        style={{
         gridRow: `${startRow} / span ${durationInMinutes / 5}`,
         gridColumn: dayIndex,
         zIndex: 200,
         position: 'relative',
        }}
       >
        <div
         onClick={() => {
          onEventClick(event)
         }}
         className={`absolute flex flex-col rounded-lg p-2 text-xs leading-5 hover:bg-[#1b641b] bg-[#227E22] shadow-lg border border-gray-300 cursor-pointer`}
         style={{
          inset: `2px 2px 2px 2px`,
         }}
        >
         <p className='order-1 font-semibold text-white text-xs'>
          {event.title}
         </p>
         <p className='text-white text-xs'>
          {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
         </p>
        </div>
       </li>
      </Tooltip>
     )
    })
   })}
  </>
 )
}

export default WeeklyRenderEvents
