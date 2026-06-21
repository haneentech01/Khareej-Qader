// components/dashboard/LessonViewer/VideoPlayer.tsx
"use client";

import React, { useEffect, useRef, useCallback, memo } from "react";
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

// ─── Types ──────────────────────────────────────
interface VideoPlayerProps {
    lessonId?: string | number;
    videoUrl?: string;
    thumbnailUrl?: string;
    onVideoCompleted?: () => void;
}

// ─── Constants ──────────────────────────────────
const RESUME_SEEK_DELAYS_MS = [300, 800, 1500, 2500, 4000];
const READY_FALLBACK_DELAY_MS = 3000;

// ─── Pure Functions ─────────────────────────────
function extractYoutubeId(url?: string): string | null {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : null;
}

// ─── Component ──────────────────────────────────
function VideoPlayerComponent({
    lessonId = "default",
    videoUrl,
    thumbnailUrl: _thumbnailUrl,
    onVideoCompleted,
}: VideoPlayerProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoRef = useRef<any>(null);
    const readyFiredRef = useRef(false);
    const seekAppliedRef = useRef(false);

    const {
        isCompleted,
        resumePosition,
        resumeLoaded,
        handleReady,
        handleEnded,
    } = useLessonProgress({
        lessonId: String(lessonId),
        onVideoCompleted,
    });

    const youtubeId = extractYoutubeId(videoUrl);

    // ─── Reset flags عند تغيير الدرس ────────────────
    useEffect(() => {
        readyFiredRef.current = false;
        seekAppliedRef.current = false;
    }, [lessonId, youtubeId]);

    // ─── Event Listeners ────────────────────────────
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const tryReady = () => {
            if (readyFiredRef.current) return;
            readyFiredRef.current = true;
            handleReady(video);
        };

        const events = [
            "canplay",
            "loadeddata",
            "loadedmetadata",
            "timeupdate",
            "play",
        ];

        events.forEach((event) => video.addEventListener(event, tryReady));
        video.addEventListener("ended", handleEnded);

        // Fallback لو لم يُطلق أي حدث
        const fallbackTimer = setTimeout(() => {
            if (!readyFiredRef.current) tryReady();
        }, READY_FALLBACK_DELAY_MS);

        return () => {
            events.forEach((event) => video.removeEventListener(event, tryReady));
            video.removeEventListener("ended", handleEnded);
            clearTimeout(fallbackTimer);
        };
    }, [lessonId, youtubeId, handleReady, handleEnded]);

    // ─── تطبيق الـ resume عند توفر البيانات ──────────
    useEffect(() => {
        const video = videoRef.current;
        if (!video || seekAppliedRef.current) return;
        if (!resumeLoaded || !resumePosition || resumePosition <= 0) return;

        const trySeek = () => {
            if (seekAppliedRef.current) return;
            try {
                video.currentTime = resumePosition;
                seekAppliedRef.current = true;
            } catch {
                // YouTube IFrame API قد يرفض seek إذا لم يكن جاهزاً
            }
        };

        const timers = RESUME_SEEK_DELAYS_MS.map((delay) =>
            setTimeout(trySeek, delay),
        );

        return () => timers.forEach(clearTimeout);
    }, [resumeLoaded, resumePosition, lessonId, youtubeId]);

    // ─── Empty State ────────────────────────────────
    if (!youtubeId) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-slate-900">
                <p className="text-white">الفيديو غير متاح</p>
            </div>
        );
    }

    return (
        <MediaController
            dir="ltr"
            className="video-player-container rounded-t-4xl overflow-hidden group w-full h-full"
        >
            {React.createElement("youtube-video", {
                ref: videoRef,
                slot: "media",
                src: `https://www.youtube.com/watch?v=${youtubeId}`,
                style: { width: "100%", height: "100%" },
            })}

            <MediaControlBar className="video-control-bar">
                <div className="flex items-center gap-2">
                    <MediaPlayButton className="video-button-transparent" />
                    <MediaSeekBackwardButton
                        seekOffset={10}
                        className="video-button-transparent"
                    />
                    <MediaSeekForwardButton
                        seekOffset={10}
                        className="video-button-transparent"
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

// ─── Memoized Export ────────────────────────────
export const VideoPlayer = memo(VideoPlayerComponent);