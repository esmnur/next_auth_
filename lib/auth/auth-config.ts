import type { AuthConfigInterface } from "@/types/auth"

export const AuthConfig: AuthConfigInterface = {
  auth0: {
    clientId: process.env.AUTH0_CLIENT_ID || "",
    clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    issuer: process.env.AUTH0_ISSUER || "",
    audience: process.env.AUTH0_AUDIENCE || "",
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
}

export function validateAuthConfig(): void {
  if (process.env.NODE_ENV === "production") {
    const requiredEnvVars = [
      "AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET",
      "AUTH0_ISSUER",
      "AUTH0_AUDIENCE",
      "NEXTAUTH_SECRET",
      "NEXTAUTH_URL",
    ]

    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`)
    }
  }
}
