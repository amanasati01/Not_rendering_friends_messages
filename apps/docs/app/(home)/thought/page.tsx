"use client"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useState } from "react"
import TweetPost from "../../lib/action/tweetPost";

export default function Thought(){
   const [tweet, setTweet] = useState('');
   const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      setTweet(event.target.value)
  };
  const sendTweet = async () => {
    console.log("tweet onClick " + tweet);
    await TweetPost(tweet);
    setTweet('')
  };
  console.log(tweet);
  
    return (
    <>
    <div>
    <div className="  flex justify-center">
    <div className="mb-6  w-[80%]">
    <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900">Write your tweet....</label>
    <input type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 " onChange={(e)=>{
     handleInput(e)
    }} value={tweet}/>
    <div className="flex justify-end">
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3" onClick={
        
        sendTweet
        }>
      Send
     </button>
     </div>
   </div>
    </div>
    </div>
    </>)
}
