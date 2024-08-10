import React from "react";
import FeedbackBoy from "@/public/feedbackboy1.png";
import Image from "next/image";

const FeedbackCard = () => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-background rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <Image
          src={FeedbackBoy}
          alt="student"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold text-foreground">
            Student Name
          </div>
          <div className="text-sm text-muted-foreground">Course Name</div>
        </div>
      </div>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          inventore deleniti est, non vel asperiores. Nam est aliquid dolorum
          porro.
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
