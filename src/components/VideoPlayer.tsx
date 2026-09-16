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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
            {title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {badge}
        </span>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black aspect-video flex items-center justify-center group shadow-2xl">
        {hasError ? (
          <div className="flex flex-col items-center gap-2 text-zinc-500 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <p className="text-sm font-medium text-zinc-300">Video source temporarily unavailable</p>
            <p className="text-xs text-zinc-500">Path: {src}</p>
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

            {/* Custom Overlay Play Button if not yet played */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlayToggle}
                className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-emerald-500 text-white flex items-center justify-center transition-all duration-300 border border-white/20 hover:scale-110 shadow-2xl backdrop-blur-sm cursor-pointer group-hover:bg-emerald-600/90 pointer-events-none sm:pointer-events-auto"
                aria-label="Play video"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
              </button>
            )}
          </>
        )}
      </div>

      <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
        {caption}
      </p>
    </div>
  );
};
