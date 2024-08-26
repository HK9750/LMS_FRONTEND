"use client";
import CourseContent from "@/components/Course/CourseContent";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params }: any) => {
  const { id } = params;
  const { error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.user?.courses?.some(
        (course: any) => course.courseId === id
      );
      if (!isPurchased || error) {
        redirect("/");
      }
    }
  }, [data, error, id]);

  return (
    <div className="text-slate-800 dark:text-white">
      <CourseContent id={id} />
    </div>
  );
};

export default Page;
