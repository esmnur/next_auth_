export interface AuthConfigInterface {
  auth0: {
    clientId: string
    clientSecret: string
    issuer: string
    audience: string
  }
  nextAuth: {
    secret: string
    url: string
  }
}

export interface UserRole {
  id: string
  name: "admin" | "user"
  permissions: string[]
}

export interface AuthUser {
  id: string
  email: string
  name: string
  image?: string
  role: string
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: AuthUser
  }

  interface User {
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    role?: string
  }
}
