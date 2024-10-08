import {FormListFieldData, FormInstance} from 'antd'
import {Dayjs} from 'dayjs'

export interface Event {
 id: string
 title: string
 description: string
 invitedUsers: string[]
 startDate: string
 during: string
 address?: string
 city?: string
 district?: string
 ward?: string
}

export interface EventState {
 events: Event[]
 addEvent: (event: Event) => void
 removeEvent: (id: string) => void
 updateEvent: (event: Event) => void
 getEventsByDate: (date: string) => Event[]
}

export interface AddEventModalProps {
 selectedDate: string
 visible: boolean
 setVisible: (visible: boolean) => void
 event: Event
 viewCard: boolean
 setViewCard: (viewCard: boolean) => void
 setUnsavedChanges?: (unsavedChanges: boolean) => void
 selectedTime?: string
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
  during?: Dayjs
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
 form?: FormInstance
 viewCard: boolean
}

export interface FormListProps {
 form: FormInstance
 viewCard: boolean
 isEdit: boolean
 setIsEdit: (isEdit: boolean) => void
}

export interface RenderCellProps {
 date: Dayjs
 onEventClick: (event: any) => void
}

export interface ViewCardProps {
 event: Event
}

export interface AddEventFormProps {
 date: string
 setVisible: (visible: boolean) => void
 viewCard: boolean
 setViewCard: (viewCard: boolean) => void
 event: Event
 setUnsavedChanges: (unsavedChanges: boolean) => void
 selectedTime?: string
 isEdit: boolean
 setIsEdit: (isEdit: boolean) => void
}

export interface EventContextProps {
 selectedDate: string
 setSelectedDate: (date: string) => void
 visible: boolean
 setVisible: (visible: boolean) => void
 currentMonth: Dayjs
 setCurrentMonth: (date: Dayjs) => void
 isChangingMonth: boolean
 setIsChangingMonth: (isChanging: boolean) => void
 selectedEvent: Event | null
 setSelectedEvent: (event: Event | null) => void
 viewCard: boolean
 setViewCard: (view: boolean) => void
}
