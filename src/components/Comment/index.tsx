'use client'

import React from 'react'
import { ReplyForm } from '@components/ReplyForm'
import { placeholderBlurhash } from '@libs/utils'
import { BlurImage } from '@shared/components/BlurImage'
import { FavoriteComment } from '@components/FavoriteComment'

interface Reply {
	id: string
	text: string
	user: {
		id: string
		name: string | null
		image: string | null
	}
	favoritesComments: {
		userId: string
	}[]
}

interface CommentProps {
	text: string
	userName: string
	userImage: string
	commentId: string
	replies: Reply[]
	favoriteCommentId: string
}

export const Comment: React.FC<CommentProps> = ({
	userName,
	userImage,
	commentId,
	replies,
	favoriteCommentId,
	text
}) => {
	const [showReplies, setShowReplies] = React.useState(false)

	return (
		<div>
			<div className='relative flex items-center gap-2 rounded-md border p-2'>
				<figure className='h-10 w-10 overflow-hidden rounded-full'>
					<BlurImage
						src={userImage!}
						alt={userName!}
						width={100}
						height={100}
						placeholder='blur'
						className='h-full w-full rounded-full object-cover'
						blurDataURL={placeholderBlurhash}
					/>
				</figure>
				<div>
					<p className='font-semibold'>{userName}</p>
					<p>{text}</p>
					{replies.length > 0 ? (
						<button onClick={() => setShowReplies(!showReplies)}>Ver respostas</button>
					) : null}
				</div>
				<FavoriteComment
					favoriteCommentId={favoriteCommentId}
					commentId={commentId}
					className='absolute right-0 top-0'
				/>
			</div>

			<ReplyForm commentId={commentId} />

			{showReplies ? (
				<div className='mt-2 flex flex-col gap-2'>
					{replies.map((reply) => (
						<div
							key={reply.id}
							className='relative flex items-center gap-2 rounded-md border p-2'>
							<figure className='h-10 w-10 overflow-hidden rounded-full'>
								<BlurImage
									src={reply.user.image!}
									alt={reply.user.name!}
									width={100}
									height={100}
									placeholder='blur'
									className='h-full w-full rounded-full object-cover'
									blurDataURL={placeholderBlurhash}
								/>
							</figure>
							<div>
								<p className='font-semibold'>{reply.user.name}</p>
								<p>{reply.text}</p>
							</div>
							<FavoriteComment
								favoriteCommentId={reply.favoritesComments[0]?.userId ?? ''}
								commentId={reply.id}
								replyId={reply.id}
								className='absolute right-0 top-0'
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
