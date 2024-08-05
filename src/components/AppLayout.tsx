import { ConfigProvider } from 'antd'
import Footer from './Footer'
import Header from './Header'
import CalendarView from './calendar/CalendarView'

const AppLayout = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Calendar: {
              fullBg: 'transparent',
              fullPanelBg: 'transparent',
              itemActiveBg: '#d9dce6'
            },
            Modal: {
              contentBg: '#E9ECF3'
            },
            Button: {
              defaultBg: '#e9ecf3',
              defaultHoverBg: '#E9ECF3',
              defaultActiveBg: '#E9ECF3'
            },
            Form: {
              labelFontSize: 16
            }
          },
          token: {
            colorPrimary: 'rgb(34, 126, 34);',
            controlOutlineWidth: 0
          }
        }}
      >
        <Header />
        <CalendarView />
        <Footer />
      </ConfigProvider>
    </>
  )
}

export default AppLayout
