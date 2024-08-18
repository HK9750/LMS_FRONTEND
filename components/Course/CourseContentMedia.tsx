import React from "react";
import CoursePlayer from "@/components/Admin/VideoPlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
  const [activeBar, setActiveBar] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);
  const [review, setReview] = React.useState<string>("");

  const isReviewExists = data?.reviews?.find(
    (review: any) => review.user._id === user?.id
  );

  return activeVideo !== undefined ? (
    <div className="w-[95%] py-6 mx-auto">
      <CoursePlayer
        title={data[activeVideo]?.title || ""}
        videoUrl={data[activeVideo]?.videoUrl || ""}
        className="w-full h-[400px] rounded-md overflow-hidden"
      />
      <div className="w-full flex justify-between items-center my-5">
        <Button
          className={`flex items-center p-3 rounded-lg text-foreground bg-accent transition-colors ${
            activeVideo === 0
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-accent-foreground"
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
        </Button>

        <Button
          className={`flex items-center p-3 rounded-lg text-foreground bg-accent transition-colors ${
            data.length - 1 === activeVideo
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-accent-foreground"
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
          Next
          <AiOutlineArrowRight size={20} className="ml-2" />
        </Button>
      </div>

      <h1 className="text-2xl font-semibold text-foreground mb-4">
        {data[activeVideo]?.title}
      </h1>

      <div className="w-full flex items-center justify-between bg-muted rounded-md overflow-hidden">
        {["Overview", "Resources", "Q&A", "Reviews"].map((item, index) => (
          <h1
            key={index}
            className={`cursor-pointer font-semibold p-4 flex-1 text-center ${
              activeBar === index
                ? "text-primary bg-accent-foreground"
                : "text-foreground"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h1>
        ))}
      </div>

      <div className="mt-6">
        {activeBar === 0 && (
          <div className="text-foreground">
            <p>{data[activeVideo]?.description}</p>
          </div>
        )}

        {activeBar === 1 && (
          <div className="space-y-4">
            {data[activeVideo]?.links?.map((link: any, index: number) => (
              <div key={index}>
                <h1 className="text-foreground font-medium">
                  {link.title && `${link.title}:`}
                </h1>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-foreground underline"
                >
                  {link.url}
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <div>
            <div className="flex gap-4 items-start">
              <Image
                src={user?.avatar?.url || "/user.png"}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full border border-border shadow-sm w-16 h-16"
              />

              <Textarea
                className="w-full p-3 rounded-md border border-border bg-muted-foreground text-foreground resize-none"
                placeholder="Ask a question"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-5 py-2 rounded-full bg-destructive text-destructive-foreground font-semibold hover:bg-destructive-foreground transition">
                Submit
              </button>
            </div>
          </div>
        )}

        {activeBar === 3 && (
          <div>
            {!isReviewExists && (
              <>
                <div className="flex gap-4 items-start">
                  <Image
                    src={user?.avatar?.url || "/user.png"}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full border border-border shadow-sm w-16 h-16"
                  />

                  <div className="w-full">
                    <h1 className="text-lg font-semibold text-foreground">
                      Give a rating
                    </h1>
                    <div className="flex space-x-2 mt-2">
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
                <Textarea
                  className="w-full p-3 rounded-md border border-border bg-muted-foreground text-foreground mt-4 resize-none"
                  placeholder="Write a review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />

                <div className="flex justify-end mt-4">
                  <button className="px-5 py-2 rounded-full bg-destructive text-destructive-foreground font-semibold hover:bg-destructive-foreground transition">
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CourseContentMedia;
