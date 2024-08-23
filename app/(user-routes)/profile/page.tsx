"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const { user } = useSelector((state: any) => state.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { toast } = useToast();

  const [
    updateUser,
    {
      isLoading: isUserUpdateLoading,
      error: userUpdateError,
      isSuccess: isUserUpdateSuccess,
    },
  ] = useUpdateUserMutation();
  const [
    updateAvatar,
    {
      isLoading: isAvatarUpdateLoading,
      error: avatarUpdateError,
      isSuccess: isAvatarUpdateSuccess,
    },
  ] = useUpdateAvatarMutation();

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (name != user?.name && email != user?.email) {
      await updateUser({ name, email });
    }

    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      await updateAvatar(formData);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url || "");
    }
    if (userUpdateError) {
      const message = (userUpdateError as any).data.message;
      toast({
        title: "User Update Error",
        description: message,
        variant: "destructive",
      });
    }
    if (avatarUpdateError) {
      const message = (avatarUpdateError as any).data.message;
      toast({
        title: "Avatar Update Error",
        description: message,
        variant: "destructive",
      });
    }
    if (isUserUpdateSuccess) {
      toast({
        title: "User Update Success",
        description: "User information updated successfully",
        variant: "default",
      });
    }
    if (isAvatarUpdateSuccess) {
      toast({
        title: "Avatar Update Success",
        description: "Avatar updated successfully",
        variant: "default",
      });
    }
  }, [
    user,
    userUpdateError,
    avatarUpdateError,
    isUserUpdateSuccess,
    isAvatarUpdateSuccess,
  ]);

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center relative">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={avatarPreview} alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Label
            htmlFor="avatar-upload"
            className="absolute top-5 right-28 p-2 cursor-pointer"
          >
            <CameraIcon className="h-6 w-6 text-primary" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleUpdate}
          disabled={isUserUpdateLoading || isAvatarUpdateLoading}
        >
          {isUserUpdateLoading || isAvatarUpdateLoading
            ? "Updating..."
            : "Update"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Page;

function CameraIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
