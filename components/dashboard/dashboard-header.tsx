"use client"

import { signOut, useSession } from "next-auth/react"
import { LogOut } from "lucide-react"

export function DashboardHeader() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" })
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Auth System</h1>
            
          </div>

          <div>
            <div className="flex justify-end p-4">
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        <LogOut className="h-4 w-4" />
        <span>Log out</span>
      </button>
    </div>
          </div>
        </div>
      </div>
    </header>
  )
}
