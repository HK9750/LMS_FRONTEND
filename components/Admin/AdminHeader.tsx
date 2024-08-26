import { FaBell } from "react-icons/fa";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "@/redux/features/notification/notificationapi";
import { useEffect, useState, useCallback } from "react";
import useSocket from "@/lib/useSocket";

const AdminHeader = () => {
  const { data, refetch, isSuccess } = useGetNotificationsQuery({});
  const [
    updateNotificationStatus,
    {
      isLoading: isUpdateNotificationLoading,
      isSuccess: isUpdateNotificationSuccess,
    },
  ] = useReadNotificationMutation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dc7v9lhvh/video/upload/v1724683677/products/notifications.mp3_ogekha.mp3"
    )
  );

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_BACKEND_URL || "";
  const socket = useSocket(socketUrl);

  const playerNotificationSound = useCallback(() => {
    audio.play();
  }, [audio]);

  const notificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setNotifications(data.notifications.filter((item: any) => !item.isRead));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const handleNewNotification = () => {
      refetch();
      playerNotificationSound();
    };

    socket?.on("newNotifications", handleNewNotification);

    return () => {
      socket?.off("newNotifications", handleNewNotification);
    };
  }, [socket, playerNotificationSound, refetch]);

  useEffect(() => {
    if (isUpdateNotificationSuccess) {
      refetch();
    }
  }, [isUpdateNotificationSuccess, refetch]);

  return (
    <div className="flex justify-center items-center px-4 py-3 bg-background gap-8">
      <Link
        href="/"
        className="text-lg text-foreground hover:text-muted-foreground"
      >
        Home
      </Link>
      <Link
        href="/profile"
        className="text-lg text-foreground hover:text-muted-foreground"
      >
        Profile
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative">
            <FaBell className="text-xl text-foreground-muted hover:text-foreground cursor-pointer" />
            {notifications.length > 0 && (
              <span className="absolute top-3 -right-4 text-sm bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 bg-background max-h-64 overflow-y-auto mt-6">
          {notifications.length === 0 ? (
            <DropdownMenuItem className="text-muted-foreground">
              No new notifications
            </DropdownMenuItem>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className="flex flex-col items-start"
              >
                <span className="text-foreground font-bold">
                  {notification.title}
                </span>
                <div className="flex justify-between items-center w-full">
                  <span className="text-muted-foreground">
                    {notification.message}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                    onClick={() => notificationStatusChange(notification._id)}
                    disabled={isUpdateNotificationLoading}
                  >
                    Mark as read
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ModeToggle />
    </div>
  );
};

export default AdminHeader;
