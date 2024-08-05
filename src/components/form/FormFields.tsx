import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker
} from 'antd'
import dayjs from 'dayjs'
import { FormFieldsProps } from '../../types/types'

const { TextArea } = Input

const FormFields: React.FC<FormFieldsProps> = ({ field }) => {
  return (
    <Card title={null} key={field.key} className='mb-4 shadow-lg'>
      <Form.Item name={[field.name, 'title']} label='Title'>
        <Input
          placeholder={`Event ${field.name + 1}`}
          className='text-2xl font-bold'
        />
      </Form.Item>
      <Form.Item name={[field.name, 'description']} label='Description'>
        <TextArea
          autoSize={{ minRows: 5, maxRows: 9 }}
          placeholder='Detail of the event...'
        />
      </Form.Item>
      <Form.Item label='Time'>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name={[field.name, 'startDate']}
              rules={[
                {
                  required: true,
                  message: 'Start date is required'
                }
              ]}
            >
              <DatePicker
                placeholder='Start date...'
                format={'DD-MM-YYYY'}
                className='w-[100%]'
                disabledDate={(current) => current.isBefore(dayjs(), 'day')}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item
              name={[field.name, 'startTime']}
              rules={[
                {
                  required: true,
                  message: 'Start time is required'
                }
              ]}
            >
              <TimePicker
                placeholder='Start time...'
                format={'hh:mm A'}
                className='w-[100%]'
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={[field.name, 'endTime']}>
              <TimePicker
                format={'hh:mm A'}
                className='w-[100%]'
                placeholder='End time...'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label='Location'>
        <Form.Item name={[field.name, 'city']}>
          <Select placeholder='City' />
        </Form.Item>
        <Row gutter={24}>
          <Col xs={24} sm={14}>
            <Form.Item
              name={[field.name, 'district']}
              dependencies={[[field.name, 'city']]}
            >
              <Select placeholder='District' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={10}>
            <Form.Item
              name={[field.name, 'ward']}
              dependencies={[
                [field.name, 'city'],
                [field.name, 'district']
              ]}
            >
              <Select placeholder='Ward' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={[field.name, 'address']}>
          <Input placeholder='Address' />
        </Form.Item>
      </Form.Item>
    </Card>
  )
}

export default FormFields
