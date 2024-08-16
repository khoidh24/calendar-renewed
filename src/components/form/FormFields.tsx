/* eslint-disable no-mixed-spaces-and-tabs */
import {
 Avatar,
 Col,
 DatePicker,
 Divider,
 Form,
 Input,
 Row,
 Select,
 TimePicker,
 Typography,
} from 'antd'
import dayjs from 'dayjs'
import {FormFieldsProps} from '../../types/types'
import cities from '../../data/city.json'
import districts from '../../data/district.json'
import wards from '../../data/ward.json'
import users from '../../data/user.json'
import sortOptions from '../../utils/sortOptions'
import {unAccent} from '../../utils/unAccent'
import {AlignLeft, Building2, Clock, User, X} from 'lucide-react'
const {TextArea} = Input

const FormFields: React.FC<FormFieldsProps> = ({field, form, viewCard}) => {
 const allUsers = Form.useWatch(['events', field.name, 'invitedUsers']) || []

 const getUserNameById = (userId: string) => {
  const user = users.find((user) => user.id === userId)
  return user ? user.name : userId
 }

 const cityOptions = sortOptions(
  Object.values(cities).map((city) => ({
   label: city.name_with_type,
   value: city.code,
  })),
 )

 const userOptions = Object.values(users).map((user) => ({
  label: user.name,
  value: user.id,
 }))

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

 const today = dayjs(new Date())
 const startDate = form?.getFieldValue(['events', field.name, 'startDate'])
 const during = form?.getFieldValue(['events', field.name, 'during'])
 const isEventPassed =
  viewCard &&
  (dayjs(startDate).isBefore(today, 'day') ||
   (dayjs(startDate).isSame(today, 'day') &&
    dayjs(during?.[0]).isBefore(today)))

 return (
  <>
   <Form.Item
    noStyle
    key={field.key}
    className={`mb-4 bg-transparent form-detail ${viewCard ? 'view-mode' : ''}`}
   >
    {renderField(
     'title',
     <Form.Item name={[field.name, 'title']} className='ml-[28px]'>
      <Input placeholder='Add title...' className='text-2xl font-bold' />
     </Form.Item>,
    )}
    {renderField(
     'description',
     <>
      <Form.Item
       name={[field.name, 'description']}
       label={<AlignLeft size={14} />}
      >
       <TextArea
        autoSize={viewCard ? {maxRows: 1} : {minRows: 2, maxRows: 5}}
        placeholder='Detail of the event...'
       />
      </Form.Item>
     </>,
    )}
    {renderField(
     'startDate',
     <>
      <Divider></Divider>
      <Form.Item label={<Clock size={14} />} className='mb-0' required={true}>
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
          className={`${viewCard ? 'mb-0' : ''}`}
         >
          <DatePicker
           placeholder='Start date...'
           format={'DD-MM-YYYY'}
           className='w-[100%]'
           disabledDate={(current) => current.isBefore(dayjs(), 'day')}
           needConfirm={false}
           onChange={() => {
            form.validateFields([['events', field.name, 'during']])
           }}
          />
         </Form.Item>
        </Col>
        {renderField(
         'during',
         <Col xs={24} sm={12}>
          <Form.Item
           className={`${viewCard ? 'mb-0' : ''}`}
           name={[field.name, 'during']}
           rules={[
            {
             required: true,
             message: 'Duration is required',
            },
            {
             validator: async (_, value) => {
              const startDate = form.getFieldValue([
               'events',
               field.name,
               'startDate',
              ])

              if (value && value[0] && value[1]) {
               const startDateTime = dayjs(startDate)
                .hour(dayjs(value[0]).hour())
                .minute(dayjs(value[0]).minute())
               const startTimeValue = dayjs(value[0])
               const endTimeValue = dayjs(value[1])

               if (startDateTime.isBefore(dayjs())) {
                return Promise.reject('Start time must be after current time')
               }

               if (startTimeValue.isSame(endTimeValue, 'minute')) {
                const newEndTime = startTimeValue.add(1, 'hour')
                form.setFieldValue(
                 ['events', field.name, 'during'],
                 [value[0], dayjs(newEndTime)],
                )
                return Promise.resolve()
               }
              } else {
               return Promise.reject()
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
         </Col>,
        )}
       </Row>
      </Form.Item>
     </>,
    )}
    {!viewCard && (
     <>
      <Divider></Divider>
      <Form.Item label={<User size={14} />} name={[field.name, 'invitedUsers']}>
       <Select
        allowClear
        showSearch
        optionFilterProp='label'
        filterOption={filterOption}
        placeholder='Select user...'
        tagRender={() => <></>}
        mode='multiple'
        className='w-full'
        options={userOptions}
       />
      </Form.Item>
     </>
    )}
    {allUsers.length > 0 && (
     <>
      {viewCard && <Divider></Divider>}

      <Form.Item>
       <Typography.Paragraph>User list:</Typography.Paragraph>
       <ul
        className={allUsers.length > 4 ? 'max-h-[192px] overflow-y-auto' : ''}
       >
        {allUsers.map((user: string) => {
         return (
          <li key={user}>
           <div className='py-2 w-full flex items-center justify-between'>
            <div className='flex items-center gap-4 flex-1'>
             <Avatar icon={<User />} />
             <p>{getUserNameById(user)}</p>
            </div>
            <div className='flex items-center flex-1'>
             <p className='text-emerald-600 ml-4'>(Available)</p>
            </div>
            <div className='flex flex-1'>
             {!viewCard && (
              <X
               size={14}
               className='cursor-pointer ml-auto'
               onClick={() => {
                const newSelectedUsers = allUsers.filter((u: any) => u !== user)
                form.setFieldValue(
                 ['events', field.name, 'invitedUsers'],
                 newSelectedUsers,
                )
               }}
              />
             )}
            </div>
           </div>
          </li>
         )
        })}
       </ul>
      </Form.Item>
     </>
    )}

    {viewCard &&
    !form?.getFieldValue(['events', field.name, 'city']) &&
    !form?.getFieldValue(['events', field.name, 'district']) &&
    !form?.getFieldValue(['events', field.name, 'ward']) &&
    !form?.getFieldValue(['events', field.name, 'address']) ? null : (
     <>
      <Divider></Divider>
      <Form.Item label={<Building2 size={14} />}>
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
        </Form.Item>,
       )}
       <Row gutter={24}>
        {renderField(
         'district',
         <Col xs={24} sm={12}>
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
              className={
               !viewCard && !form?.getFieldValue(['events', field.name, 'city'])
                ? 'select-disabled-not-view-mode'
                : ''
              }
              options={
               form?.getFieldValue(['events', field.name, 'city'])
                ? sortOptions(
                   Object.values(districts)
                    .filter(
                     (district) =>
                      district.parent_code ===
                      form?.getFieldValue(['events', field.name, 'city']),
                    )
                    .map((district) => ({
                     label: district.name_with_type,
                     value: district.code,
                    })),
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
         </Col>,
        )}
        {renderField(
         'ward',
         <Col xs={24} sm={12}>
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
              className={
               !viewCard &&
               !form?.getFieldValue(['events', field.name, 'district'])
                ? 'select-disabled-not-view-mode'
                : ''
              }
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
                      form?.getFieldValue(['events', field.name, 'district']),
                    )
                    .map((ward) => ({
                     label: ward.name_with_type,
                     value: ward.code,
                    })),
                  )
                : []
              }
             />
            </Form.Item>
           )}
          </Form.Item>
         </Col>,
        )}
       </Row>
       {renderField(
        'address',
        <Form.Item name={[field.name, 'address']} className='address'>
         <Input placeholder='Address' />
        </Form.Item>,
       )}
      </Form.Item>
     </>
    )}
    {isEventPassed && (
     <>
      <Divider></Divider>
      <Typography.Paragraph className=''>
       <strong>NOTE:</strong> This event has passed and is no longer editable.
      </Typography.Paragraph>
     </>
    )}
   </Form.Item>
  </>
 )
}

export default FormFields
