export const getPost = async (id: string) => {
	const response = await fetch(`https://news-api.lublot.dev/api/posts/${id}`)

	const data = (await response.json()) as Article

	return data
}
