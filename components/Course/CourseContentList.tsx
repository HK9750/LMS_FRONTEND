import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoMdVideocam } from "react-icons/io";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}: Props) => {
  const [visibleSection, setVisibleSection] = React.useState<Set<string>>(
    new Set<string>()
  );

  // Find unique video sections
  const videoSections: string[] = Array.from(
    new Set<string>(data?.map((item: any) => item.videoSection))
  );

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSection);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }

    setVisibleSection(newVisibleSections);
  };

  return (
    <div
      className={`text-foreground ${
        !isDemo ? "ml-[-30px] w-full min-h-screen top-24 left-0 z-30" : "w-full"
      }`}
    >
      {videoSections.map((section: string, index: number) => {
        const isSectionVisible = visibleSection.has(section);
        const sectionVideos: any[] = data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVidCount = sectionVideos.length;
        const sectionVidLength = sectionVideos.reduce(
          (acc, item) => acc + item.videoLength,
          0
        );
        const sectionStartIndex = totalCount;
        totalCount += sectionVidCount;
        const sectionVidHours = sectionVidLength / 60;

        return (
          <div
            key={section}
            className={`${
              !isDemo ? "border-b border-border pb-2 mb-4" : "mb-4"
            }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg">{section}</h1>
              <button
                className="text-foreground"
                onClick={() => toggleSection(section)}
              >
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>

            <h2 className="text-muted-foreground text-sm">
              {sectionVidCount} Lessons - {sectionVidHours.toFixed(1)} Hours
            </h2>

            {isSectionVisible && (
              <div className="mt-3 space-y-3 border-t border-border pt-3">
                {sectionVideos.map((video: any, index: number) => (
                  <div
                    key={video.id}
                    className={`flex justify-between items-start cursor-pointer p-2 rounded-lg transition-colors ${
                      activeVideo === sectionStartIndex + index
                        ? "bg-muted text-primary"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveVideo(sectionStartIndex + index)}
                  >
                    <div className="flex items-center gap-4">
                      <IoMdVideocam
                        size={20}
                        className={`${
                          activeVideo === sectionStartIndex + index
                            ? "text-primary"
                            : "text-accent"
                        }`}
                      />
                      <h1 className="font-medium text-base">
                        {video.title.toString()}
                      </h1>
                    </div>
                    <h2 className="text-sm text-muted-foreground">
                      {video.duration || "10"} minutes
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
