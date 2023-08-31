import { placeholderBlurhash } from '@libs/utils'
import { BlurImage } from '@shared/components/BlurImage'

type Tag = string

type Article = {
	id: string
	title: string
	content: string
	author: string
	published: string
	coverImage: string
	tags: Tag[]
}

export default async function Page() {
	const response = await fetch('https://news-api.lublot.dev/api/posts?_limit=10')
	const json = (await response.json()) as Article[]

	return (
		<main className='container my-10'>
			<section className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{json.map((article) => (
					<article
						key={article.id}
						className='flex flex-col items-center justify-center rounded-md border'>
						<figure>
							<BlurImage
								src={article.coverImage}
								alt={article.title}
								width={300}
								height={300}
								placeholder='blur'
								className='h-full w-full object-cover'
								blurDataURL={placeholderBlurhash}
							/>
						</figure>
						<h2 className='text-2xl font-bold'>{article.title}</h2>
						<p className='text-xl'>{article.author}</p>
						<p className='text-xl'>{article.published}</p>
						<p className='text-xl'>{article.tags}</p>
					</article>
				))}
			</section>
		</main>
	)
}
