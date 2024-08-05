import { Modal } from 'antd'
import AddEventForm from './AddEventForm'
import { AddEventModalProps } from '../../types/types'
import dayjs from 'dayjs'

const AddEventModal: React.FC<AddEventModalProps> = ({
  visible,
  setVisible,
  selectedDate
}) => {
  const formattedDate = dayjs(selectedDate, 'DD-MM-YYYY HH:mm A').format(
    'DD-MM-YYYY'
  )

  return (
    <>
      {visible && (
        <Modal
          destroyOnClose
          open={visible}
          onCancel={() => setVisible(false)}
          onClose={() => setVisible(false)}
          onOk={() => setVisible(false)}
          centered
          width={700}
          footer={null}
          title={`Create Event for ${formattedDate}`}
        >
          <AddEventForm date={selectedDate} />
        </Modal>
      )}
    </>
  )
}

export default AddEventModal
