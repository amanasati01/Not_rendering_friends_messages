"use client"
import { useRouter } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { loginUser } from "../../lib/action/getLoginUserDetail"
import { fetchUserDetails } from "../../lib/action/fetchUsersDetails"
 
interface User {
   id : number,
   name : string 
} 
export default function Gossips (){
  const [user,setUser] = useState<User>()
  const [users, setUsers] = useState<User[]>([])
  const {data: session, status } = useSession()
  const [isAuth, setIsAuth] = useState<boolean>(false);

useEffect(() => {
  if(session)
    setIsAuth(true);
}, [session]);
  useEffect(() => {
    if (!isAuth) {
        return;
    }

    async function fetchData() {
        try {
            const userData = await loginUser() as User;
            setUser(userData);

            const usersData = await fetchUserDetails();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., show error message)
        }
    }

    fetchData();
}, [isAuth]); // Add isAuth as a dependency if it's used inside useEffect


  const router = useRouter()
    return(
      <div>
        { 
          users.map((data, key) => {
             return (
                <div
                  className="flex items-center bg-gray-300 h-10 rounded-lg pl-3 shadow-md m-5 cursor-pointer"
                   onClick={() => {
                   router.push(`/gossips/${data.id}`);
                   }}
                   key={key}>
               <div><ProfileIcon /></div>
               <div className="ml-3 text-lg font-semibold">{data.name}</div>
               </div>
                );
              })
        }
      </div>
    )
}

function ProfileIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

  )
}
