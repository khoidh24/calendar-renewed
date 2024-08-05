import { Modal } from 'antd'
import AddEventForm from './AddEventForm'
import { AddEventModalProps } from '../../types/types'

const AddEventModal: React.FC<AddEventModalProps> = ({
  visible,
  setVisible,
  selectedDate
}) => {
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
          title=''
          closable={false}
        >
          <AddEventForm date={selectedDate} setVisible={setVisible} />
        </Modal>
      )}
    </>
  )
}

export default AddEventModal
