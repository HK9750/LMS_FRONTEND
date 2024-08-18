import { FC } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  className?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, title, className }) => {
  return (
    <div>
      <video
        src={videoUrl}
        controls
        className={`h-96 w-full ${className}`}
      ></video>
      <h3 className="text-lg mt-3 text-center">{title}</h3>
    </div>
  );
};
export default VideoPlayer;
