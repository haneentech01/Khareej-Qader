"use client";

import Image from "next/image";
import { PlayButton } from "./PlayButton";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

interface VideoPlayerProps {
  playLabel: string;
}

export function VideoPlayer({ playLabel }: VideoPlayerProps) {
  const { handlePlay } = useVideoPlayer();

  return (
    <div className="relative mx-auto -mt-10 md:-mt-14 xl:-mt-20 max-w-7xl group overflow-visible">
      <div className="relative w-full aspect-16/10 
      md:aspect-video">
        <Image
          src="/images/laptop.png"
          alt="Program Overview Laptop"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <PlayButton label={playLabel} onClick={handlePlay} />
      </div>
    </div>
  );
}
