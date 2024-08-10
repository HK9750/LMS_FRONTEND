import React from "react";
import CourseCard from "@/components/Course/CourseCard";

const PopularCourses = () => {
  return (
    <div className="container my-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Popular Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default PopularCourses;
