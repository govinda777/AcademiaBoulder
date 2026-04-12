import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImg: string;
}

const VideoBackground = ({ videoUrl, fallbackImg }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsLoaded(true);
      });
      
      videoRef.current.addEventListener('error', () => {
        setIsError(true);
      });
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', () => {
          setIsLoaded(true);
        });
        
        videoRef.current.removeEventListener('error', () => {
          setIsError(true);
        });
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="hero-video-overlay"></div>
      
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {isError && (
        <ImageWithFallback
          src={fallbackImg}
          fallbackSrc="/placeholder-image.jpg"
          alt="Background"
          className="absolute h-full w-full object-cover"
        />
      )}
      
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute h-full w-full object-cover ${!isLoaded && 'opacity-0'}`}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
