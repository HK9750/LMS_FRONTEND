"use client";
import { ReactNode, useEffect } from "react";
import useSocket from "@/lib/useSocket";

interface SocketWrapperProps {
  children: ReactNode;
}

const SocketWrapper = ({ children }: SocketWrapperProps) => {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_BACKEND_URL || "";
  const socket = useSocket(socketUrl);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to the Socket.IO server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the Socket.IO server");
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
      }
    };
  }, [socket]);

  return <>{children}</>;
};

export default SocketWrapper;
