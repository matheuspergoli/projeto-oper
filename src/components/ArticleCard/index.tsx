import React from 'react'
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { placeholderBlurhash } from '@libs/utils'
import { BlurImage } from '@shared/components/BlurImage'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@shared/ui/card'

type CardProps = Omit<Article, 'id' | 'content'>

export const ArticleCard: React.FC<CardProps> = ({
	tags,
	title,
	author,
	published,
	coverImage
}) => {
	return (
		<Card className='group'>
			<CardHeader>
				<CardTitle className='truncate'>{title}</CardTitle>
				<CardDescription className='flex flex-wrap items-center gap-2 text-sm'>
					{tags.map((tag) => (
						<span key={tag}>#{tag}</span>
					))}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<figure className='overflow-hidden rounded-md'>
					<BlurImage
						src={coverImage}
						alt={title}
						width={300}
						height={200}
						placeholder='blur'
						className='h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105'
						blurDataURL={placeholderBlurhash}
					/>
				</figure>
			</CardContent>
			<CardFooter className='flex flex-col items-start gap-2'>
				<p className='rounded-md border px-2'>
					Publicado{' '}
					{formatDistanceToNow(new Date(published), {
						locale: ptBR,
						addSuffix: true
					})}
				</p>

				<p className='rounded-md border px-2'>Escrito por {author}</p>
			</CardFooter>
		</Card>
	)
}
