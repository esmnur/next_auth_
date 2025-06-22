import type { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }

      if (profile) {
        const auth0Profile = profile as any

        token.role =
          auth0Profile.roles?.[0] ||
          auth0Profile["app_metadata"]?.roles?.[0] ||
          auth0Profile["user_metadata"]?.roles?.[0] ||
          "user"
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.id = token.sub as string
      session.user.role = (token.role as string) || "user"

      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}
