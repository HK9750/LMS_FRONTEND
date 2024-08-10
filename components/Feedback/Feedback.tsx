import React from "react";
import FeedbackCards from "@/components/Feedback/FeedbackCard";

const Feedback = () => {
  return (
    <div className="container my-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Student Feedback
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
      </div>
    </div>
  );
};

export default Feedback;
