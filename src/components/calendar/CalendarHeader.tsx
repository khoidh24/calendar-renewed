import React, {useState, useEffect} from 'react'
import {Button, Select, Radio} from 'antd'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import {Dayjs} from 'dayjs'
import WeeklyCalendar from './WeeklyCalendar'

const {Option} = Select

interface CalendarHeaderProps {
 value: Dayjs
 type: string
 onChange: (date: Dayjs) => void
 onTypeChange: (type: string) => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
 value,
 type,
 onChange,
 onTypeChange,
}) => {
 const [currentDate, setCurrentDate] = useState<Dayjs>(value)

 useEffect(() => {
  setCurrentDate(value)
 }, [value])

 const current = value.clone()
 const months: string[] = []
 for (let i = 0; i < 12; i++) {
  const monthClone = current.clone().month(i)
  months.push(monthClone.format('MMM'))
 }

 const month = value.month()
 const year = value.year()
 const options: JSX.Element[] = []
 for (let i = year - 10; i < year + 10; i += 1) {
  options.push(
   <Option key={i} value={i} className='year-item'>
    {i}
   </Option>,
  )
 }

 const getWeekOfMonth = (date: Dayjs) => {
  const startOfMonth = date.startOf('month')
  const weekNumber = date.diff(startOfMonth, 'week') + 1
  return weekNumber
 }

 return (
  <>
   <div
    className='flex justify-between items-center p-4 mt-8 mb-4 sticky top-0 w-full z-1000 headerview'
    style={{position: '-webkit-sticky'}}
   >
    <div className='flex flex-1 justify-start'>
     <Button
      type='text'
      icon={<LeftOutlined />}
      onClick={() => {
       const newValue =
        type === 'week'
         ? value.clone().subtract(1, 'week')
         : value.clone().subtract(1, 'month')
       onChange(newValue)
       setCurrentDate(newValue)
      }}
     />
     <Button
      type='text'
      icon={<RightOutlined />}
      onClick={() => {
       const newValue =
        type === 'week'
         ? value.clone().add(1, 'week')
         : value.clone().add(1, 'month')
       onChange(newValue)
       setCurrentDate(newValue)
      }}
     />
    </div>
    <div className='flex flex-1 justify-center'>
     <h1 className='font-bold text-xl'>
      {type === 'week'
       ? `Week ${getWeekOfMonth(value)} - ${value.format('MMM YYYY')}`
       : type === 'year'
       ? value.format('MMM YYYY')
       : value.format('DD MMMM YYYY')}
     </h1>
    </div>
    <div className='flex items-center justify-end flex-1'>
     <Select
      size='small'
      className='my-year-select w-20'
      value={year}
      onChange={(newYear: number) => {
       const now = value.clone().year(newYear)
       onChange(now)
       setCurrentDate(now)
      }}
     >
      {options}
     </Select>
     <Select
      size='small'
      value={String(month)}
      onChange={(selectedMonth: string) => {
       const newValue = value.clone().month(parseInt(selectedMonth, 10))
       onChange(newValue)
       setCurrentDate(newValue)
      }}
      className='w-24'
     >
      {months.map((monthName, index) => (
       <Option key={index} value={String(index)}>
        {monthName}
       </Option>
      ))}
     </Select>
     <Radio.Group
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
       onTypeChange(e.target.value)
      }
      value={type}
      className='ml-4'
     >
      <Radio.Button value='week'>Week</Radio.Button>
      <Radio.Button value='month'>Month</Radio.Button>
      <Radio.Button value='year'>Year</Radio.Button>
     </Radio.Group>
    </div>
   </div>
   {type === 'week' && <WeeklyCalendar currentDate={currentDate} />}
  </>
 )
}

export default CalendarHeader
