"use client";

function TrackProgressSkeleton() {
    return (
        <div className="bg-white rounded-[20px] p-10 border border-slate-100 shadow-sm space-y-6">
            <div className="h-6 w-32 bg-slate-200 rounded-full" />
            <div className="h-9 w-72 bg-slate-200 rounded-xl" />
            <div className="flex gap-4 items-center">
                <div className="h-3 w-40 bg-slate-100 rounded-full" />
                <div className="h-5 w-px bg-[#BCCAC3]" />
                <div className="h-3 w-20 bg-slate-200 rounded-full" />
            </div>
            <div className="h-3 bg-[#E6E9E7] rounded-full max-w-[600px]" />
        </div>
    );
}

/** Skeleton لسطر واحد في الـ Timeline */
function LessonTimeLineSkeleton({ isLast }: { isLast?: boolean }) {
    return (
        <div className="flex gap-6 items-stretch min-h-[100px]">
            {/* Icon + Line */}
            <div className="flex flex-col items-center">
                <div className="size-10 rounded-full border-2 border-slate-200 bg-slate-100 shrink-0" />
                {!isLast && <div className="w-0.5 grow my-2 bg-gray-100" />}
            </div>

            {/* Content */}
            <div className="flex-1 pb-10 space-y-2">
                <div className="h-3 w-16 bg-slate-200 rounded" />
                <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
            </div>
        </div>
    );
}

export function MyTrackSkeleton() {
    const skeletonItems = Array.from({ length: 4 }, (_, i) => ({
        key: i,
        isLast: i === 3,
    }));

    return (
        <>
            <TrackProgressSkeleton />
            <div className="mt-5 md:mt-10">
                <div className="bg-white rounded-[20px] p-4 md:p-10 border border-slate-100 shadow-sm">
                    <div className="h-8 w-48 bg-slate-200 rounded-xl mb-10" />
                    {skeletonItems.map(({ key, isLast }) => (
                        <LessonTimeLineSkeleton key={key} isLast={isLast} />
                    ))}
                </div>
            </div>
        </>
    );
}