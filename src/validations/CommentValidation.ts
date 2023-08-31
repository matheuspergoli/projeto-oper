import { z } from 'zod'

export const CommentSchemaValidation = z.object({
	comment: z
		.string()
		.min(10, 'Comentário deve ter pelo menos 10 caracteres')
		.max(100, 'Comentário deve ter no máximo 100 caracteres')
})

export type CommentValidationType = z.infer<typeof CommentSchemaValidation>
