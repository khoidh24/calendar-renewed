import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/en'
import AddEventModal from '../form/AddEventModal'

type WeeklyCalendarProps = {
  currentDate: Dayjs
  onDateSelect?: (date: Dayjs) => void
  onViewCardClick?: () => void
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  currentDate,
  onDateSelect,
  onViewCardClick
}) => {
  dayjs.extend(weekOfYear)
  dayjs.extend(isoWeek)
  dayjs.locale('en')

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')

  function getCurrentWeekDates() {
    const today = dayjs()
    const startOfWeek = today.startOf('week')

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      weekDates.push(startOfWeek.add(i, 'day'))
    }

    return weekDates
  }

  function generateHourLabels() {
    const hours = []
    const startTime = dayjs().startOf('day')

    for (let i = 0; i < 24; i++) {
      const time = startTime.add(i, 'hour')
      hours.push(time.format('h A'))
    }

    return hours
  }

  const handleCellClick = (date: Dayjs) => {
    setSelectedDate(date)
    setIsModalVisible(true)
  }

  return (
    <>
      <div
        className='sticky top-0 z-30 flex-none shadow-md pr-8 bg-white border-[1px]'
        style={{ position: '-webkit-sticky' }}
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
                    currentDate.format('DD-MM-YYYY') ===
                    date.format('DD-MM-YYYY')
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
                  <div className='sticky left-0 z-20 -ml-14 -mt-[0.625rem] w-14 pr-2 text-right text-[0.75rem] leading-5 text-gray-400'>
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
                className={`border-r-[1px] row-span-full col-start-${
                  index + 1
                } ${index === 7 ? 'w-8' : ''}`}
              ></div>
            ))}
          </div>
          <ol className='border-l-[1px] list-none m-0 p-0 col-start-1 col-end-2 row-start-1 grid grid-cols-7 pr-8 grid-rows-288-rows-auto'>
            <li
              className='relative mt-[1px] flex col-start-3'
              style={{ gridRow: '92 / span 30' }}
            >
              <div className='absolute inset-[4px_50%_4px_4px] flex flex-col rounded-lg bg-pink-200 p-2 text-xs leading-5 hover:bg-pink-100'>
                <p className='order-1 font-semibold text-pink-700'>Hello</p>
                <p className='text-pink-500'>7:30 AM - 10:00 AM</p>
              </div>
            </li>
            <li
              className='relative mt-[1px] flex col-start-3'
              style={{ gridRow: '98 / span 36' }}
            >
              <div className='absolute inset-[4px_20%_4px_25%] flex flex-col rounded-lg bg-green-200 p-2 text-xs leading-5 hover:bg-green-100'>
                <p className='order-1 font-semibold text-green-700'>Hello</p>
                <p className='text-green-500'>8:00 AM - 11:00 AM</p>
              </div>
            </li>
            <li
              className='relative mt-[1px] flex col-start-3'
              style={{ gridRow: '92 / span 12' }}
            >
              <div className='absolute inset-[4px_4px_4px_60%] flex flex-col rounded-lg bg-blue-200 p-2 text-xs leading-5 hover:bg-blue-100'>
                <p className='order-1 font-semibold text-blue-700'>Hello</p>
                <p className='text-blue-500'>7:30 AM - 8:30 AM</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      {isModalVisible && (
        <AddEventModal
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          selectedDate={selectedDate ? selectedDate.format('YYYY-MM-DD') : null} // Convert to string
          viewCard={false}
          setViewCard={() => {}}
        />
      )}
    </>
  )
}

export default WeeklyCalendar
