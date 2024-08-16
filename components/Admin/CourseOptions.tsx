import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions = ({ active, setActive }: Props) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="py-8 px-4">
      {options.map((option, index) => (
        <div key={index} className="w-full flex items-center py-3">
          <div
            className={`flex items-center justify-center rounded-full h-9 w-9 ${
              active + 1 > index ? "bg-primary" : "bg-secondary"
            } relative`}
          >
            {active + 1 > index && (
              <IoMdCheckmark className="text-primary-foreground" />
            )}
            {index !== options.length - 1 && (
              <div
                className={`absolute bottom-[-100%] h-8 w-1 ${
                  active + 1 > index ? "bg-primary" : "bg-secondary"
                }`}
              />
            )}
          </div>
          <h5
            className={`pl-3 text-lg ${
              active === index ? "font-bold text-primary" : "text-foreground"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
