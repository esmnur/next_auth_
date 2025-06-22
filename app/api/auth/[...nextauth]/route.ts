import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

console.log("Environment check:")
console.log("AUTH0_CLIENT_ID:", process.env.AUTH0_CLIENT_ID)
console.log("AUTH0_CLIENT_SECRET:", process.env.AUTH0_CLIENT_SECRET ? "SET" : "NOT SET")
console.log("AUTH0_ISSUER:", process.env.AUTH0_ISSUER)
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET")

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      authorization: {
        params: {
          scope: "openid email profile",
          audience: process.env.AUTH0_AUDIENCE || "",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token

        if (account.access_token) {
          try {
            const userInfoResponse = await fetch(`${process.env.AUTH0_ISSUER}/userinfo`, {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            })
            const userInfo = await userInfoResponse.json()

            console.log("=== USER INFO DEBUG ===")
            console.log("User info:", JSON.stringify(userInfo, null, 2))
            console.log("======================")

            token.role = userInfo.role || userInfo["https://myapp.com/role"] || "user"
          } catch (error) {
            console.error("Error fetching user info:", error)
            token.role = "user"
          }
        }
      }

      if (profile) {
        console.log("=== PROFILE DEBUG ===")
        console.log("Profile:", JSON.stringify(profile, null, 2))
        console.log("====================")

        const auth0Profile = profile as any
        token.role = auth0Profile.role || auth0Profile["https://myapp.com/role"] || "user"
      }

      console.log("Final token role:", token.role)
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.id = token.sub as string
      session.user.role = (token.role as string) || "user"

      console.log("Session role:", session.user.role)
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: true,
})

export { handler as GET, handler as POST }
