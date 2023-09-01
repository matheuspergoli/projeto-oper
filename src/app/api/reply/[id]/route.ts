import { prisma } from '@libs/prisma'
import { getSession } from '@libs/auth'
import { NextResponse } from 'next/server'
import { CommentSchemaValidation } from '@validations/CommentValidation'

export async function POST(request: Request, { params }: { params: { id: string } }) {
	const session = await getSession()

	if (!session) {
		return new Response('Unauthorized', { status: 401 })
	}

	const body = await request.json()

	const comment = CommentSchemaValidation.parse(body)

	const newReply = await prisma.reply.create({
		data: {
			text: comment.comment,
			user: {
				connect: {
					id: session.user.id
				}
			},
			comment: {
				connect: {
					id: params.id
				}
			}
		}
	})

	return NextResponse.json({ message: 'Comment created', comment: newReply })
}
