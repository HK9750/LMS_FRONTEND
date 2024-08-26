"use client";
import { useState } from "react";
import { useGetAllCoursesUserQuery } from "@/redux/features/course/courseapi";
import Loader from "../Loader/Loader";
import CourseCard from "./CourseCard";
import { FC } from "react";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutapi";

interface CoursesProps {
  search?: string | null;
}

const Courses: FC<CoursesProps> = ({ search }) => {
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const queryParam = search === null ? {} : { search };

  const { data, isLoading } = useGetAllCoursesUserQuery(queryParam);

  // const { data: CategoriesData, isLoading: CategoriesLoading } =
  //   useGetLayoutQuery("Categories");
  // const categories = CategoriesData?.layout?.categories;

  // const handleCategoryClick = (category: string) => {
  //   setSelectedCategory(category === selectedCategory ? null : category);
  // };

  if (isLoading) {
    return <Loader />;
  }

  if (data?.courses.length === 0) {
    return (
      <h1 className="text-3xl font-bold mb-8 text-center">No courses found</h1>
    );
  }

  return (
    <>
      <section className="container my-8">
        {/* <div className="flex justify-center gap-10">
          {categories?.map((category: any) => (
            <h1
              key={category._id}
              className={`text-lg font-bold text-foreground text-center mb-5 cursor-pointer ${
                selectedCategory === category.title ? "bg-highlight" : ""
              }`}
              onClick={() => handleCategoryClick(category.title)}
            >
              {category.title}
            </h1>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.courses.map((course: any) => (
            <CourseCard key={course._id} data={course} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Courses;
