import { FormListFieldData } from 'antd'
import { Dayjs } from 'dayjs'

export interface Event {
  id?: string
  title?: string // Make title optional
  description?: string
  startDate: string
  startTime?: string
  endTime?: string
  location?: string
}

export interface EventState {
  events: Event[]
  addEvent: (event: Event) => void
  removeEvent: (id: string) => void
  updateEvent: (event: Event) => void
  getEventsByDate: (date: string) => Event[]
}

export interface AddEventModalProps {
  visible: boolean
  selectedDate: string
  setVisible: (visible: boolean) => void
}

export interface AddEventFormProps {
  date: string
}

export interface CalendarHeaderProps {
  value: Dayjs
  onChange: (date: Dayjs) => void
  setCurrentMonth: (date: Dayjs) => void
}

export interface FormValues {
  events: {
    title?: string
    description?: string
    startDate?: Dayjs
    startTime?: Dayjs
    endDate?: Dayjs
    endTime?: Dayjs
  }[]
}

export interface ChildFormProps {
  title: string
  onRemove: () => void
  formItemName: number
  showRemove: boolean
  index: number
}

export interface FormFieldsProps {
  field: FormListFieldData
}
