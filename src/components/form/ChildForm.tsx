import { CloseOutlined } from '@ant-design/icons'
import { Card, Col, DatePicker, Form, Input, Row, TimePicker } from 'antd'
import { useState, useEffect } from 'react'
import { ChildFormProps } from '../../types/types'

const ChildForm: React.FC<ChildFormProps> = ({
  title,
  onRemove,
  formItemName,
  showRemove,
  index
}) => {
  const [eventName, setEventName] = useState<string>(title)

  useEffect(() => {
    if (!title) {
      setEventName(`Event ${index + 1}`)
    }
  }, [index, title])

  return (
    <>
      <Card
        title={eventName}
        className='mb-4'
        extra={
          showRemove && (
            <CloseOutlined onClick={onRemove} className=' cursor-pointer' />
          )
        }
      >
        <Form.Item
          label='Event Title'
          name={`forms[${formItemName}].title`}
          rules={[{ required: true, message: 'Title is mandatory' }]}
        >
          <Input placeholder='Title' />
        </Form.Item>
        <Form.Item label='Description'>
          <Input.TextArea
            autoSize={{ minRows: 5, maxRows: 10 }}
            placeholder='Description...'
          />
        </Form.Item>
        <Form.Item label='Date & Time'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name={`forms[${formItemName}].fromDate`}
                rules={[{ required: true, message: 'Start date is mandatory' }]}
              >
                <DatePicker format={'DD-MM-YYYY'} className='w-[100%]' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={`forms[${formItemName}].endDate`}>
                <DatePicker format={'DD-MM-YYYY'} className='w-[100%]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name={`forms[${formItemName}].startTime`}
                rules={[{ required: true, message: 'Start time is mandatory' }]}
              >
                <TimePicker
                  placeholder='Start time...'
                  format='hh:mm A'
                  minuteStep={15}
                  className='w-[100%]'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={`forms[${formItemName}].endTime`}>
                <TimePicker
                  format='hh:mm A'
                  placeholder='End time...'
                  className='w-[100%]'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Card>
    </>
  )
}

export default ChildForm
