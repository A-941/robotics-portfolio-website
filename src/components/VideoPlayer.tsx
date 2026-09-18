"use client";

import React, { useRef, useState } from "react";
import { Play, Film, AlertCircle } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  badge?: string;
  caption?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  badge = "Live Hardware Demo",
  caption = "Actual hardware run recorded from the physical breadboard setup.",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="rounded-2xl border p-5 sm:p-7 relative overflow-hidden"
      style={{
        backgroundColor: "#080612",
        borderColor: "rgba(168, 85, 247, 0.16)",
        boxShadow: "0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px -5px rgba(168,85,247,0.06)",
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <Film className="w-5 h-5 text-purple-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
            {title}
          </h3>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider border"
          style={{
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            borderColor: "rgba(168, 85, 247, 0.3)",
            color: "#c084fc",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {badge}
        </span>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border aspect-video flex items-center justify-center group shadow-2xl"
        style={{
          backgroundColor: "#040208",
          borderColor: "rgba(168, 85, 247, 0.15)",
        }}
      >
        {hasError ? (
          <div className="flex flex-col items-center gap-2.5 text-zinc-500 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <p className="text-sm font-medium text-zinc-300">Video source temporarily offline</p>
            <p className="text-xs font-mono text-zinc-500">{src}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setHasError(true)}
            >
              Your browser does not support the video tag.
            </video>

            {/* Custom Play Button Overlay */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlayToggle}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border hover:scale-110 shadow-2xl backdrop-blur-sm cursor-pointer group-hover:bg-purple-600/90"
                style={{
                  backgroundColor: "rgba(16, 11, 30, 0.8)",
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  color: "#ffffff",
                }}
                aria-label="Play hardware demo video"
              >
                <Play className="w-6 h-6 fill-white translate-x-0.5 text-white" />
              </button>
            )}
          </>
        )}
      </div>

      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {caption}
      </p>
    </div>
  );
};
