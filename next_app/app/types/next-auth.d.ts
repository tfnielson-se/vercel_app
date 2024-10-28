import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      is_admin: boolean
    }
  }

  interface User {
    is_admin: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    is_admin: boolean
  }
}