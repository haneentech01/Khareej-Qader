// components/dashboard/LessonViewer/VideoPlayer.tsx
"use client";

import React, { useEffect, useRef } from "react";
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

// استخراج YouTube ID من الـ URL
function extractYoutubeId(url?: string): string | null {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : null;
}

export function VideoPlayer({
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

    // Debug logging
    useEffect(() => {
        console.log("🎬 VideoPlayer mounted/updated:", {
            lessonId,
            videoUrl,
            youtubeId: extractYoutubeId(videoUrl),
            resumePosition,
            resumeLoaded,
        });
    }, [lessonId, videoUrl, resumePosition, resumeLoaded]);

    const youtubeId = extractYoutubeId(videoUrl);

    // ★ Reset flags عند تغيير الدرس
    useEffect(() => {
        readyFiredRef.current = false;
        seekAppliedRef.current = false;
    }, [lessonId, youtubeId]);

    // ★ ربط الأحداث بـ youtube-video element
    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            console.warn("⚠️ video element not ready yet");
            return;
        }

        console.log("🎧 Attaching listeners to youtube-video element");

        const tryReady = (eventName: string) => {
            if (readyFiredRef.current) return;
            readyFiredRef.current = true;
            console.log(`✅ ${eventName} fired — calling handleReady`);
            handleReady(video);
        };

        const onCanPlay = () => tryReady("canplay");
        const onLoadedData = () => tryReady("loadeddata");
        const onLoadedMetadata = () => tryReady("loadedmetadata");
        const onTimeUpdate = () => tryReady("timeupdate");
        const onPlay = () => tryReady("play");
        const onEnded = () => {
            console.log("🏁 ended fired");
            handleEnded();
        };

        video.addEventListener("canplay", onCanPlay);
        video.addEventListener("loadeddata", onLoadedData);
        video.addEventListener("loadedmetadata", onLoadedMetadata);
        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("play", onPlay);
        video.addEventListener("ended", onEnded);

        // Fallback timer
        const fallbackTimer = setTimeout(() => {
            if (!readyFiredRef.current) {
                console.warn("⏰ Fallback: forcing handleReady");
                tryReady("fallback-timer");
            }
        }, 3000);

        return () => {
            video.removeEventListener("canplay", onCanPlay);
            video.removeEventListener("loadeddata", onLoadedData);
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("play", onPlay);
            video.removeEventListener("ended", onEnded);
            clearTimeout(fallbackTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId, youtubeId, resumeLoaded, resumePosition]);

    // ★★★ تطبيق الـ resume عند توفر البيانات (الحل الجديد) ★★★
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (seekAppliedRef.current) return;
        if (!resumeLoaded) return;
        if (!resumePosition || resumePosition <= 0) return;

        console.log("🎯 Resume data ready, attempting seek to:", resumePosition);

        const trySeek = () => {
            if (seekAppliedRef.current) return;
            try {
                video.currentTime = resumePosition;
                seekAppliedRef.current = true;
                console.log("▶️ Successfully seeked to:", resumePosition);
            } catch (err) {
                console.error("❌ Seek attempt failed:", err);
            }
        };

        // محاولات متعددة لأن YouTube IFrame API يحتاج وقتاً
        const timers = [300, 800, 1500, 2500, 4000].map((delay) =>
            setTimeout(trySeek, delay),
        );

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [resumeLoaded, resumePosition, lessonId, youtubeId]);

    if (!youtubeId) {
        console.warn("⚠️ No YouTube ID found for URL:", videoUrl);
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