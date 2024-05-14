import { count } from "console";
import { useEffect, useState } from "react";
let counter = 1
export default function WebSocketServer(params?: string) {
    const [ws, setWs] = useState<WebSocket | null>(null);
    console.log("params from wsServer " + counter++ + params);
    
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/?id=${params}`);

        socket.onopen = () => {
            setWs(socket);
        };

        socket.onclose = () => {
            setWs(null);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [params]);

    return ws;
}

