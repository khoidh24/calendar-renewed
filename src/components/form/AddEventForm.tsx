import React, { useEffect, useState } from 'react'
import { Button, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { AddEventFormProps, FormValues } from '../../types/types'
import dayjs from 'dayjs'
import ChildForm from './ChildForm'

const AddEventForm: React.FC<AddEventFormProps> = ({ date }) => {
  const [form] = Form.useForm()
  const [forms, setForms] = useState([{ id: 0, title: '' }])

  const onFinish = (values: FormValues) => {
    console.log('Received values of form:', values)
  }

  useEffect(() => {
    if (date) {
      const parsedDate = dayjs(date, 'DD-MM-YYYY HH:mm A')
      form.setFieldsValue({
        forms: [
          {
            fromDate: parsedDate,
            startTime: parsedDate
          }
        ]
      })
    }
  }, [date, form])

  const addForm = () => {
    setForms([...forms, { id: forms.length, title: '' }])
  }

  const removeForm = (id: number) => {
    setForms(forms.filter((form) => form.id !== id))
  }

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{
        forms: [
          {
            fromDate: dayjs(date, 'DD-MM-YYYY'),
            startTime: dayjs(date, 'hh:mm A')
          }
        ]
      }}
    >
      <Form.List name='forms'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ChildForm
                index={field.key}
                key={field.key}
                title={field.name.toString()}
                onRemove={() => {
                  remove(field.name)
                }}
                formItemName={index}
                showRemove={forms.length > 1}
              />
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => {
                  add()
                  addForm()
                }}
                block
                icon={<PlusOutlined />}
              >
                Add Event
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Button type='primary' htmlType='submit' className='w-[100%] mt-8'>
        Submit
      </Button>
    </Form>
  )
}

export default AddEventForm
