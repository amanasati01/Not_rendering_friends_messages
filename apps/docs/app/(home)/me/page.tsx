"use client"
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { NoOfTweets } from "../../lib/action/getNoOfTweet";
import Box from "../../../component/box";

export default function Me() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState("");

  useEffect(() => {
    async function getData() {
      const session = await getSession();
      if (session?.user) {
        setName(session.user.name as string);
        setEmail(session.user.email as string);
        const noOfPosts: string | undefined = await NoOfTweets();
        if (noOfPosts) setPosts(noOfPosts);
      }
    }
    
    getData();
  }, []); // Pass an empty dependency array to useEffect to run it only once
   console.log("Number " + posts);
   
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="bg-gray-300  w-[70%] md:w-[40%]  flex justify-center  rounded-lg p-8 shadow-lg">
          <div className="flex   items-center flex-col w-full " >
            <ProfileIcon />
            <div className="ml-14 p-8 text-lg font-medium">
              <Box heading="Name" info={name} />
              <Box heading="Email" info={email} />
              <Box heading="No of posts " info={posts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileIcon() {
  return (
    <div className="bg-gray-400 shadow-2xl rounded-full w-36 h-36 flex justify-center items-center" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-28 h-28'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    </div>
  );
}
