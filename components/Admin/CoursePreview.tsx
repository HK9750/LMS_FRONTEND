import React from "react";
import CoursePlayer from "@/components/Admin/VideoPlayer";
import { Button } from "../ui/button";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  edit: boolean;
};

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  edit,
}: Props) => {
  return (
    <div className="w-4/5 ml-8 mb-6 text-foreground">
      <div className="w-full relative">
        <div className="w-full my-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div>
          {/* Price and Discount Section */}
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              {courseData.price || "100"}
              <span className="line-through text-muted-foreground text-lg ml-2">
                {courseData.estimatedPrice || "100"}
              </span>
              <span className="text-green-500 ml-2">0% Off</span>
            </div>
            <button className="bg-destructive text-white py-2 px-6 rounded-full">
              Buy Now {courseData.price}
            </button>
          </div>

          {/* Course Features */}
          <ul className="mt-4 text-muted-foreground space-y-1">
            <li>Source code included</li>
            <li>Full lifetime access</li>
            <li>Certificate of completion</li>
            <li>Premium Support</li>
          </ul>

          {/* Course Title and Details */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold">{courseData.name || "title"}</h1>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-yellow-500 text-lg mr-4">☆☆☆☆☆</span>
                <span>0 Reviews</span>
              </div>
              <div>
                <span>0 Students</span>
              </div>
            </div>
          </div>

          {/* What you'll learn Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              What you will learn from this course?
            </h2>
            <ul className="mt-2 space-y-1">
              {courseData &&
                courseData.benefits &&
                courseData.benefits.map((item: any, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>✔️</span>
                    <span>{item?.title || "abc"}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Prerequisites Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              What are the prerequisites for starting this course?
            </h2>
            <ul className="mt-2 space-y-1">
              {courseData &&
                courseData.prerequisites &&
                courseData.prerequisites.map((item: any, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>✔️</span>
                    <span>{item.title || "abc"}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Course Details Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Course Details</h2>
            <p className="mt-2">{courseData.description}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            onClick={() => setActive(active - 1)}
            className=" px-4 py-2 rounded-md w-1/4"
          >
            Back
          </Button>

          <Button
            onClick={() => {
              handleCourseCreate();
            }}
            className=" px-4 py-2 rounded-md w-1/4"
          >
            {edit ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
