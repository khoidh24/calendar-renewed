import {Button, Form, message} from 'antd'
import dayjs from 'dayjs'
import FormList from './FormList'
import useCalendar from '../../storage/store'
import {AddEventFormProps, Event} from '../../types/types'
import {v4 as uuidv4} from 'uuid'
import roundToNearest15Minutes from '../../utils/roundToFifteenMinutes'
import {useEffect} from 'react'

const AddEventForm: React.FC<AddEventFormProps> = ({
 date,
 setVisible,
 viewCard,
 event,
 setUnsavedChanges,
 selectedTime,
 isEdit,
 setIsEdit,
}) => {
 const [form] = Form.useForm()
 const addEvent = useCalendar((state) => state.addEvent)
 const updateEvent = useCalendar((state) => state.updateEvent)

 useEffect(() => {
  if (isEdit) {
   const currentValues = form.getFieldsValue()
   const updatedEvents = currentValues.events.map((event: Event) => {
    return {
     ...event,
     title: event.title === '(No title event)' ? '' : event.title,
     description:
      event.description === '(No description provided)'
       ? ''
       : event.description,
    }
   })
   form.setFieldsValue({events: updatedEvents})
  }
 }, [isEdit, form])

 const onFinish = (values: {events: Event[]}) => {
  const updatedValues = values.events.map((event: Event) => {
   return {
    ...event,
    id: event.id || uuidv4(),
    title: event.title || `(No title event)`,
    invitedUsers: event.invitedUsers || [],
    description: event.description || '(No description provided)',
    startDate: dayjs(event.startDate).format('DD-MM-YYYY'),
    during: event.during,
   }
  })

  if (isEdit && event) {
   updateEvent({...updatedValues[0], id: event.id})
   message.success('Event updated successfully!', 2)
  } else {
   updatedValues.forEach((event: Event) => addEvent(event))
   message.success('Event added successfully!', 2)
  }

  console.log('Received values of form:', {events: updatedValues})
  setUnsavedChanges(false) // Reset unsaved changes state
  setVisible(false)
 }

 return (
  <>
   <Form
    form={form}
    name='events_form'
    disabled={viewCard}
    className='form-detail max-w-600 p-4'
    onValuesChange={() => setUnsavedChanges(true)} // Track unsaved changes
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
           address: event.address,
          },
         ],
        }
      : {
         events: [
          {
           startDate: dayjs(date, 'DD-MM-YYYY'),
           during: selectedTime
            ? [
               roundToNearest15Minutes(dayjs(selectedTime, 'hh:mm A')),
               roundToNearest15Minutes(
                dayjs(selectedTime, 'hh:mm A').add(30, 'minute'),
               ),
              ]
            : [
               roundToNearest15Minutes(dayjs()),
               roundToNearest15Minutes(dayjs()).add(1, 'hour'),
              ],
          },
         ],
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
  </>
 )
}

export default AddEventForm
