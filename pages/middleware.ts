import { jwtUtil } from "@/utils";
import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export async function middleware (req: NextRequest, ev: NextFetchEvent) {
    const {token = ''} = req.cookies
    try {
        await jwtUtil.isValidToken(token)
        return NextResponse.next()

    } catch (error) {
        const requestedPage = req.page.name
        return NextResponse.redirect(`/auth/login?p=${requestedPage}`)
        
    }

}

export const config = {
    matcher: ['/checkout/address','/checkout/summary']
}
