"use client"
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import userID from '../../../lib/action/getCurrentUserId'
import { log } from "console";
import useWebSocketServer from "../../../lib/action/wsServer";
import userId from '../../../lib/action/getCurrentUserId'

export default function Chat({ params }: { params: { id: number } }) {
  const [friendMessage, setFriendMessage] = useState<string[]>([]);
  const userId = userID();
  const ws = useWebSocketServer(String(userId));

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log("Received message:", message); // Log the received message
      switch (message.type) {
        case "message":
          console.log("Message:", message.data.message); // Log the message content
          setFriendMessage((prevItems) => [...prevItems, message.data.message]);
          break;
        default:
          console.log("Unknown message type:", message.type);
          break;
      }
    };

    return () => {
      // Clean up the event listener when the component unmounts
      ws.onmessage = null;
    };
  }, [ws]); // Run this effect whenever ws changes

  useEffect(() => {
    console.log("Friend messages:", friendMessage); // Log the friendMessage state
  }, [friendMessage]);

  return (
    <div className="h-full flex z-0 m-5 ml-8">
      <div className="bottom-5">
        {friendMessage.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}


