export const getPosts = async (page: string, limit: string) => {
	const response = await fetch(
		`https://news-api.lublot.dev/api/posts?_page=${page}&_limit=${limit}`
	)

	const data = (await response.json()) as Article[]

	return data
}
