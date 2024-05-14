"use client"
import { useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";

export default function LogInOut() {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {session ? (
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Signout
        </button>
      ) : (
        <button
          onClick={() => {
            signIn();
          }}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Login
        </button>
      )}
    </div>
  );
}
