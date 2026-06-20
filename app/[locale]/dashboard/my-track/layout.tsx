// app/[locale]/dashboard/my-track/layout.tsx
"use client";

import { LessonPathProvider } from "@/providers/LessonPathProvider";
import React from "react";

function MyTrackLayout({ children }: { children: React.ReactNode }) {
    return (
        <LessonPathProvider>
            {children}
        </LessonPathProvider>
    );
}

export default MyTrackLayout;