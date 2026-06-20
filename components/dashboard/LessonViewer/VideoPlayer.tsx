// components/dashboard/LessonViewer/VideoPlayer.tsx
"use client";

import React, { useEffect, useRef, useCallback } from "react";
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
import { useLessonProgress } from "@/hooks/dashboard/videos/useLessonProgress";

interface VideoPlayerProps {
    lessonId?: string | number;
    videoUrl?: string;
    thumbnailUrl?: string;
    onVideoCompleted?: () => void;
}

export function VideoPlayer({
    lessonId = "default",
    videoUrl,
    thumbnailUrl,
    onVideoCompleted,
}: VideoPlayerProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playerRef = useRef<any>(null);
    const seekedRef = useRef(false);

    const {
        isCompleted,
        resumePosition,
        resumeLoaded,
        handleDuration,
        handleProgress,
        handleProgressCheck,
        handleEnded,
    } = useLessonProgress({
        lessonId: String(lessonId),
        onVideoCompleted,
    });

    // ─── Reset seek flag عند تغيير الدرس ─────────
    useEffect(() => {
        seekedRef.current = false;
    }, [lessonId]);

    // ─── استعادة آخر موقع ──────────────────────────
    const handleReady = useCallback(() => {
        if (
            !seekedRef.current &&
            resumeLoaded &&
            resumePosition &&
            resumePosition > 0 &&
            playerRef.current
        ) {
            // ننتظر شوية للتأكد أن الـ player جاهز فعلاً
            setTimeout(() => {
                playerRef.current?.seekTo(resumePosition, "seconds");
                seekedRef.current = true;
            }, 500);
        }
    }, [resumeLoaded, resumePosition]);

    // ─── لو resumeLoaded تأخر عن onReady ─────────
    useEffect(() => {
        if (
            !seekedRef.current &&
            resumeLoaded &&
            resumePosition &&
            resumePosition > 0 &&
            playerRef.current
        ) {
            playerRef.current.seekTo(resumePosition, "seconds");
            seekedRef.current = true;
        }
    }, [resumeLoaded, resumePosition]);

    const onProgressHandler = (state: {
        playedSeconds: number;
        played: number;
    }) => {
        handleProgress(state);
        handleProgressCheck(state);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playerProps: Record<string, any> = {
        ref: playerRef,
        slot: "media",
        src: videoUrl,
        onReady: handleReady,
        onDuration: handleDuration,
        onProgress: onProgressHandler,
        onEnded: handleEnded,
        progressInterval: 2000,
        style: { width: "100%", height: "100%" },
        className: "bg-cover",
    };

    return (
        <MediaController
            dir="ltr"
            className="video-player-container rounded-t-4xl overflow-hidden group"
        >
            <ReactPlayer {...playerProps}>
                <track
                    label="thumbnails"
                    default
                    kind="metadata"
                    src={thumbnailUrl}
                />
            </ReactPlayer>

            <MediaControlBar className="video-control-bar">
                <div className="flex items-center gap-2">
                    <MediaPlayButton className="video-button-transparent" />
                    <MediaSeekBackwardButton
                        seekOffset={10}
                        className="video-button-transparent relative group/seek"
                    />
                    <MediaSeekForwardButton
                        seekOffset={10}
                        className="video-button-transparent relative group/seek"
                    />
                </div>

                <MediaTimeRange className="mx-4 flex-1 video-button-transparent" />

                <div className="flex items-center gap-1 md:gap-3">
                    <MediaTimeDisplay
                        showDuration
                        className="text-xs md:text-sm text-white/90 video-button-transparent"
                    />
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