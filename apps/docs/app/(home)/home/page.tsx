"use client"
import { getServerSession } from "next-auth";
import MeIcon from "../../../component/meIcon";
import authOptions from "../../lib/auth";
import { useEffect, useState } from "react";
import getAllTweet from "../../lib/action/getAlltweet";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tweets, setTweets] = useState<{ id: number; authorId: number; tweet: string; date: Date }[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      const session = await getSession();
      setName(session?.user?.name as string);
      if (!session?.user) {
        router.push('/api/auth/signin');
        return;
      }
      try {
        const data = await getAllTweet();
        setTweets(data);
      } catch (error) {
        setError("Failed to fetch tweets. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      {tweets?.length ? (
        tweets.map((x, ind) => (
          <div className="flex flex-col justify-center items-center w-[80%] shadow-xl mt-10" key={ind}>
            <div className="flex justify-between items-start w-full">
              <div className="flex">
                <div><MeIcon/></div>
                <div className="ml-2">{name}</div>
              </div>
              <div>{JSON.stringify(x.date)}</div>
            </div>
            <div>{x.tweet}</div>
          </div>
        ))
      ) : (
        <div>No tweets found.</div>
      )}
    </div>
  );
}
