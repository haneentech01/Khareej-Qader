"use client";

import { LessonPathProvider } from "@/providers/LessonPathProvider";

function MyTrackLayout({ children }: { children: React.ReactNode }) {
    return (
        <LessonPathProvider>
            {children}
        </LessonPathProvider>
    );
}

export default MyTrackLayout;