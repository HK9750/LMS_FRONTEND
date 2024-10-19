"use client";
import Courses from "@/components/Course/Courses";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CoursesClient = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  console.log(search);

  return <Courses search={search} />;
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursesClient />
    </Suspense>
  );
};

export default Page;
