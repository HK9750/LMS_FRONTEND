import { FC } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <div>
      <video src={videoUrl} controls className="h-96 w-full"></video>
    </div>
  );
};
export default VideoPlayer;
