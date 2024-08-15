import React, {useEffect, useRef, useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import WeeklyRenderEvents from './WeeklyRenderEvents'
import AddEventModal from '../form/AddEventModal'

type WeeklyCalendarProps = {
 currentDate: Dayjs
 onDateSelect?: (date: Dayjs) => void
 onViewCardClick?: () => void
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({currentDate}) => {
 dayjs.extend(weekOfYear)
 dayjs.extend(isoWeek)
 const [visible, setVisible] = useState<boolean>(false)
 const [viewCard, setViewCard] = useState<boolean>(false)
 const [selectedEvent, setSelectedEvent] = useState<any>(null)
 const [selectedDate, setSelectedDate] = useState<string>('')

 const hourRef = useRef<HTMLDivElement[]>([])
 const redLineRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  const currentHour = dayjs().hour()

  if (hourRef.current[currentHour]) {
   hourRef.current[currentHour].scrollIntoView({
    behavior: 'smooth',
    block: 'center',
   })
  }
 }, [])

 useEffect(() => {
  const updateRedLinePosition = () => {
   const now = dayjs()
   const startOfDay = now.startOf('day')
   const minutesSinceStartOfDay = now.diff(startOfDay, 'minute')
   const totalMinutesInDay = 24 * 60
   const percentageOfDay = (minutesSinceStartOfDay / totalMinutesInDay) * 100

   if (redLineRef.current) {
    redLineRef.current.style.top = `calc(${percentageOfDay}% + 21px)`
   }
  }

  console.log(dayjs().diff(dayjs().startOf('day'), 'minute'))

  updateRedLinePosition()
  const intervalId = setInterval(updateRedLinePosition, 60000) // Update every minute

  return () => clearInterval(intervalId)
 }, [])

 const getCurrentWeekDates = () => {
  const today = dayjs(currentDate) // Use currentDate prop to ensure consistency
  const startOfWeek = today.startOf('week') // Change to start of week (Sunday)

  const weekDates = []
  for (let i = 0; i < 7; i++) {
   weekDates.push(startOfWeek.add(i, 'day'))
  }

  return weekDates
 }

 const generateHourLabels = () => {
  const hours = []
  const startTime = dayjs().startOf('day')

  for (let i = 0; i < 24; i++) {
   const time = startTime.add(i, 'hour')
   hours.push(time.format('h A'))
  }

  return hours
 }

 const handleEventClick = (event: any) => {
  setSelectedEvent(event)
  setVisible(true)
  setViewCard(true)
 }

 return (
  <div className='relative'>
   <div
    className='sticky top-[64px] z-30 flex-none shadow-md pr-8 border-[1px] bg-white'
    style={{position: '-webkit-sticky'}}
   >
    <div className='mr-[-1px] grid-cols-7 text-sm leading-6 grid'>
     <div className='w-14 col-end-1 border-r-[1px]' />
     {getCurrentWeekDates().map((date, index) => (
      <div
       className='flex items-center justify-center py-3 border-r'
       key={index}
      >
       <span>
        {`${date.format('ddd')} `}
        <span
         className={`font-semibold ${
          dayjs(new Date()).format('DD-MM-YYYY') === date.format('DD-MM-YYYY')
           ? 'bg-[#227E22] rounded-full text-white px-1 py-1'
           : ''
         }`}
        >
         {date.format('DD')}
        </span>
       </span>
      </div>
     ))}
    </div>
   </div>
   <div className='flex flex-[1_1_auto]'>
    <div className='sticky left-0 z-10 w-14 flex-none' />
    <div className='grid flex-[1_1_auto] grid-cols-1 grid-rows-1'>
     <div className='col-start-1 col-end-2 row-start-1 grid grid-rows-48-auto'>
      <div className='row-end-1 h-7' />
      {generateHourLabels().map((label, index) => (
       <>
        <div className='border' key={index}>
         <div
          className='sticky left-0 z-20 -ml-14 -mt-[0.625rem] w-14 pr-2 text-right text-[0.75rem] leading-5 text-gray-400'
          ref={(el) => (hourRef.current[index] = el!)}
         >
          {label}
         </div>
        </div>
        <div></div>
       </>
      ))}
     </div>
     <div className='col-start-1 col-end-2 row-start-1 grid-rows-1 grid grid-cols-7'>
      {[...Array(8)].map((_, index) => (
       <div
        key={index}
        className={`border-r-[1px] row-span-full col-start-${index + 1} ${
         index === 7 ? 'w-8' : ''
        }`}
       ></div>
      ))}
     </div>
     <div
      ref={redLineRef}
      className='absolute left-0 w-full h-[2px] bg-red-500 z-[100]'
      style={{top: '0%'}}
     ></div>
     <ol className='border-l-[1px] list-none m-0 p-0 col-start-1 col-end-2 row-start-1 grid grid-cols-7 pr-8 grid-rows-288-rows-auto'>
      <WeeklyRenderEvents
       currentDate={currentDate}
       onEventClick={handleEventClick}
      />
     </ol>
    </div>
   </div>
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

export default WeeklyCalendar
