import { Button, Form, message } from 'antd'
import dayjs from 'dayjs'
import FormFields from './FormList'
import useCalendar from '../../storage/store'
import { Event } from '../../types/types'

interface AddEventFormProps {
  date: string
  setVisible: (visible: boolean) => void
}

const AddEventForm: React.FC<AddEventFormProps> = ({ date, setVisible }) => {
  const [form] = Form.useForm()
  const addEvent = useCalendar((state) => state.addEvent)

  const onFinish = (values: { events: Event[] }) => {
    const updatedValues = values.events.map((event: Event, index: number) => {
      return {
        ...event,
        title: event.title || `Event ${index + 1}`,
        description: event.description || 'No description provided',
        startDate: dayjs(event.startDate).format('DD-MM-YYYY'),
        startTime: dayjs(event.startTime),
        endTime: dayjs(event.endTime)
      }
    })
    updatedValues.forEach((event: any) => addEvent(event))
    console.log('Received values of form:', { events: updatedValues })
    message.success('Event created successfully!')
    setVisible(false)
  }

  return (
    <>
      <Form
        form={form}
        name='events_form'
        initialValues={{
          events: [
            {
              title: '',
              startDate: dayjs(date, 'DD-MM-YYYY'),
              startTime: dayjs(),
              endTime: dayjs().add(1, 'hour')
            }
          ]
        }}
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
      >
        <FormFields />
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='w-[100%] mt-8 shadow-lg'
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddEventForm
