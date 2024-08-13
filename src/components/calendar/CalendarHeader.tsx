import React from 'react'
import {Button, Select, Radio, Calendar} from 'antd'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import type {CalendarProps} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import WeeklyCalendar from './WeeklyCalendar'

const {Option} = Select

const CalendarHeader: CalendarProps<Dayjs>['headerRender'] = ({
 value,
 type,
 onChange,
 onTypeChange,
}) => {
 const current = value.clone()
 const months = []
 for (let i = 0; i < 12; i++) {
  const monthClone = current.clone().month(i)
  months.push(monthClone.format('MMM'))
 }

 const month = value.month()
 const year = value.year()
 const options = []
 for (let i = year - 10; i < year + 10; i += 1) {
  options.push(
   <Option key={i} value={i} className='year-item'>
    {i}
   </Option>,
  )
 }

 return (
  <div>
   <div className='flex justify-between items-center p-4 mt-8 mb-4'>
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
      }}
      className='text-gray-600 hover:text-blue-600'
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
      }}
      className='text-gray-600 hover:text-blue-600'
     />
    </div>
    <div className='flex flex-1 justify-center'>
     <h1 className='font-bold text-xl'>{value.format('DD MMMM YYYY')}</h1>
    </div>
    <div className='flex items-center justify-end flex-1'>
     <Select
      size='small'
      className='my-year-select w-20'
      value={year}
      onChange={(newYear) => {
       const now = value.clone().year(newYear)
       onChange(now)
      }}
     >
      {options}
     </Select>
     <Select
      size='small'
      value={String(month)}
      onChange={(selectedMonth) => {
       const newValue = value.clone().month(parseInt(selectedMonth, 10))
       onChange(newValue)
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
      onChange={(e: any) => onTypeChange(e.target.value)}
      value={type}
      className='ml-4'
     >
      <Radio.Button value='week'>Week</Radio.Button>
      <Radio.Button value='month'>Month</Radio.Button>
      <Radio.Button value='year'>Year</Radio.Button>
     </Radio.Group>
    </div>
   </div>
   {type === 'week' && (
    <WeeklyCalendar
     currentDate={value}
     events={[
      // Example events
      {
       id: 1,
       title: 'Meeting with Bob',
       start: dayjs().hour(9).minute(0),
       end: dayjs().hour(10).minute(0),
       color: '#FF6347',
      },
      {
       id: 2,
       title: 'Lunch with Sarah',
       start: dayjs().hour(12).minute(30),
       end: dayjs().hour(13).minute(30),
       color: '#4682B4',
      },
      {
       id: 3,
       title: 'Project Discussion',
       start: dayjs().add(2, 'day').hour(15).minute(0),
       end: dayjs().add(2, 'day').hour(16).minute(0),
       color: '#32CD32',
      },
     ]}
    />
   )}
  </div>
 )
}

export default CalendarHeader
