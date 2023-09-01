import { prisma } from '@libs/prisma'
import { getSession } from '@libs/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: { params: { id: string } }) {
	const session = await getSession()

	if (!session) {
		return new Response('Unauthorized', { status: 401 })
	}

	const replyId = request.headers.get('X-Reply-Id') || null

	const newFavoriteComment = await prisma.favoriteComment.create({
		data: {
			userId: session.user.id,
			commentId: params.id,
			replyId
		}
	})

	return NextResponse.json({ message: 'Comment favorited', comment: newFavoriteComment })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const session = await getSession()

	if (!session) {
		return new Response('Unauthorized', { status: 401 })
	}

	await prisma.favoriteComment.deleteMany({
		where: {
			userId: session.user.id,
			commentId: params.id
		}
	})

	return NextResponse.json({ message: 'Comment unfavorited' })
}
