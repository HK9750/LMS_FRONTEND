"use client";

import React, { useEffect } from "react";
import CourseOptions from "./CourseOptions";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useCreateCourseMutation,
  useEditCourseMutation,
} from "@/redux/features/course/courseapi";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  course: any;
};

const EditCourse = ({ course }: Props) => {
  const [editCourse, { isSuccess, error, isLoading, data }] =
    useEditCourseMutation();
  const router = useRouter();
  const [courseData, setCourseData] = React.useState({});
  const [active, setActive] = React.useState(0);
  const [courseInfo, setCourseInfo] = React.useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = React.useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = React.useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = React.useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestions: "",
    },
  ]);
  const { toast } = useToast();

  useEffect(() => {
    if (course) {
      setCourseInfo({
        name: course.name || "",
        description: course.description || "",
        price: course.price || "",
        estimatedPrice: course.estimatedPrice || "",
        tags: course.tags || "",
        level: course.level || "",
        demoUrl: course.demoUrl || "",
        thumbnail: course.thumbnail || "",
      });

      setBenefits(course.benefits || [{ title: "" }]);
      setPrerequisites(course.prerequisites || [{ title: "" }]);
      setCourseContentData(
        course.courseData || [
          {
            title: "",
            description: "",
            videoUrl: "",
            videoSection: "Untitled Section",
            links: [{ title: "", url: "" }],
            suggestions: "",
          },
        ]
      );
    }
  }, [course]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Course updated successfully",
        variant: "default",
      });
      router.push("/admin/courses");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast({
          title: "Error",
          description: errorMessage.data.message,
          variant: "destructive",
        });
      }
    }
  }, [isSuccess, error, isLoading, router, toast]);

  const handleSubmit = () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map((section) => ({
      title: section.title,
      description: section.description,
      videoUrl: section.videoUrl,
      videoSection: section.videoSection,
      links: section.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestions: section.suggestions,
    }));

    // Preparing data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    if (!isLoading) {
      await editCourse({ id: course._id, data: courseData });
    }
  };

  return (
    <div className="w-full flex min-h-screen bg-background">
      <div className="w-4/5 ml-10">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            setActive={setActive}
            active={active}
          />
        )}
        {active === 1 && (
          <CourseData
            setActive={setActive}
            active={active}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            edit={false}
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>
      <div className="w-1/5 mt-[100px] h-screen sticky z-[1] top-18 right-4 ">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
