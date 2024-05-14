"use server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
interface User {
    id : number,
    name : string
}
const client = new PrismaClient()
export async function loginUser(){
    const session  = await getServerSession()
    const loginUser : User | null = await client.user.findUnique({
      where :{
       email : session?.user?.email as string
      },
      select :{
        id : true,
        name : true
      }
    })
    console.log("login user " + JSON.stringify(loginUser));
    
   return loginUser;
    }