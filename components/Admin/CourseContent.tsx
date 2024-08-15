import React from "react";
import { IoRadioButtonOnSharp as IconButton } from "react-icons/io5";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoTrashBinSharp, IoChevronUp, IoChevronDown } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (data: any) => void;
  handleSubmit: () => void;
};

const CourseContent = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}: Props) => {
  const [activeSection, setActiveSection] = React.useState(0);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean[]>(
    Array(courseContentData.length).fill(false)
  );
  const { toast } = useToast();

  const validateContentData = (): boolean => {
    for (const section of courseContentData) {
      if (
        !section.title.trim() ||
        !section.videoSection.trim() ||
        !section.description.trim() ||
        !section.videoUrl.trim() ||
        !section.suggestions.trim()
      ) {
        return false;
      }
      for (const link of section.links) {
        if (!link.title.trim() || !link.url.trim()) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCollapseToggle = (index: number) => {
    setIsCollapsed(
      isCollapsed.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleInputChange = (
    sectionIndex: number,
    field: string,
    value: string
  ) => {
    const updatedData = courseContentData.map((section: any, index: number) => {
      if (index === sectionIndex) {
        // Return a new object with the updated field
        return {
          ...section,
          [field]: value,
        };
      }
      return section;
    });
    setCourseContentData(updatedData);
  };

  const handleLinkChange = (
    sectionIndex: number,
    linkIndex: number,
    field: string,
    value: string
  ) => {
    const updatedData = courseContentData.map((section: any, index: number) => {
      if (index === sectionIndex) {
        const updatedLinks = section.links.map((link: any, lIndex: number) => {
          if (lIndex === linkIndex) {
            return {
              ...link,
              [field]: value,
            };
          }
          return link;
        });

        return {
          ...section,
          links: updatedLinks,
        };
      }
      return section;
    });

    setCourseContentData(updatedData);
  };

  const handleAddContent = (index: number) => {
    if (validateContentData()) {
      const updatedData = [
        ...courseContentData,
        {
          title: "",
          description: "",
          videoUrl: "",
          videoSection: courseContentData[index].videoSection,
          links: [{ title: "", url: "" }],
          suggestions: "",
        },
      ];

      setCourseContentData(updatedData);
      setIsCollapsed([...isCollapsed, false]);
    } else {
      toast({
        title: "Error",
        description: "Please fill out all fields first.",
        variant: "destructive",
      });
    }
  };

  const handleAddLink = (index: number) => {
    if (validateContentData()) {
      const updatedData = [...courseContentData];

      const updatedLinks = [
        ...updatedData[index].links,
        { title: "", url: "" },
      ];

      updatedData[index] = {
        ...updatedData[index],
        links: updatedLinks,
      };

      setCourseContentData(updatedData);
    } else {
      toast({
        title: "Error",
        description: "Please fill out all fields first.",
        variant: "destructive",
      });
    }
  };

  const handleAddSection = () => {
    if (validateContentData()) {
      setCourseContentData([
        ...courseContentData,
        {
          title: "",
          description: "",
          videoUrl: "",
          videoSection: "Untitled Section",
          links: [{ title: "", url: "" }],
          suggestions: "",
        },
      ]);

      setIsCollapsed([...isCollapsed, false]);
    } else {
      toast({
        title: "Error",
        description: "Please fill out all fields first.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContentData = (index: number) => {
    const updatedData = courseContentData.filter(
      (_: any, i: number) => i !== index
    );
    setCourseContentData(updatedData);
  };

  return (
    <div className="w-[80%] text-foreground dark:text-white ml-8 mt-24 mb-6">
      {courseContentData.map((section: any, index: number) => (
        <div
          key={index}
          className="text-foreground bg-card dark:bg-card-dark rounded py-4 px-6 mb-4"
        >
          <div className="flex justify-between items-center">
            <div
              className={`${
                courseContentData[index - 1]?.videoSection ===
                section.videoSection
                  ? "hidden"
                  : "flex gap-x-4 items-center"
              }`}
            >
              <label className="text-lg font-bold">
                Section:
                <input
                  type="text"
                  value={section.videoSection}
                  onChange={(e) =>
                    handleInputChange(index, "videoSection", e.target.value)
                  }
                  className="ml-2 bg-transparent border-none outline-none placeholder:text-gray-500"
                  placeholder="Enter section name"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <label className="font-bold">{index + 1}. </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                className="w-full bg-transparent outline-none placeholder:text-gray-500 text-black"
                placeholder="Enter title"
              />
            </div>

            <div className="flex justify-center items-center">
              <IconButton
                onClick={() => handleCollapseToggle(index)}
                className="text-muted"
              >
                {isCollapsed[index] ? (
                  <IoChevronDown size={20} />
                ) : (
                  <IoChevronUp size={20} />
                )}
              </IconButton>
              <IoTrashBinSharp
                onClick={() => handleDeleteContentData(index)}
                size={24}
                className="font-bold cursor-pointer text-error"
              />
            </div>
          </div>

          {!isCollapsed[index] && (
            <>
              <div className="mt-4">
                <label className="block mb-2 font-bold">
                  Description:
                  <textarea
                    value={section.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 placeholder:text-gray-500"
                    placeholder="Enter description"
                  />
                </label>
                <label className="block mb-2 font-bold">
                  Video URL:
                  <input
                    type="text"
                    value={section.videoUrl}
                    onChange={(e) =>
                      handleInputChange(index, "videoUrl", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 placeholder:text-gray-500"
                    placeholder="Enter video URL"
                  />
                </label>
                <label className="block mb-2 font-bold">
                  Video Length (in minutes):
                  <input
                    type="text"
                    value={section.videoLength}
                    onChange={(e) =>
                      handleInputChange(index, "videoLength", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-300 outline-none mt-1"
                    placeholder="20"
                  />
                </label>
                <label className="block mb-2 font-bold">
                  Suggestions:
                  <textarea
                    value={section.suggestions}
                    onChange={(e) =>
                      handleInputChange(index, "suggestions", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 placeholder:text-gray-500"
                    placeholder="Enter suggestions"
                  />
                </label>
                <div className="mt-4">
                  {section.links.map((link: any, i: number) => (
                    <div key={i} className="mb-2">
                      <label className="block mb-1 font-bold">
                        Link Title:
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            handleLinkChange(index, i, "title", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 placeholder:text-gray-500"
                          placeholder="Enter link title"
                        />
                      </label>
                      <label className="block mb-1 font-bold">
                        Link URL:
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, i, "url", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 placeholder:text-gray-500"
                          placeholder="Enter link URL"
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddLink(index)}
                    className="flex items-center mt-2 text-primary"
                  >
                    <IoAddCircleSharp size={20} />
                    <span className="ml-1 font-bold">Add New Link</span>
                  </button>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleAddContent(index)}
                  className="flex items-center text-primary"
                >
                  <IoAddCircleSharp size={20} />
                  <span className="ml-1 font-bold">Add New Content</span>
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <button
        onClick={handleAddSection}
        className="flex items-center mt-4 mb-2 text-primary"
      >
        <IoAddCircleSharp size={24} />
        <span className="ml-2 font-bold">Add Section</span>
      </button>
    </div>
  );
};

export default CourseContent;
