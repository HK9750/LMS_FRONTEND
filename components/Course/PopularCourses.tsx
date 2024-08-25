import React from "react";
import { useGetAllCoursesUserQuery } from "@/redux/features/course/courseapi";
import Loader from "../Loader/Loader";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetAllCoursesUserQuery({});
  console.log("popular courses", data);

  if (isLoading) {
    return <Loader />;
  }

  const coursesCopy = [...data.courses];
  const sortedCourses = coursesCopy.sort(
    (a: any, b: any) => b.purchased - a.purchased
  );
  const topCourses = sortedCourses.slice(0, 6);

  return (
    <section className="container my-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Popular Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topCourses.map((course: any) => (
          <div
            key={course._id}
            className="flex items-center justify-center h-full "
          >
            <CourseCard data={course} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
