import { Button, Form, message, Modal } from 'antd'
import dayjs from 'dayjs'
import FormList from './FormList'
import useCalendar from '../../storage/store'
import { AddEventFormProps, Event } from '../../types/types'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import roundToNearest15Minutes from '../../utils/roundToFifteenMinutes'

const AddEventForm: React.FC<AddEventFormProps> = ({
  date,
  setVisible,
  viewCard,
  setViewCard,
  event,
  setUnsavedChanges
}) => {
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const addEvent = useCalendar((state) => state.addEvent)
  const updateEvent = useCalendar((state) => state.updateEvent)
  const removeEvent = useCalendar((state) => state.removeEvent)

  const clearDefaultValues = () => {
    const currentValues = form.getFieldsValue()
    const updatedEvents = currentValues.events.map((event: Event) => {
      return {
        ...event,
        title: event.title === '(No title event)' ? '' : event.title,
        description:
          event.description === '(No description provided)'
            ? ''
            : event.description
      }
    })
    form.setFieldsValue({ events: updatedEvents })
  }

  const onFinish = (values: { events: Event[] }) => {
    const updatedValues = values.events.map((event: Event) => {
      return {
        ...event,
        id: event.id || uuidv4(),
        title: event.title || `(No title event)`,
        invitedUsers: event.invitedUsers || [],
        description: event.description || '(No description provided)',
        startDate: dayjs(event.startDate).format('DD-MM-YYYY'),
        during: event.during
      }
    })

    if (isEdit && event) {
      updateEvent({ ...updatedValues[0], id: event.id })
      message.success('Event updated successfully!', 2)
    } else {
      updatedValues.forEach((event: Event) => addEvent(event))
      message.success('Event added successfully!', 2)
    }
    console.log('Received values of form:', { events: updatedValues })
    setUnsavedChanges(false) // Reset unsaved changes state
    setVisible(false)
  }

  const showDeleteConfirm = () => {
    Modal.confirm({
      centered: true,
      title: 'Are you sure delete this event?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeEvent(event.id)
        setVisible(false)
        message.success('Event deleted successfully!', 2)
      }
    })
  }

  return (
    <>
      <Form
        form={form}
        name='events_form'
        disabled={viewCard}
        className='form-detail max-w-500'
        onValuesChange={() => setUnsavedChanges(true)} // Track unsaved changes
        variant={viewCard && isEdit ? 'borderless' : 'outlined'}
        initialValues={
          viewCard
            ? {
                events: [
                  {
                    title: event.title,
                    description: event.description,
                    startDate: dayjs(event.startDate, 'DD-MM-YYYY'),
                    during: [dayjs(event.during[0]), dayjs(event.during[1])],
                    invitedUsers: event.invitedUsers,
                    city: event.city,
                    district: event.district,
                    ward: event.ward,
                    address: event.address
                  }
                ]
              }
            : {
                events: [
                  {
                    startDate: dayjs(date, 'DD-MM-YYYY'),
                    during: [
                      roundToNearest15Minutes(dayjs()),
                      roundToNearest15Minutes(dayjs()).add(1, 'hour')
                    ]
                  }
                ]
              }
        }
        onFinish={onFinish}
        autoComplete='off'
        layout='horizontal'
        colon={false}
        requiredMark={false}
      >
        <FormList
          form={form}
          viewCard={viewCard}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        {!viewCard && (
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full mt-8 shadow-lg'
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        )}
      </Form>
      {viewCard && (
        <>
          {dayjs(event.startDate, 'DD-MM-YYYY').startOf('day').valueOf() >=
            dayjs().startOf('day').valueOf() && (
            <Button
              type='primary'
              className='w-full shadow-lg'
              onClick={() => {
                clearDefaultValues()
                setIsEdit(true)
                setViewCard(false)
                message.open({
                  type: 'info',
                  content: 'You are in edit mode.',
                  duration: 2
                })
              }}
            >
              Edit
            </Button>
          )}
          <Button
            danger
            className='w-full mt-8 shadow-lg'
            onClick={showDeleteConfirm}
          >
            Delete
          </Button>
        </>
      )}
    </>
  )
}

export default AddEventForm
