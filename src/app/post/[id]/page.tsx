import Link from 'next/link'
import { format } from 'date-fns'
import { getPost } from '@actions/getPost'
import { getPosts } from '@actions/getPosts'
import { placeholderBlurhash } from '@libs/utils'
import { ArticleCard } from '@components/ArticleCard'
import { BlurImage } from '@shared/components/BlurImage'

export default async function Post({ params }: { params: { id: string } }) {
	const randomNumber = String(Math.floor(Math.random() * 10) + 1)
	const post = await getPost(params.id)
	const posts = await getPosts(randomNumber, '3')

	return (
		<main className='container my-10'>
			<section className='flex flex-col items-center gap-3'>
				<p className=''>{format(new Date(post.published), 'dd/MM/yyyy')}</p>
				<div className='flex items-center gap-2'>
					{post.tags.map((tag) => (
						<span key={tag}>#{tag}</span>
					))}
				</div>
				<h1 className='text-center text-2xl font-semibold'>{post.title}</h1>
				<h2 className='text-xl font-semibold underline'>Escrito por {post.author}</h2>

				<figure className='overflow-hidden rounded-md'>
					<BlurImage
						src={post.coverImage}
						alt={post.title}
						width={500}
						height={500}
						placeholder='blur'
						className='h-full w-full rounded-md object-cover'
						blurDataURL={placeholderBlurhash}
					/>
				</figure>
			</section>

			<article className='prose-invert prose mx-auto mt-10 w-fit text-center'>
				{post.content.split('\n').map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</article>

			<h4 className='mb-5 mt-32 text-2xl font-bold'>Mais artigos</h4>
			<section className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
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
		</main>
	)
}
