"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBarButtons({ isAdmin }) {
  const pathname = usePathname()
  const showButtons = pathname !== "/login" && pathname !== "/register"
  if (!showButtons) return <></>
  return (
    <div className="ml-auto flex items-center gap-4">
      {isAdmin && (
        <Link href="/admin/sales-rep">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-800">
            Admin Dashboard
          </Button>
        </Link>
      )}
      <Button size="sm" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  )
}
