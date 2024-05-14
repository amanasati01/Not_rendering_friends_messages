import { getServerSession } from "next-auth"
import authOptions from "./lib/auth"
import { redirect } from "next/navigation"
import { signIn } from "next-auth/react"
export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
   redirect('/home')
 }else(
  redirect('api/auth/signin')
 )
 return
 <div className="bg-green-600"></div>
}
