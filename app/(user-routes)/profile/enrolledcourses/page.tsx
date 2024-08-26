"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  // Extract courses from user
  const enrolledCourses = user?.courses || [];

  const handleCourseClick = (courseId: string) => {
    // Navigate to the course page
    router.push(`/courseaccess/${courseId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Enrolled Courses</h1>
      <div className="flex flex-col gap-4">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course: any) => (
            <Button
              key={course._id}
              onClick={() => handleCourseClick(course.courseId)}
              className="w-full"
              variant="secondary"
            >
              {course.coursetitle}
            </Button>
          ))
        ) : (
          <p className="text-muted-foreground">
            You are not enrolled in any courses.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
