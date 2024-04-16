import Link from "next/link"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { isAdminFromEmail } from "@/lib/actions"
import NavBarButtons from "./NavbarButtons"

async function isAdminFunc() {
  const session = await getServerSession(authOptions)

  if (session) {
    const isAdmin = await isAdminFromEmail(session.user.email)
    return isAdmin
  } else {
    return false
  }
}

export default async function NavBar() {
  const isAdmin = await isAdminFunc()
  return (
    <nav className="flex items-center h-14 px-4 border-b gap-4 lg:gap-6">
      <Link className="text-lg font-bold" href="#">
        Sales Inc
      </Link>
      <NavBarButtons isAdmin={isAdmin} />
    </nav>
  )
}
