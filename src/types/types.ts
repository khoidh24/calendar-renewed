import { Dayjs } from 'dayjs'

export interface Event {
  id: string
  date: Dayjs
  title: string
  description?: string
  location?: string
}

export interface EventState {
  events: Event[]
  addEvent: (event: Event) => void
  removeEvent: (id: string) => void
  updateEvent: (event: Event) => void
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
  setCurrentDate: (date: Dayjs) => void
}

export interface FormValues {
  forms: {
    title?: string
    description?: string
    fromDate?: Dayjs
    endDate?: Dayjs
    startTime?: Dayjs
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
