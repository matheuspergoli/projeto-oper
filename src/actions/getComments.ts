import { prisma } from '@libs/prisma'

export const getComments = async (articleId: string) => {
	const articleComments = await prisma.article.findMany({
		where: {
			articleReference: articleId
		},
		select: {
			comments: {
				select: {
					id: true,
					text: true,
					user: {
						select: {
							name: true,
							image: true
						}
					},
					favoritesComments: {
						select: {
							userId: true
						}
					},
					replies: {
						select: {
							id: true,
							text: true,
							user: {
								select: {
									id: true,
									name: true,
									image: true
								}
							},
							favoritesComments: {
								select: {
									userId: true
								}
							}
						}
					}
				}
			}
		}
	})

	return articleComments[0]?.comments
}
