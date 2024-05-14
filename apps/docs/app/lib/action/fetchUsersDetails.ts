"use server"

import { PrismaClient } from "@prisma/client"
import { log } from "console"
import { getServerSession } from "next-auth"

const client = new PrismaClient()
interface User {
    id : number,
    name : string
}
export async function fetchUserDetails(){
    const session  = await getServerSession()
   
    const allUser:User[] = await client.user.findMany({
      where:{
        NOT :{
          email : session?.user?.email as string
        }
      },
        select : {
          name : true,
          id : true
        }
    })
    console.log("All user " + JSON.stringify(allUser));
    
   return allUser;
    }