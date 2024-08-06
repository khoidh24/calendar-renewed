import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import FormFields from './FormFields'
import { FormListProps } from '../../types/types'

const FormList: React.FC<FormListProps> = ({ form, viewCard }) => {
	return (
		<>
			<Form.List name='events'>
				{(fields, { add, remove }) => (
					<>
						{fields.map((field) => (
							<div key={field.key}>
								<FormFields field={field} form={form} viewCard={viewCard} />
								{fields.length > 1 && (
									<Button
										type='dashed'
										danger
										onClick={() => remove(field.name)}
										className='w-[100%] mb-10'
									>
										<CloseOutlined /> Remove this form
									</Button>
								)}
							</div>
						))}

						{!viewCard && (
							<Button
								icon={<PlusCircleOutlined />}
								className='w-[100%]'
								type='dashed'
								onClick={() => add()}
							>
								Add Item
							</Button>
						)}
					</>
				)}
			</Form.List>
		</>
	)
}

export default FormList
