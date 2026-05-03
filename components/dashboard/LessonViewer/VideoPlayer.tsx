"use client";

import React from "react";
import ReactPlayer from "react-player";
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";
import "youtube-video-element";
import { useLessonProgress } from "@/hooks/useLessonProgress";

interface VideoPlayerProps {
    lessonId?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
}

export function VideoPlayer({
    lessonId = "default",
    videoUrl = "https://youtu.be/6QAELgirvjs?si=06Zg99i75Ku48xet",
    thumbnailUrl = "https://image.mux.com/6QAELgirvjs/storyboard.vtt",
}: VideoPlayerProps) {

    // فصل اللوجيك في Hook خاص
    const {
        videoRef,
        isCompleted,
        handleTimeUpdate,
        handleLoadedMetadata,
        togglePlay,
    } = useLessonProgress({ lessonId });

    return (
        <MediaController
            dir="ltr"
            className="video-player-container rounded-t-4xl overflow-hidden group">
            <ReactPlayer
                ref={videoRef as React.Ref<HTMLVideoElement>}
                slot="media"
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => togglePlay(true)}
                onPause={() => togglePlay(false)}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                className="bg-cover"
            >
                <track label="thumbnails" default kind="metadata" src={thumbnailUrl} />
            </ReactPlayer>

            <MediaControlBar className="video-control-bar">
                <div className="flex items-center gap-2">
                    <MediaPlayButton className="video-button-transparent" />

                    <MediaSeekBackwardButton
                        seekOffset={10}
                        className="video-button-transparent relative group/seek" />

                    <MediaSeekForwardButton
                        seekOffset={10}
                        className="video-button-transparent relative group/seek" />
                </div>

                <MediaTimeRange className="mx-4 flex-1 video-button-transparent" />

                <div className="flex items-center gap-1 md:gap-3">
                    <MediaTimeDisplay showDuration className="text-xs md:text-sm text-white/90 video-button-transparent" />

                    <div className="flex items-center group/volume">
                        <MediaMuteButton className="video-button-transparent" />
                        <MediaVolumeRange className="w-0 group-hover/volume:w-20 transition-all duration-300 overflow-hidden video-button-transparent" />
                    </div>

                    <MediaPlaybackRateButton className="video-button-transparent" />
                    <MediaFullscreenButton className="video-button-transparent" />
                </div>
            </MediaControlBar>

            {isCompleted && (
                <div className="video-completed-badge">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    الدرس مكتمل
                </div>
            )}
        </MediaController>
    );
}