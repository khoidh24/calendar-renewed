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
						Form: {
							labelFontSize: 14,
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
