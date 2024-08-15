import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutapi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Boy1 from "@/public/books.png";

const UpdateHero = () => {
  const [image, setImage] = useState(Boy1.src);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data } = useGetLayoutQuery("Banner");
  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (data?.layout?.banner) {
      setTitle(data.layout.banner.title);
      setSubTitle(data.layout.banner.subTitle);
      setImage(data.layout.banner.image.url);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Updated Successfully",
        variant: "default",
      });
    }
    if (error) {
      toast({
        description: "Failed to update",
        variant: "destructive",
      });
    }
  }, [isSuccess, error, toast]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    await updateLayout({
      type: "Banner",
      image: image,
      title: title,
      subTitle: subTitle,
    });
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setImage(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-6">
      <CardHeader>
        <CardTitle>Update Hero Section</CardTitle>
        <CardDescription>
          Change your Banner picture and update your title and subtitle.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-64 h-48 overflow-hidden shadow-lg">
            <Image
              src={image}
              alt="avatar"
              layout="fill"
              objectFit="cover"
              className="shadow-foreground/30"
            />
            <input
              type="file"
              onChange={handleAvatar}
              className="hidden"
              name="avatar"
              id="avatar"
            />
            <label htmlFor="avatar" className="absolute right-3 bottom-3">
              <div className="h-9 w-9 cursor-pointer rounded-full bg-primary flex justify-center items-center transition-transform transform hover:scale-105">
                <AiOutlineCamera className="text-background" size={22} />
              </div>
            </label>
          </div>
          <form onSubmit={handleEdit} className="space-y-2 w-full px-6 py-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm text-muted-foreground">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="w-full p-2 text-foreground bg-card border border-border rounded"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="subTitle"
                className="text-sm text-muted-foreground"
              >
                Subtitle
              </Label>
              <Input
                id="subTitle"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Enter the subtitle"
                className="w-full p-2 text-foreground bg-card border border-border rounded"
              />
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateHero;
