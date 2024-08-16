import React from "react";
import CoursePlayer from "@/components/Admin/VideoPlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";

type Props = {
  data: any;
  id: string;
  activeVideo?: number;
  setActiveVideo?: (activeVideo: number) => void;
  user?: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
}: Props) => {
  console.log(data);

  const [activeBar, setActiveBar] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);
  const [review, setReview] = React.useState<string>("");

  const isReviewExists = data?.reviews?.find(
    (review: any) => review.user._id === user?.id
  );

  return activeVideo !== undefined ? (
    <div className="w-[95%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title || ""}
        videoUrl={data[activeVideo]?.videoUrl || ""}
        className="w-[100%] h-[400px]"
      />
      <div className="w-full flex justify-between items-center my-3">
        <div
          className={`p-2 bg-accent min-h-10 !py-[unset] ${
            activeVideo === 0 ? "cursor-no-drop" : ""
          }`}
          onClick={() => {
            if (
              activeVideo !== undefined &&
              activeVideo > 0 &&
              setActiveVideo
            ) {
              setActiveVideo(activeVideo - 1);
            }
          }}
        >
          <AiOutlineArrowLeft size={20} className="mr-2" />
          Previous
        </div>

        <div
          className={`p-2 bg-accent min-h-10 !py-[unset] ${
            data.length - 1 === activeVideo ? "cursor-no-drop" : ""
          }`}
          onClick={() => {
            if (
              activeVideo !== undefined &&
              data.length - 1 !== activeVideo &&
              setActiveVideo
            ) {
              setActiveVideo(activeVideo + 1);
            }
          }}
        >
          <AiOutlineArrowRight size={20} className="mr-2" />
          Next
        </div>
      </div>

      <h1 className="text-xl font-bold text-foreground">
        {" "}
        {data[activeVideo]?.title}{" "}
      </h1>
      <br />

      <div className="w-full flex items-center justify-between bg-muted rounded">
        {["Overview", "Resources", "Q&A", "Reviews"].map((item, index) => (
          <h1
            key={index}
            className={`cursor-pointer font-semibold p-4 ${
              activeBar === index ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h1>
        ))}
      </div>
      <br />

      {activeBar === 0 && (
        <div className="w-full text-foreground">
          <p>{data[activeVideo]?.description}</p>
        </div>
      )}

      {activeBar === 1 && (
        <div className="w-full">
          {data[activeVideo]?.links?.map((link: any, index: number) => (
            <div className="mb-5" key={index}>
              <h1 className="text-foreground">
                {link.title && link.title + " :"}
              </h1>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent-foreground"
              >
                {link.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <div>
          <div className="w-full flex gap-4">
            <Image
              src={user?.avatar?.url || "/user.png"}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full border border-border shadow-md bg-cover bg-center w-16 h-16"
            />

            <textarea
              className="w-full p-2 rounded border border-border bg-muted-foreground text-foreground"
              placeholder="Ask a question"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground">
              Submit
            </button>
          </div>
        </div>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          {!isReviewExists && (
            <>
              <div className="flex gap-4 items-center">
                <Image
                  src={user?.avatar?.url || "/user.png"}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full border border-border shadow-md bg-cover bg-center w-16 h-16"
                />

                <div className="w-full">
                  <h1 className="text-lg font-semibold text-foreground">
                    Give a rating
                  </h1>
                  <div className="flex  w-full pb-3">
                    {[1, 2, 3, 4, 5].map((item, index) =>
                      rating >= item ? (
                        <AiFillStar
                          size={30}
                          key={index}
                          onClick={() => setRating(item)}
                          className="cursor-pointer text-yellow-500"
                        />
                      ) : (
                        <AiOutlineStar
                          size={30}
                          key={index}
                          onClick={() => setRating(item)}
                          className="cursor-pointer text-yellow-500"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <textarea
                className="w-full p-2 rounded border border-border bg-muted-foreground text-foreground mt-2"
                placeholder="Write a review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default CourseContentMedia;
