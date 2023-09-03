import Link from 'next/link'
import { prisma } from '@libs/prisma'
import { ArticleCard } from '@components/ArticleCard'

export default async function Page() {
	const commentedArticles = await prisma.article.findMany({})

	const articles = (await Promise.all(
		commentedArticles.map(async (article) => {
			const response = await fetch(
				`https://news-api.lublot.dev/api/posts/${article.articleReference}`
			)
			if (!response.ok) {
				throw new Error(`Failed to fetch article: ${article.articleReference}`)
			}
			const data = await response.json()
			return data
		})
	)) as Article[]

	return (
		<main className='container my-10'>
			<h1 className='text-2xl font-semibold'>
				{articles.length === 0 ? 'Nenhum artigo comentado' : 'Artigos comentados'}
			</h1>
			<section className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
				{articles.map((article) => (
					<Link key={article.id} href={`/post/${article.id}`}>
						<ArticleCard
							title={article.title}
							author={article.author}
							published={article.published}
							coverImage={article.coverImage}
							tags={article.tags}
						/>
					</Link>
				))}
			</section>
		</main>
	)
}
