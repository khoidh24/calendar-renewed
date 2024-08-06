import { ConfigProvider } from 'antd'
import AppLayout from './components/AppLayout'

const App = () => {
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Calendar: {
							fullBg: 'transparent',
							fullPanelBg: 'transparent',
							itemActiveBg: '#d9dce6',
						},
						Modal: {
							contentBg: '#E9ECF3',
						},
						Button: {
							defaultBg: '#e9ecf3',
							defaultHoverBg: '#E9ECF3',
							defaultActiveBg: '#E9ECF3',
						},
						Form: {
							labelFontSize: 16,
						},
					},
					token: {
						colorPrimary: '#227E22',
						controlOutlineWidth: 0,
					},
				}}
			>
				<AppLayout />
			</ConfigProvider>
		</>
	)
}

export default App
