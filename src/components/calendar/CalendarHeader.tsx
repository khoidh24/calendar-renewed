import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { CalendarHeaderProps } from '../../types/types'

const { Title } = Typography

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  value,
  onChange,
  setCurrentDate
}) => {
  const current = value.clone()

  const prevMonth = () => {
    const newDate = current.subtract(1, 'month')
    onChange(newDate)
    setCurrentDate(newDate)
  }

  const nextMonth = () => {
    const newDate = current.add(1, 'month')
    onChange(newDate)
    setCurrentDate(newDate)
  }

  return (
    <div className='flex justify-between items-center p-10'>
      <Button onClick={prevMonth} icon={<LeftOutlined />} />
      <Title level={4} className='font-bold'>
        {current.format('MMMM - YYYY')}
      </Title>
      <Button onClick={nextMonth} icon={<RightOutlined />} />
    </div>
  )
}

export default CalendarHeader
