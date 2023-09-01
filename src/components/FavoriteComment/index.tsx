'use client'

import React from 'react'
import { cn } from '@libs/utils'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface FavoriteCommentProps {
	replyId?: string
	commentId: string
	className?: string
	favoriteCommentId: string
}

export const FavoriteComment: React.FC<FavoriteCommentProps> = ({
	commentId,
	favoriteCommentId,
	className,
	replyId
}) => {
	const router = useRouter()
	const { data: session } = useSession()
	const [loading, setLoading] = React.useState(false)
	const isFavorite = session?.user.id === favoriteCommentId ? 'fill-red-600' : ''

	const handleFavorite = async () => {
		if (!isFavorite) {
			setLoading(true)

			await fetch(`/api/comment/${commentId}/favorite`, {
				method: 'POST',
				headers: {
					'X-Reply-Id': replyId ?? ''
				}
			})

			setLoading(false)
			router.refresh()
		} else {
			setLoading(true)

			await fetch(`/api/comment/${commentId}/favorite`, {
				method: 'DELETE'
			})

			setLoading(false)
			router.refresh()
		}
	}

	return (
		<button
			disabled={loading}
			onClick={handleFavorite}
			className={cn('cursor-pointer p-2', className)}>
			<Heart className={`h-full w-full rounded-full object-cover ${isFavorite}`} />
		</button>
	)
}
