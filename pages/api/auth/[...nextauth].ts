//http://localhost:3000/api/auth/signin

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // ...add more providers here
    Credentials({
      name:'Custom Login',
      credentials: {
        email: {label:'Email:', type: 'email', placeholder: 'correo@correo.com'},
        password: {label:'Password:', type: 'password', placeholder: 'xxxxxxx'},
     
      },
      async authorize( credentials ){
        return await dbUsers.checkUserEmailPassword(credentials?.email, credentials?.password)
      }
    }),

  ],
  pages: {
    signIn: '/auth/login', newUser: '/auth/register'
  },

  session: {
    maxAge: 2922000, // cada mes
    strategy: 'jwt',
    updateAge: 86400 //cada dia
  },
  //callbacks
  callbacks: {
    async jwt({ token, account, user}) {

      if ( account ) {
        token.accessToken = account.access_token
        switch ( account.type ) {
          
          case 'oauth': 
                token.user = await dbUsers.oauthToDbUser(user?.email || '', user?.name || '')
                break
            case 'credentials': 
                  token.user = user
                  break

        }
      }

    //  console.log({token, account, user})

      return token
    },

    async session({ session, token, user}) {

      session.accessToken = token.accessToken
      session.user = token.user as any
      return session
    }
  }
}
export default NextAuth(authOptions)