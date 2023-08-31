export const env = {
	DATABASE_URL: process.env.DATABASE_URL as string,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
	NODE_ENV: process.env.NODE_ENV as string
}
