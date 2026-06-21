"use client";

import React, { createContext, useContext } from "react";
import { useStudentPath } from "@/hooks/dashboard/useStudentPath";
import { StudentPathData } from "@/types";

interface LessonPathContextValue {
    data: StudentPathData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<unknown>;
    markVideoCompleted: (videoId: string | number) => void;
}

const LessonPathContext = createContext<LessonPathContextValue | null>(null);

export function LessonPathProvider({ children }: { children: React.ReactNode }) {
    const { data, loading, error, refetch, markVideoCompleted } = useStudentPath();

    return (
        <LessonPathContext.Provider value={{ data, loading, error, refetch, markVideoCompleted }}>
            {children}
        </LessonPathContext.Provider>
    );
}

export function useLessonPath() {
    const ctx = useContext(LessonPathContext);
    if (!ctx) throw new Error("useLessonPath must be used within LessonPathProvider");
    return ctx;
}