import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!url) {
      console.error("Socket URL is not defined");
      return;
    }

    const socketInstance = io(url, {
      transports: ["websocket"],
      reconnectionAttempts: 5, // Retry up to 5 times
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
