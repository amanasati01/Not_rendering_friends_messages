'use client'
import { useState } from "react"
import wsServer from "../app/lib/action/wsServer";
import userID from "../app/lib/action/getCurrentUserId";
export default function MessageInput({id}: {id : string}){
 const userId =  userID()
  const ws = wsServer(String(userId))
    const [messageInput , setMessageInput] = useState<string | undefined>('')
    const handleClick = ()=>{
     
      ws?.send(
        JSON.stringify({type : 'message', recipient : {receiverID : id},senderId :String(userId) ,data : {message : messageInput} })
      )
      setMessageInput('')
    }
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setMessageInput(event.target.value);
    };
    console.log("INput message " + messageInput);
      
    return( 
        <div>
        <input type="text" className="rounded h-10 w-[80%]" onChange={handleChange} value={messageInput}/>
        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2">
          Send
        </button>
        </div>
    )
}