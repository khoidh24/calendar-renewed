/* eslint-disable no-extra-semi */
import dayjs from 'dayjs'
import useCalendar from '../../storage/store'
import {Tooltip, Typography} from 'antd'
import {RenderCellProps} from '../../types/types'

const {Paragraph} = Typography

const RenderCell: React.FC<RenderCellProps> = ({date, onEventClick}) => {
 const {getEventsByDate} = useCalendar()
 const events = getEventsByDate(dayjs(date).format('DD-MM-YYYY'))

 // Sort events by the start time (during[0])
 const sortedEvents = events.sort((a, b) => {
  const timeA = a.during[0] ? dayjs(a.during[0]).valueOf() : 0
  const timeB = b.during[0] ? dayjs(b.during[0]).valueOf() : 0
  return timeA - timeB
 })

 return (
  <>
   <ul>
    {sortedEvents.map((event, index) => {
     return (
      <Tooltip
       key={index}
       placement='left'
       title={`${event.title} (${
        event.during[0] ? dayjs(event.during[0]).format('hh:mm A') : 'N/A'
       } - 
            ${
             event.during[1] ? dayjs(event.during[1]).format('hh:mm A') : 'N/A'
            })`}
      >
       <li
        className='bg-[#227E22] px-3 rounded-md hover:bg-[#1b641b] mb-2'
        onClick={(e) => {
         e.stopPropagation()
         onEventClick(event)
        }}
       >
        <Paragraph className='text-[#f9f9f9] text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]'>
         {event.title}{' '}
         <span className='text-[#f9f9f9] text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]'>{` (${
          event.during[0] ? dayjs(event.during[0]).format('hh:mm A') : 'N/A'
         } - 
            ${
             event.during[1] ? dayjs(event.during[1]).format('hh:mm A') : 'N/A'
            })`}</span>
        </Paragraph>
       </li>
      </Tooltip>
     )
    })}
   </ul>
  </>
 )
}

export default RenderCell
