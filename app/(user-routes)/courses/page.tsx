"use client";
import Courses from "@/components/Course/Courses";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  console.log(search);

  return <Courses search={search} />;
};
export default Page;
