import dayjs, { Dayjs } from 'dayjs'
import useCalendar from '../../storage/store'
import { Tooltip, Typography } from 'antd'

const { Paragraph } = Typography

const RenderCell = (date: Dayjs) => {
  const { getEventsByDate } = useCalendar()
  const events = getEventsByDate(dayjs(date).format('DD-MM-YYYY'))
  return (
    <ul>
      {events.map((event) => (
        <Tooltip
          placement='left'
          title={`${event.title} (${dayjs(event.startTime).format('hh:mm A')} - 
            ${dayjs(event.endTime).format('hh:mm A')})`}
        >
          <li className='bg-glassmorphism px-3 rounded-md' key={event.id}>
            <Paragraph
              className='text-[#f9f9f9] text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px]'
              ellipsis={{
                rows: 1,
                expandable: false,
                suffix: ` (${dayjs(event.startTime).format('hh:mm A')} - 
            ${dayjs(event.endTime).format('hh:mm A')})`
              }}
            >
              {event.title}
            </Paragraph>
          </li>
        </Tooltip>
      ))}
    </ul>
  )
}

export default RenderCell
