"use client";
import { useGetAllCoursesUserQuery } from "@/redux/features/course/courseapi";
import Loader from "../Loader/Loader";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetAllCoursesUserQuery({});
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="container my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.courses.map((course: any) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};
export default Courses;
