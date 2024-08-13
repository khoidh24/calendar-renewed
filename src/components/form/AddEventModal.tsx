import { Modal } from 'antd'
import AddEventForm from './AddEventForm'
import { AddEventModalProps } from '../../types/types'
import { useRef, useState, useEffect } from 'react'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'

const AddEventModal: React.FC<AddEventModalProps> = ({
  visible,
  setVisible,
  selectedDate,
  event,
  viewCard,
  setViewCard
}) => {
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const [unsavedChanges, setUnsavedChanges] = useState(false) // Track unsaved changes
  const draggleRef = useRef<HTMLDivElement>(null)

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }

  const beforeClose = () => {
    if (unsavedChanges) {
      Modal.confirm({
        centered: true,
        title: 'Discard changes?',
        content:
          'You have unsaved changes. Are you sure you want to discard them?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          setUnsavedChanges(false)
          setVisible(false)
        }
      })
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    if (visible) {
      setUnsavedChanges(false)
    }
  }, [visible])

  return (
    <>
      {visible && (
        <Modal
          title={
            <div
              className='w-full cursor-move h-[20px]'
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
          }
          destroyOnClose
          open={visible}
          onCancel={beforeClose} // Use beforeClose function
          onClose={beforeClose} // Use beforeClose function
          onOk={beforeClose} // Use beforeClose function
          centered
          width={500}
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
              setUnsavedChanges={setUnsavedChanges} // Pass the prop
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default AddEventModal
