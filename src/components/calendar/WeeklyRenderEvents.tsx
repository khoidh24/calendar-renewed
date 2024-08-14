import React from 'react'
import dayjs from 'dayjs'
import useCalendar from '../../storage/store'

const WeeklyRenderEvents: React.FC = () => {
 const events = useCalendar((state) => state.events)
 const groupedEvents: {[key: string]: any[]} = {}

 // Get the start and end of the selected week
 const startOfWeek = dayjs(new Date()).startOf('week')
 const endOfWeek = dayjs(new Date()).endOf('week')

 // Filter events that fall within the selected week
 const weeklyEvents = events.filter((event) => {
  const eventStart = dayjs(event.during[0])
  const eventEnd = dayjs(event.during[1])
  return (
   (eventStart.isAfter(startOfWeek) && eventStart.isBefore(endOfWeek)) ||
   (eventEnd.isAfter(startOfWeek) && eventEnd.isBefore(endOfWeek)) ||
   (eventStart.isBefore(startOfWeek) && eventEnd.isAfter(endOfWeek))
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
    const widthPercentage = 100 / eventsInGroup.length

    return eventsInGroup.map((event, index) => {
     const startTime = dayjs(event.during[0])
     const endTime = dayjs(event.during[1])
     const durationInMinutes = endTime.diff(startTime, 'minute')

     const startRow =
      startTime.hour() * 12 + Math.floor(startTime.minute() / 5) + 2
     const dayIndex = startTime.day()

     return (
      <li
       key={event.id}
       className={`relative mt-[1px] flex col-start-${dayIndex}`}
       style={{
        gridRow: `${startRow} / span ${durationInMinutes / 5}`,
       }}
      >
       <div
        className={`absolute flex flex-col rounded-lg p-2 text-xs leading-5 hover:bg-blue-100 ${
         index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'
        } shadow-lg border border-gray-300`}
        style={{
         width: `${widthPercentage}%`,
         inset: `4px calc(${
          100 - widthPercentage * (index + 1)
         }% + 4px) 4px calc(${widthPercentage * index}% + ${
          index === 0 ? '4px' : '-6px'
         })`,
        }}
       >
        <p className='order-1 font-semibold text-blue-700 text-xs'>
         {event.title}
        </p>
        <p className='text-blue-500 text-xs'>
         {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
        </p>
        <p className='text-gray-500 text-xs'>{event.description}</p>
       </div>
      </li>
     )
    })
   })}
  </>
 )
}

export default WeeklyRenderEvents
