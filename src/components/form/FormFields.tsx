/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	TimePicker,
} from 'antd'
import dayjs from 'dayjs'
import { FormFieldsProps } from '../../types/types'
import cities from '../../data/city.json'
import districts from '../../data/district.json'
import wards from '../../data/ward.json'
import sortOptions from '../../utils/sortOptions'

const { TextArea } = Input

const FormFields: React.FC<FormFieldsProps> = ({ field, form, viewCard }) => {
	const cityOptions = sortOptions(
		Object.values(cities).map((city) => ({
			label: city.name_with_type,
			value: city.code,
		}))
	)

	return (
		<Card title={null} key={field.key} className='mb-4 shadow-lg form-detail'>
			<Form.Item name={[field.name, 'title']} label='Title'>
				<Input
					placeholder={`Event ${field.name + 1}`}
					className='text-2xl font-bold'
					disabled={viewCard}
				/>
			</Form.Item>
			<Form.Item name={[field.name, 'description']} label='Description'>
				<TextArea
					autoSize={{ minRows: 5, maxRows: 9 }}
					placeholder='Detail of the event...'
					disabled={viewCard}
				/>
			</Form.Item>
			<Form.Item label='Time' className='mb-0'>
				<Row gutter={24}>
					<Col xs={24} sm={12}>
						<Form.Item
							name={[field.name, 'startDate']}
							rules={[
								{
									required: true,
									message: 'Start date is required',
								},
							]}
						>
							<DatePicker
								placeholder='Start date...'
								format={'DD-MM-YYYY'}
								className='w-[100%]'
								disabledDate={(current) => current.isBefore(dayjs(), 'day')}
								needConfirm={false}
								disabled={viewCard}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12}>
						<Form.Item name={[field.name, 'during']}>
							<TimePicker.RangePicker
								format={'hh:mm A'}
								className='w-[100%]'
								needConfirm={false}
								disabled={viewCard}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label='Location'>
				<Form.Item name={[field.name, 'city']}>
					<Select
						showSearch
						placeholder='City'
						options={cityOptions}
						onChange={() => {
							form.resetFields([
								['events', field.name, 'district'],
								['events', field.name, 'ward'],
							])
						}}
						disabled={viewCard}
					/>
				</Form.Item>
				<Row gutter={24}>
					<Col xs={24} sm={14}>
						<Form.Item dependencies={[['events', field.name, 'city']]}>
							{() => (
								<Form.Item name={[field.name, 'district']} noStyle>
									<Select
										showSearch
										placeholder='District'
										options={
											form.getFieldValue(['events', field.name, 'city'])
												? sortOptions(
														Object.values(districts)
															.filter(
																(district) =>
																	district.parent_code ===
																	form.getFieldValue(['events', field.name, 'city'])
															)
															.map((district) => ({
																label: district.name_with_type,
																value: district.code,
															}))
												  )
												: []
										}
										onChange={() => {
											form.resetFields([['events', field.name, 'ward']])
										}}
										disabled={viewCard}
									/>
								</Form.Item>
							)}
						</Form.Item>
					</Col>
					<Col xs={24} sm={10}>
						<Form.Item
							dependencies={[
								['events', field.name, 'city'],
								['events', field.name, 'district'],
							]}
						>
							{() => (
								<Form.Item name={[field.name, 'ward']} noStyle>
									<Select
										showSearch
										placeholder='Ward'
										options={
											form.getFieldValue(['events', field.name, 'district'])
												? sortOptions(
														Object.values(wards)
															.filter(
																(ward) =>
																	ward.parent_code ===
																	form.getFieldValue(['events', field.name, 'district'])
															)
															.map((ward) => ({
																label: ward.name_with_type,
																value: ward.code,
															}))
												  )
												: []
										}
										disabled={viewCard}
									/>
								</Form.Item>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item name={[field.name, 'address']}>
					<Input placeholder='Address' disabled={viewCard} />
				</Form.Item>
			</Form.Item>
		</Card>
	)
}

export default FormFields
