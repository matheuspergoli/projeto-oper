import Link from 'next/link'
import { getPosts } from '@actions/getPosts'
import { ArticleCard } from '@components/ArticleCard'
import { PaginationControls } from '@components/PaginationControls'

interface HomeProps {
	searchParams: {
		[key: string]: string | string[] | undefined
	}
}

export default async function Home({ searchParams }: HomeProps) {
	const page = searchParams['page'] ?? '1'
	const limit = searchParams['limit'] ?? '21'
	const start = (Number(page) - 1) * Number(limit)
	// const end = start + Number(limit)

	const posts = await getPosts(page as string, limit as string)

	return (
		<main className='container my-10'>
			<section className='mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
				{posts.map((article) => (
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

			<PaginationControls
				hasNextPage={posts.length !== 21}
				hasPreviousPage={start === 0}
			/>
		</main>
	)
}
