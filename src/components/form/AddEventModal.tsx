import {Dropdown, message, Modal, Tooltip, Form} from 'antd'
import AddEventForm from './AddEventForm'
import {AddEventModalProps} from '../../types/types'
import {useRef, useState, useEffect} from 'react'
import type {DraggableData, DraggableEvent} from 'react-draggable'
import Draggable from 'react-draggable'
import {Ellipsis, PenLine, Trash2} from 'lucide-react'
import type {MenuProps} from 'antd'
import useCalendar from '../../storage/store'
import dayjs from 'dayjs'

const AddEventModal: React.FC<AddEventModalProps> = ({
 visible,
 setVisible,
 selectedDate,
 selectedTime,
 event,
 viewCard,
 setViewCard,
}) => {
 const [disabled, setDisabled] = useState(true)
 const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0})
 const [unsavedChanges, setUnsavedChanges] = useState(false) // Track unsaved changes
 const [isEdit, setIsEdit] = useState(false) // Add isEdit state
 const draggleRef = useRef<HTMLDivElement>(null)
 const removeEvent = useCalendar((state) => state.removeEvent)
 const [form] = Form.useForm() // Create form instance

 const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
  const {clientWidth, clientHeight} = window.document.documentElement
  const targetRect = draggleRef.current?.getBoundingClientRect()
  if (!targetRect) {
   return
  }
  setBounds({
   left: -targetRect.left + uiData.x,
   right: clientWidth - (targetRect.right - uiData.x),
   top: -targetRect.top + uiData.y,
   bottom: clientHeight - (targetRect.bottom - uiData.y),
  })
 }

 const beforeClose = () => {
  if (unsavedChanges) {
   Modal.confirm({
    centered: true,
    title: 'Discard changes?',
    content: 'You have unsaved changes. Are you sure you want to discard them?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
     setUnsavedChanges(false)
     setVisible(false)
     setIsEdit(false)
    },
   })
  } else {
   setVisible(false)
   setIsEdit(false)
  }
 }

 useEffect(() => {
  if (visible) {
   setUnsavedChanges(false)
  }
 }, [visible])

 const showDeleteConfirm = () => {
  Modal.confirm({
   centered: true,
   title: 'Are you sure delete this event?',
   content: 'This action cannot be undone.',
   okText: 'Yes',
   okType: 'danger',
   cancelText: 'No',
   onOk() {
    removeEvent(event.id)
    setVisible(false)
    message.success('Event deleted successfully!', 2)
   },
  })
 }

 const items: MenuProps['items'] = [
  {
   key: '1',
   label: (
    <button
     className='flex flex-row justify-center items-center gap-1'
     onClick={showDeleteConfirm}
    >
     <Trash2 size={16} />
     <p>Delete</p>
    </button>
   ),
  },
 ]

 const isEventEditable = () => {
  if (!event) {
   return false
  }

  const now = dayjs()
  const eventStartDate = dayjs(event.startDate, 'DD-MM-YYYY')
  const eventStartTime = dayjs(event.during[0])

  return (
   eventStartDate.isAfter(now, 'day') ||
   (eventStartDate.isSame(now, 'day') && eventStartTime.isAfter(now))
  )
 }

 return (
  <>
   {visible && (
    <Modal
     title={
      <div className='flex flex-row justify-between items-center flex-1 mx-4'>
       {!isEdit && isEventEditable() ? (
        <Tooltip title='Edit'>
         <button
          onClick={() => {
           setIsEdit(true) // Set isEdit to true
           setViewCard(false)
           form.resetFields() // Reset form fields
           message.open({
            type: 'info',
            content: 'You are in edit mode.',
            duration: 2,
           })
          }}
         >
          <PenLine size={16} color='#888' />
         </button>
        </Tooltip>
       ) : (
        ''
       )}
       <div
        className='cursor-move h-[16px] flex-1 w-full'
        onMouseOver={() => {
         if (disabled) {
          setDisabled(false)
         }
        }}
        onMouseOut={() => {
         setDisabled(true)
        }}
        onFocus={() => {}}
        onBlur={() => {}}
       ></div>
       <Dropdown menu={{items}} trigger={['click']} className='mr-4'>
        <Tooltip title='Options'>
         <Ellipsis size={16} color='#888' className='cursor-pointer' />
        </Tooltip>
       </Dropdown>
      </div>
     }
     destroyOnClose
     open={visible}
     onCancel={beforeClose} // Use beforeClose function
     onClose={beforeClose} // Use beforeClose function
     onOk={beforeClose} // Use beforeClose function
     centered
     width={600}
     footer={null}
     mask={false}
     maskClosable={true}
     modalRender={(modal) => (
      <Draggable
       disabled={disabled}
       bounds={bounds}
       nodeRef={draggleRef}
       onStart={(event, uiData) => onStart(event, uiData)}
      >
       <div ref={draggleRef}>{modal}</div>
      </Draggable>
     )}
    >
     <div className='max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden'>
      <AddEventForm
       date={selectedDate}
       setVisible={setVisible}
       viewCard={viewCard}
       event={event}
       setViewCard={setViewCard}
       setUnsavedChanges={setUnsavedChanges}
       selectedTime={selectedTime}
       isEdit={isEdit} // Pass isEdit state as prop
       setIsEdit={setIsEdit} // Pass setIsEdit function as prop
      />
     </div>
    </Modal>
   )}
  </>
 )
}

export default AddEventModal
