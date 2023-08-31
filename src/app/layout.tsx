import '@/styles/globals.css'

import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Toaster } from '@shared/ui/toaster'
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
					<Link href='/'>
						<Image src='/logo-oper.webp' alt='Logo Oper' width={200} height={200} />
					</Link>
				</header>
				<Provider>{children}</Provider>
				<footer>
					<div className='container mt-10'>
						<p className='text-center'>
							Feito com ❤️ por{' '}
							<a
								href='https://matheuspergoli-portfolio.vercel.app/'
								target='_blank'
								rel='noreferrer'
								className='underline'>
								Matheus Pergoli
							</a>
						</p>
					</div>
				</footer>
				<Toaster />
			</body>
		</html>
	)
}
