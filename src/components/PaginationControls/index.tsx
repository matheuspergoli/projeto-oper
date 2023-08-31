'use client'

import React from 'react'
import { Button } from '@shared/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
	hasNextPage,
	hasPreviousPage
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const page = searchParams.get('page') ?? '1'
	const limit = searchParams.get('limit') ?? '21'

	return (
		<div className='flex justify-center gap-2'>
			<Button
				disabled={hasPreviousPage}
				onClick={() => {
					router.push(`/?page=${Number(page) - 1}&limit=${limit}`)
				}}>
				Anterior
			</Button>

			<Button
				disabled={hasNextPage}
				onClick={() => {
					router.push(`/?page=${Number(page) + 1}&limit=${limit}`)
				}}>
				Próxima
			</Button>
		</div>
	)
}
