'use client'

import React from 'react'
import { Input } from '@shared/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { useSession } from 'next-auth/react'
import { useToast } from '@shared/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { SignInButton } from '@shared/components/SignInButton'

import {
	CommentSchemaValidation,
	CommentValidationType
} from '@validations/CommentValidation'

export const CommentForm = () => {
	const router = useRouter()
	const { toast } = useToast()
	const { data: session } = useSession()
	const { id } = useParams() as { id: string }
	const [loading, setLoading] = React.useState(false)

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CommentValidationType>({
		resolver: zodResolver(CommentSchemaValidation)
	})

	const onSubmit = async (data: CommentValidationType) => {
		if (session?.user.id) {
			setLoading(true)

			const response = await fetch(`/api/comment/${id}`, {
				method: 'POST',
				body: JSON.stringify(data)
			})

			if (response.ok) {
				toast({
					title: 'Comentário enviado com sucesso!',
					description: 'Obrigado por comentar!'
				})

				reset()
				router.refresh()
				setLoading(false)
			}
		} else {
			toast({
				title: 'Você precisa estar logado para comentar',
				description: 'Faça login para comentar.'
			})

			setLoading(false)
		}
	}

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
				<Input
					type='text'
					placeholder='Seu comentário'
					{...register('comment')}
					className='rounded-br-none rounded-tr-none'
				/>
				{session ? (
					<Button
						disabled={loading}
						type='submit'
						className='rounded-bl-none rounded-tl-none'>
						{loading ? 'Enviando...' : 'Enviar'}
					</Button>
				) : (
					<SignInButton className='rounded-bl-none rounded-tl-none'>Login</SignInButton>
				)}
			</form>
			{errors.comment && <span className='text-center'>{errors.comment.message}</span>}
		</section>
	)
}
