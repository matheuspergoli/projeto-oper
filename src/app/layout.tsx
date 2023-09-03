import '@/styles/globals.css'

import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getSession } from '@libs/auth'
import { Toaster } from '@shared/ui/toaster'
import { Provider } from '@provider/Provider'
import { SignInButton } from '@shared/components/SignInButton'
import { SignOutButton } from '@shared/components/SignOutButton'

export const metadata: Metadata = {
	title: 'Oper Blog News',
	description: 'Created by Matheus Pergoli'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession()

	return (
		<html lang='pt-br'>
			<body className='dark'>
				<header className='container mt-10 flex items-center justify-between gap-5'>
					<Link href='/'>
						<Image src='/logo-oper.webp' alt='Logo Oper' width={200} height={200} />
					</Link>
					<div>
						{session ? (
							<SignOutButton>Logout</SignOutButton>
						) : (
							<div className='flex justify-center'>
								<SignInButton>Login</SignInButton>
							</div>
						)}
					</div>
				</header>
				{session?.user.role === 'ADMIN' && (
					<div className='container my-5'>
						<Link href='/dashboard' className='text-xl font-semibold underline'>
							Dashboard
						</Link>
					</div>
				)}
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
