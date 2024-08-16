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
      <h3>{title}</h3>
    </div>
  );
};
export default VideoPlayer;
