import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const session = await getToken({req,secret: process.env.NEXTAUTH_SECRET })
    // console.log('sesion 1 ----->>>>')
    // console.log( { session })
    //return NextResponse.redirect(new URL('/home', req.url));
    if( !session ) {
      //console.log('sesion 2 ----->>>>')
        const reqPage = req.nextUrl.pathname
        const url  = req.nextUrl.clone()
        url.pathname = `/auth/login`
        url.search = `p=${reqPage}`
        return  NextResponse.redirect(url)
    }
    console.log('sesion 3 ----->>>>')
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
};