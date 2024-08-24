import React, { useEffect, useState } from "react";
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
import Boy1 from "@/public/feedbackboy1.png";
import { useToast } from "../ui/use-toast";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReviewMutation,
  useReplyReviewMutation,
} from "@/redux/features/course/courseapi";

type Props = {
  reviews: any;
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user?: any;
  refetch: any;
};

const CourseContentMedia = ({
  reviews,
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [reviewReplies, setReviewReplies] = useState<{ [key: string]: string }>(
    {}
  );
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { toast } = useToast();
  const [
    addQuestion,
    {
      error: QuestionCreationError,
      isLoading: isQuestionCreationLoading,
      isSuccess: isQuestionCreationSuccess,
    },
  ] = useAddQuestionMutation();

  const [
    addAnswer,
    {
      isLoading: isAnswerLoading,
      error: AnswerError,
      isSuccess: isAnswerSuccess,
    },
  ] = useAddAnswerMutation();

  const [
    addReview,
    {
      error: AddReviewError,
      isLoading: isAddReviewLoading,
      isSuccess: isAddReviewSuccess,
    },
  ] = useAddReviewMutation();

  const [
    replyReview,
    {
      error: ReplyReviewError,
      isLoading: isReplyReviewLoading,
      isSuccess: isReplyReviewSuccess,
    },
  ] = useReplyReviewMutation();

  const handleReplyToggle = (questionId: string) => {
    setReplyingTo(replyingTo === questionId ? null : questionId);
  };

  const handleReviewReplyToggle = (reviewId: string) => {
    setReplyingTo(replyingTo === reviewId ? null : reviewId);
  };

  const handleQuestion = async () => {
    if (question.length === 0) {
      toast({
        title: "Question field is empty",
        description: "Please enter a question",
        variant: "destructive",
      });
    } else {
      await addQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswer = async (questionId: string) => {
    if (answer.length === 0) {
      toast({
        title: "Answer field is empty",
        description: "Please enter an answer",
        variant: "destructive",
      });
    } else {
      await addAnswer({
        answer,
        courseId: id,
        contentId: data[activeVideo]._id,
        questionId,
      });
    }
  };

  const handleReview = async () => {
    if (rating === 0) {
      toast({
        title: "Rating is required",
        description: "Please give a rating",
        variant: "destructive",
      });
    } else if (review.length === 0) {
      toast({
        title: "Review field is empty",
        description: "Please write a review",
        variant: "destructive",
      });
    } else {
      await addReview({ comment: review, rating, courseId: id });
    }
  };

  const addReply = async (reviewId: string) => {
    const replyText = reviewReplies[reviewId] || "";
    if (replyText.trim() === "") {
      toast({
        title: "Reply field is empty",
        description: "Please enter a reply",
        variant: "destructive",
      });
    } else {
      await replyReview({ answer: replyText, courseId: id, reviewId });
      setReviewReplies({
        ...reviewReplies,
        [reviewId]: "", // Reset the input after submission
      });
    }
  };

  useEffect(() => {
    if (isQuestionCreationSuccess) {
      setQuestion("");
      refetch();
    }
    if (isAnswerSuccess) {
      setAnswer("");
      refetch();
    }
    if (QuestionCreationError) {
      const message = (QuestionCreationError as any).data.message;
      toast({
        title: "Question Creation Error",
        description: message,
        variant: "destructive",
      });
    }
    if (AnswerError) {
      const message = (AnswerError as any).data.message;
      toast({
        title: "Answer Submission Error",
        description: message,
        variant: "destructive",
      });
    }
    if (isAddReviewSuccess) {
      setRating(0);
      setReview("");
      refetch();
      toast({
        title: "Review Submitted",
        description: "Your review has been submitted successfully",
        variant: "default",
      });
    }
    if (AddReviewError) {
      const message = (AddReviewError as any).data.message;
      toast({
        title: "Review Submission Error",
        description: message,
        variant: "destructive",
      });
    }
    if (ReplyReviewError) {
      const message = (ReplyReviewError as any).data.message;
      toast({
        title: "Reply Submission Error",
        description: message,
        variant: "destructive",
      });
    }
    if (isReplyReviewSuccess) {
      setReviewReplies({});
      refetch();
      toast({
        title: "Reply Submitted",
        description: "Your reply has been submitted successfully",
        variant: "default",
      });
    }
  }, [
    QuestionCreationError,
    isQuestionCreationSuccess,
    AnswerError,
    isAnswerSuccess,
    AddReviewError,
    isAddReviewSuccess,
    ReplyReviewError,
    isReplyReviewSuccess,
  ]);

  return activeVideo !== undefined ? (
    <div className="w-[95%] py-6 mx-auto">
      <CoursePlayer
        title={data[activeVideo]?.title || ""}
        videoUrl={data[activeVideo]?.videoUrl || ""}
        className="w-full h-[400px] rounded-md overflow-hidden"
      />

      <div className="w-full flex justify-between items-center my-5">
        <button
          className={`flex items-center p-2 rounded-lg text-foreground bg-accent transition-colors ${
            activeVideo === 0
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-accent-foreground"
          }`}
          onClick={() => {
            if (activeVideo > 0) {
              setActiveVideo(activeVideo - 1);
            }
          }}
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft size={20} className="mr-2" />
          Previous
        </button>

        <button
          className={`flex items-center p-2 rounded-lg text-foreground bg-accent transition-colors ${
            data.length - 1 === activeVideo
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-accent-foreground"
          }`}
          onClick={() => {
            if (activeVideo < data.length - 1) {
              setActiveVideo(activeVideo + 1);
            }
          }}
          disabled={data.length - 1 === activeVideo}
        >
          Next
          <AiOutlineArrowRight size={20} className="ml-2" />
        </button>
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
                ? "text-primary-foreground bg-accent-foreground"
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
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {data[activeVideo]?.links?.map((item: any, index: number) => (
              <Link
                key={index}
                href={item.url}
                target="_blank"
                className="cursor-pointer"
              >
                <div className="rounded-md shadow-lg overflow-hidden p-2">
                  <p className="text-sm mt-2 font-semibold text-center text-accent-foreground">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <div className="text-foreground mt-6 px-6 py-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Q&A</h1>

            {data[activeVideo]?.questions?.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No questions have been asked yet.
              </p>
            ) : (
              <div className="space-y-6">
                {data[activeVideo]?.questions.map((question: any) => (
                  <div key={question._id} className="bg-muted p-6 rounded-lg">
                    <div>
                      <div className="flex gap-3 p-1">
                        <Image
                          src={question?.user?.avatar?.url || Boy1}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          loading="lazy"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-lg text-primary mt-1">
                          {question?.user?.name || "Anonymous"}
                        </p>
                      </div>
                      <h2 className="text-md font-normal text-accent-foreground">
                        {question?.comment}
                      </h2>
                    </div>
                    {question?.commentReplies?.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h3 className="font-semibold">Answers:</h3>
                        {question.commentReplies?.map(
                          (answer: any, index: number) => (
                            <div key={index} className="p-4 rounded-md">
                              <div className="flex gap-3 p-1 items-center">
                                <Image
                                  src={answer?.user?.avatar?.url || Boy1}
                                  alt="User Avatar"
                                  width={40}
                                  height={40}
                                  loading="lazy"
                                  className="w-8 h-8 rounded-full"
                                />
                                <p className="text-sm font-medium text-foreground">
                                  {answer?.user?.name || "Anonymous"}
                                </p>
                              </div>
                              <p className="mt-2 text-sm text-foreground">
                                {answer?.comment}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {user && (
                      <div className="mt-6">
                        {replyingTo === question._id ? (
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Type your answer here."
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="resize-none text-foreground border-muted"
                            />
                            <div className="flex space-x-4">
                              <Button
                                onClick={() => handleAnswer(question._id)}
                              >
                                Submit
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleReplyToggle(question._id)}
                          >
                            Reply
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
              <Textarea
                placeholder="Type your question here."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="resize-none text-foreground bg-background border-muted"
              />
              <Button onClick={handleQuestion} className="mt-4">
                Submit
              </Button>
            </div>
          </div>
        )}

        {activeBar === 3 && (
          <div className="text-foreground mt-4">
            <h1 className="text-xl font-semibold mb-4">Reviews</h1>
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((review: any) => (
                  <div key={review._id} className=" p-4 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={Boy1}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h2 className="font-semibold">{review.user.name}</h2>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) =>
                            index < review.rating ? (
                              <AiFillStar
                                key={index}
                                className="text-yellow-400"
                              />
                            ) : (
                              <AiOutlineStar key={index} />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                    {review?.commentReplies.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold">Replies:</h3>
                        {review.commentReplies.map(
                          (reply: any, index: number) => (
                            <div key={index} className="mt-2 flex gap-3">
                              <Image
                                src={reply?.user?.avatar?.url || Boy1}
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="w-8 h-8 rounded-full"
                                loading="lazy"
                              />
                              <div>
                                <p className="text-sm text-primary">
                                  {reply?.user?.name || "Anonymous"}
                                </p>
                                <p>{reply?.comment}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {user?.role === "admin" && (
                      <div className="mt-4">
                        {replyingTo === review._id ? (
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Type your reply here."
                              value={reviewReplies[review._id] || ""}
                              onChange={(e) =>
                                setReviewReplies({
                                  ...reviewReplies,
                                  [review._id]: e.target.value,
                                })
                              }
                              className="resize-none"
                            />
                            <div className="space-x-4">
                              <Button onClick={() => addReply(review._id)}>
                                Submit
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleReviewReplyToggle(review._id)}
                          >
                            Reply
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {user && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
                <div className="flex items-center space-x-2 mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button key={index} onClick={() => setRating(index + 1)}>
                      {index < rating ? (
                        <AiFillStar className="text-yellow-400" />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </button>
                  ))}
                </div>
                <Textarea
                  placeholder="Write your review here."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="resize-none"
                />
                <Button onClick={handleReview} className="mt-4">
                  Submit
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CourseContentMedia;
