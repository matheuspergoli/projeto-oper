import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const AuthorizationMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname

		const paths = ['/dashboard']

		if (paths?.some((path) => pathname.startsWith(path))) {
			/**
			 * @verification - Exemplo de middleware de autorização para todas as rotas que começam com '/dashboard'
			 */

			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET
			})
			if (!token) {
				return NextResponse.redirect(new URL('/', request.url))
			}
			if (token.role === 'USER') {
				return NextResponse.redirect(new URL('/', request.url))
			}

			console.log('[Authorization Middleware] Log from [Path] ' + pathname)
		}

		return next(request, _next)
	}
}
