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
import { unAccent } from '../../utils/unAccent'

const { TextArea } = Input

const FormFields: React.FC<FormFieldsProps> = ({ field, form, viewCard }) => {
	const cityOptions = sortOptions(
		Object.values(cities).map((city) => ({
			label: city.name_with_type,
			value: city.code,
		}))
	)

	const filterOption = (input: string, option: any) => {
		if (option?.label) {
			return unAccent(option.label).includes(unAccent(input))
		}
		return false
	}

	const renderField = (name: string, component: React.ReactNode) => {
		if (viewCard && !form?.getFieldValue(['events', field.name, name])) {
			return null
		}
		return component
	}

	return (
		<Card
			title={null}
			key={field.key}
			className={`mb-4 shadow-lg form-detail ${viewCard ? 'view-mode' : ''}`}
		>
			{renderField(
				'title',
				<Form.Item name={[field.name, 'title']} label='Title'>
					<Input
						placeholder={`Event ${field.name + 1}`}
						className='text-2xl font-bold'
					/>
				</Form.Item>
			)}
			{renderField(
				'description',
				<Form.Item name={[field.name, 'description']} label='Description'>
					<TextArea
						autoSize={viewCard ? { maxRows: 1 } : { minRows: 5, maxRows: 9 }}
						placeholder='Detail of the event...'
					/>
				</Form.Item>
			)}
			{renderField(
				'startDate',
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
								/>
							</Form.Item>
						</Col>
						{renderField(
							'during',
							<Col xs={24} sm={12}>
								<Form.Item
									name={[field.name, 'during']}
									rules={[
										{
											required: true,
											message: 'Duration is required',
										},
										{
											validator: async (_, value) => {
												if (value && value[0] && dayjs(value[0]).isBefore(dayjs())) {
													return Promise.reject('Start time must be after current time')
												}
												return Promise.resolve()
											},
										},
									]}
								>
									<TimePicker.RangePicker
										format={'hh:mm A'}
										className='w-[100%]'
										needConfirm={false}
										minuteStep={15}
									/>
								</Form.Item>
							</Col>
						)}
					</Row>
				</Form.Item>
			)}
			{viewCard &&
			!form?.getFieldValue(['events', field.name, 'city']) &&
			!form?.getFieldValue(['events', field.name, 'district']) &&
			!form?.getFieldValue(['events', field.name, 'ward']) &&
			!form?.getFieldValue(['events', field.name, 'address']) ? null : (
				<Form.Item label='Location'>
					{renderField(
						'city',
						<Form.Item name={[field.name, 'city']}>
							<Select
								allowClear
								showSearch
								optionFilterProp='label'
								placeholder='City'
								options={cityOptions}
								filterOption={filterOption}
								onChange={() => {
									form?.resetFields([
										['events', field.name, 'district'],
										['events', field.name, 'ward'],
									])
								}}
							/>
						</Form.Item>
					)}
					<Row gutter={24}>
						{renderField(
							'district',
							<Col xs={24} sm={14}>
								<Form.Item dependencies={[['events', field.name, 'city']]}>
									{() => (
										<Form.Item name={[field.name, 'district']} noStyle>
											<Select
												allowClear
												filterOption={filterOption}
												disabled={
													!form?.getFieldValue(['events', field.name, 'city']) || viewCard
												}
												showSearch
												optionFilterProp='label'
												placeholder='District'
												options={
													form?.getFieldValue(['events', field.name, 'city'])
														? sortOptions(
																Object.values(districts)
																	.filter(
																		(district) =>
																			district.parent_code ===
																			form?.getFieldValue(['events', field.name, 'city'])
																	)
																	.map((district) => ({
																		label: district.name_with_type,
																		value: district.code,
																	}))
														  )
														: []
												}
												onChange={() => {
													form?.resetFields([['events', field.name, 'ward']])
												}}
											/>
										</Form.Item>
									)}
								</Form.Item>
							</Col>
						)}
						{renderField(
							'ward',
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
												allowClear
												filterOption={filterOption}
												optionFilterProp='label'
												disabled={
													!form?.getFieldValue(['events', field.name, 'district']) ||
													viewCard
												}
												showSearch
												placeholder='Ward'
												options={
													form?.getFieldValue(['events', field.name, 'district'])
														? sortOptions(
																Object.values(wards)
																	.filter(
																		(ward) =>
																			ward.parent_code ===
																			form?.getFieldValue(['events', field.name, 'district'])
																	)
																	.map((ward) => ({
																		label: ward.name_with_type,
																		value: ward.code,
																	}))
														  )
														: []
												}
											/>
										</Form.Item>
									)}
								</Form.Item>
							</Col>
						)}
					</Row>
					{renderField(
						'address',
						<Form.Item name={[field.name, 'address']}>
							<Input placeholder='Address' />
						</Form.Item>
					)}
				</Form.Item>
			)}
		</Card>
	)
}

export default FormFields
