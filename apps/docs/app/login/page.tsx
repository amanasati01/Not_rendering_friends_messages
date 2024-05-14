"use client"
import { signIn, signOut, useSession } from "next-auth/react"
export default function Login(): JSX.Element {
   const session = useSession();
   console.log(session);
   
    return <>
       <div>
         <button onClick={()=>{
            signIn()
         }}>Login</button>
                  <button onClick={()=>{
            signOut()
         }}>signOut</button>
       </div>
    </>
 }
 