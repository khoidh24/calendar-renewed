import { Modal, Typography } from 'antd'

const { Paragraph, Title } = Typography

const DetailMode = () => {
  return (
    <Modal width={700} closable={false} centered>
      <Title level={3} editable>
        This is a title
      </Title>
      <Paragraph editable>This is a Content</Paragraph>
    </Modal>
  )
}

export default DetailMode
