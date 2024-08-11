import Image from "next/image";
import Link from "next/link";
import React from "react";
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
const CourseCard = () => {
  return (
    <Link href={`/`}>
      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src={Books}
            alt="thumbnail"
            className="w-full h-48 object-cover"
            priority={true}
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold">
            MERN Stack Course For Beginners
          </CardTitle>
        </CardHeader>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <CardContent className="flex items-center gap-1 text-yellow-500">
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
            </CardContent>
            <CardDescription className="text-sm">780 students</CardDescription>
          </div>
          <CardFooter className="flex justify-between items-center text-sm">
            <p className="font-semibold text-primary">$ 9.95</p>
            <p className="flex items-center gap-1">
              <TfiMenuAlt /> 55 Lectures
            </p>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
