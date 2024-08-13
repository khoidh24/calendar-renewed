/* eslint-disable no-extra-semi */
import dayjs from 'dayjs'
import useCalendar from '../../storage/store'
import {Tooltip, Typography} from 'antd'
import {RenderCellProps} from '../../types/types'

const {Paragraph} = Typography

const RenderCell: React.FC<RenderCellProps> = ({date, onEventClick}) => {
 const {getEventsByDate} = useCalendar()
 const events = getEventsByDate(dayjs(date).format('DD-MM-YYYY'))

 return (
  <>
   <ul>
    {events.map((event, index) => {
     const during = event.during
     let startTime, endTime
     if (Array.isArray(during)) {
      ;[startTime, endTime] = during
     } else {
      startTime = endTime = undefined
     }
     return (
      <Tooltip
       key={index}
       placement='left'
       title={`${event.title} (${
        startTime ? dayjs(startTime).format('hh:mm A') : 'N/A'
       } - 
            ${endTime ? dayjs(endTime).format('hh:mm A') : 'N/A'})`}
      >
       <li
        className='bg-[#227E22] px-3 rounded-md hover:bg-[#1b641b]'
        onClick={(e) => {
         e.stopPropagation()
         onEventClick(event)
        }}
       >
        <Paragraph
         className='text-[#f9f9f9] text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]'
         ellipsis={{
          rows: 1,
          expandable: false,
          suffix: ` (${
           startTime ? dayjs(startTime).format('hh:mm A') : 'N/A'
          } - 
            ${endTime ? dayjs(endTime).format('hh:mm A') : 'N/A'})`,
         }}
        >
         {event.title}
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
