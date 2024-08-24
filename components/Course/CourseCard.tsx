import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiStarSFill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import Books from "@/public/books.png";

interface CourseCardProps {
  data?: any;
}

const CourseCard: FC<CourseCardProps> = ({ data }) => {
  const thumbnail = data?.thumbnail?.url;
  const title = data?.name;
  const ratings = Math.round(data?.ratings);
  const students = data?.purchased;
  const price = data?.price;
  const lectures = data?.courseData?.length;

  return (
    <Link href={`/course/${data?._id}`} className="min-w-96">
      <Card className="flex flex-col justify-between h-full">
        <div className="relative flex-grow flex justify-center items-center p-4">
          <Image
            src={thumbnail || Books}
            alt="thumbnail"
            width={150}
            height={200}
            className="object-contain h-40 w-auto"
            priority={true}
          />
        </div>
        <CardHeader className="px-4 py-2 text-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: ratings }, (_, index) => (
                <RiStarSFill key={index} />
              ))}
            </div>
            <CardDescription className="text-sm">
              {students} students
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-4 py-2 text-sm">
          <p className="font-semibold text-primary">${price}</p>
          <p className="flex items-center gap-1">
            <TfiMenuAlt /> {lectures} Lectures
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
