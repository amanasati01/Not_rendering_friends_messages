import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function userId(){
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
     useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await getSession()
      if (currentUser?.user) {
        //@ts-ignore
        setCurrentUserId(currentUser?.user.id || null);
      }
    }
    getCurrentUser();
  }, [currentUserId]);
  if(currentUserId != null)
  return currentUserId
}