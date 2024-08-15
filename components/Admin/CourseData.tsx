import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData = ({
  benefits,
  setBenefits,
  setActive,
  active,
  prerequisites,
  setPrerequisites,
}: Props) => {
  const { toast } = useToast();

  const handleBenefitChange = (index: number, value: any) => {
    benefits[index].title = value;
    setBenefits([...benefits]);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    prerequisites[index].title = value;
    setPrerequisites([...prerequisites]);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  return (
    <div className="w-4/5 ml-8 mt-24 mb-6 text-foreground dark:text-white">
      <h2 className="text-2xl font-bold">Course Data</h2>

      <div className="mt-8">
        <h4 className="text-xl text-slate-700 dark:text-slate-200 font-bold">
          What Benefits does the course provide?
        </h4>
        {benefits.map((benefit, index) => (
          <div key={index}>
            <input
              type="text"
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-md p-2 bg-background dark:bg-gray-800"
            />
          </div>
        ))}
        <IoAddCircleSharp
          className="text-primary mt-6 cursor-pointer"
          size={32}
          onClick={handleAddBenefit}
        />
      </div>

      <div className="mt-8">
        <h4 className="text-xl text-slate-700 dark:text-slate-200 font-bold">
          What are the pre requisites of the course?
        </h4>
        {prerequisites.map((prerequisite, index) => (
          <div key={index}>
            <input
              type="text"
              value={prerequisite.title}
              onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-md p-2 bg-background dark:bg-gray-800"
            />
          </div>
        ))}
        <IoAddCircleSharp
          className="text-primary mt-6 cursor-pointer"
          size={32}
          onClick={handleAddPrerequisite}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setActive(active - 1)}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Back
        </button>

        <button
          onClick={() => {
            if (
              benefits[benefits.length - 1]?.title !== "" &&
              prerequisites[prerequisites.length - 1]?.title !== ""
            ) {
              setActive(active + 1);
            } else {
              toast({
                title: "Error",
                description: "Please fill all fields",
                variant: "destructive",
              });
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
