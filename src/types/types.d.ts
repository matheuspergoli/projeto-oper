type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

type Tag = string

interface Article {
	id: string
	title: string
	content: string
	author: string
	published: string
	coverImage: string
	tags: Tag[]
}
