import { cn } from '@libs/utils'
import { buttonVariants } from '@shared/ui/button'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='container my-20 flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold'>404</h1>
			<p className='text-xl font-medium'>Página não encontrada</p>
			<Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
				Voltar para a página inicial
			</Link>
		</div>
	)
}
