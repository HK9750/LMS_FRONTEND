import React, { FC } from "react";
import FeedbackBoy from "@/public/feedbackboy1.png";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Import star icons

interface FeedbackCardProps {
  data?: any;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ data }) => {
  const userImage = data?.user?.avatar?.url;
  const userName = data?.user?.name;
  const courseName = data?.courseName;
  const reviewComment = data?.comment;
  const reviewRating = data?.rating || 0; // Default to 0 if no rating

  // Function to render star rating
  const renderRating = () => {
    const totalStars = 5;
    const filledStars = Math.floor(reviewRating);
    const emptyStars = totalStars - filledStars;

    return (
      <div className="flex">
        {Array(filledStars)
          .fill(0)
          .map((_, i) => (
            <AiFillStar key={i} className="text-yellow-500" />
          ))}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <AiOutlineStar key={i} className="text-yellow-500" />
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-background rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <Image
          src={userImage || FeedbackBoy}
          alt="student"
          width={48}
          height={48}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold text-foreground">
            {userName}
          </div>
          <div className="text-sm text-muted-foreground">{courseName}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {renderRating()}
        <span className="text-muted-foreground text-sm">{`${reviewRating}/5`}</span>
      </div>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-muted-foreground">{reviewComment}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
