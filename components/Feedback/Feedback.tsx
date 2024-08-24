import React from "react";
import FeedbackCards from "@/components/Feedback/FeedbackCard";
import { useGetCoursesReviewsQuery } from "@/redux/features/course/courseapi";

const Feedback = () => {
  const { data, isLoading } = useGetCoursesReviewsQuery({});
  console.log(data);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="container my-12">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
            Student Feedback
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.topCourseReviews?.map((review: any) => (
              <div key={review._id} className="flex h-full">
                <FeedbackCards data={review} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
