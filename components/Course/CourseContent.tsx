import React, { FC } from "react";
import { useGetUserCourseQuery } from "@/redux/features/course/courseapi";
import { useSelector } from "react-redux";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

interface CourseContentProps {
  id: string;
}

const CourseContent: FC<CourseContentProps> = ({ id }) => {
  const { data, isLoading } = useGetUserCourseQuery(id);
  const [activeVideo, setActiveVideo] = React.useState<number>(0);
  const user = useSelector((state: any) => state.auth.user);

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading...</div>;
  }

  console.log(data);

  if (
    !data ||
    !data.content ||
    !data.content[0] ||
    !data.content[0].courseData
  ) {
    return (
      <div className="text-center text-muted-foreground">
        No course data available.
      </div>
    );
  }

  return (
    <div className="w-full md:grid grid-cols-10 gap-6">
      <div className="col-span-7">
        <CourseContentMedia
          data={data.content[0].courseData}
          id={id}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          user={user}
        />
      </div>

      <div className="col-span-3">
        <CourseContentList
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          data={data.content[0].courseData}
        />
      </div>
    </div>
  );
};

export default CourseContent;
