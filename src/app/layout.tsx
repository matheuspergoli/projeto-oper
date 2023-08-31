import '@/styles/globals.css'

import Image from 'next/image'
import type { Metadata } from 'next'
import { Provider } from '@provider/Provider'

export const metadata: Metadata = {
	title: 'Oper Blog News',
	description: 'Created by Matheus Pergoli'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-br'>
			<body className='dark'>
				<header className='container mt-10'>
					<Image src='/logo-oper.webp' alt='Logo Oper' width={200} height={200} />
				</header>
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
