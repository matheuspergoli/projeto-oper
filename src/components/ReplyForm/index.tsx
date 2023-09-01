'use client'

import React from 'react'
import { Input } from '@shared/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useToast } from '@shared/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInButton } from '@shared/components/SignInButton'

import {
	CommentValidationType,
	CommentSchemaValidation
} from '@validations/CommentValidation'

interface ReplyFormProps {
	commentId: string
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ commentId }) => {
	const router = useRouter()
	const { toast } = useToast()
	const { data: session } = useSession()
	const [loading, setLoading] = React.useState(false)
	const [loadReply, setLoadReply] = React.useState(false)

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

			const response = await fetch(`/api/reply/${commentId}`, {
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
				setLoadReply(false)
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
		<div className='flex flex-col'>
			<button
				onClick={() => {
					reset()
					setLoadReply(!loadReply)
				}}
				className='text-sm text-gray-500 hover:text-gray-700'>
				Responder
			</button>
			{loadReply && (
				<form onSubmit={handleSubmit(onSubmit)} className='mt-2 flex flex-col gap-2'>
					<Input
						placeholder='Digite sua resposta'
						className='w-full'
						type='text'
						{...register('comment')}
					/>
					{errors.comment && (
						<span className='text-center'>{errors.comment.message}</span>
					)}
					{session ? (
						<Button disabled={loading} type='submit'>
							{loading ? 'Enviando...' : 'Enviar'}
						</Button>
					) : (
						<SignInButton>Login</SignInButton>
					)}
				</form>
			)}
		</div>
	)
}
