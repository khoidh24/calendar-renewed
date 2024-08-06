/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, Form, message } from 'antd'
import dayjs from 'dayjs'
import FormList from './FormList'
import useCalendar from '../../storage/store'
import { AddEventFormProps, Event } from '../../types/types'

const AddEventForm: React.FC<AddEventFormProps> = ({
	date,
	setVisible,
	viewCard,
	event,
}) => {
	const [form] = Form.useForm()
	const addEvent = useCalendar((state) => state.addEvent)

	const onFinish = (values: { events: Event[] }) => {
		const updatedValues = values.events.map((event: Event, index: number) => {
			return {
				...event,
				title: event.title || `Event ${index + 1}`,
				description: event.description || 'No description provided',
				startDate: dayjs(event.startDate).format('DD-MM-YYYY'),
				during: event.during,
			}
		})
		updatedValues.forEach((event: any) => addEvent(event))
		console.log('Received values of form:', { events: updatedValues })
		message.open({
			content: 'Event added successfully!',
			duration: 2,
			type: 'success',
		})
		setVisible(false)
	}

	return (
		<>
			<Form
				form={form}
				name='events_form'
				initialValues={
					viewCard
						? {
								events: [
									{
										title: event.title,
										description: event.description,
										startDate: dayjs(event.startDate, 'DD-MM-YYYY'),
										during: [dayjs(event.during[0]), dayjs(event.during[1])],
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
										during: [dayjs(), dayjs().add(1, 'hour')],
									},
								],
						  }
				}
				onFinish={onFinish}
				autoComplete='off'
				layout='vertical'
			>
				<FormList form={form} viewCard={viewCard} />
				{viewCard ? (
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='w-[100%] mt-8 shadow-lg'
						>
							Update
						</Button>
					</Form.Item>
				) : (
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='w-[100%] mt-8 shadow-lg'
						>
							Save
						</Button>
					</Form.Item>
				)}
			</Form>
		</>
	)
}

export default AddEventForm
