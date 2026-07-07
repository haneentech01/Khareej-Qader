"use client";

export function DashboardSkeleton() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* ─── Welcome Text Skeleton ──────────────── */}
            <div className="space-y-2">
                <div className="h-10 w-64 bg-slate-200 rounded-xl" />
                <div className="h-5 w-48 bg-slate-200/70 rounded-lg" />
            </div>

            {/* ─── Progress Hero Skeleton ──────────────── */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_40px_0_#22B48D0F] flex flex-col md:flex-row gap-8 md:gap-20">
                {/* Left: Track Info */}
                <div className="flex-1 space-y-5">
                    <div className="h-6 w-32 bg-slate-200 rounded-full" />
                    <div className="h-9 w-72 bg-slate-200 rounded-xl" />
                    <div className="h-3 w-48 bg-slate-100 rounded-full" />
                    <div className="h-3 bg-[#E6E9E7] rounded-full max-w-[555px]" />
                </div>

                {/* Right: Next Lesson Card */}
                <div className="md:w-80 bg-[#F4F7F5] rounded-4xl p-7 flex flex-col justify-between h-full min-h-[160px]">
                    <div className="space-y-4">
                        <div className="h-4 w-24 bg-slate-200 rounded-md" />
                        <div className="h-5 w-full bg-slate-200 rounded-lg" />
                        <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
                    </div>
                    <div className="h-12 w-full bg-slate-200 rounded-[10px] mt-4" />
                </div>
            </div>

            {/* ─── Task & Mentor Cards Skeleton ────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Task Card */}
                <div className="bg-white rounded-[30px] p-8 border border-slate-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="size-6 bg-slate-200 rounded-full" />
                            <div className="h-6 w-24 bg-slate-200 rounded-lg" />
                        </div>
                        <div className="h-4 w-28 bg-slate-100 rounded-md" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                        <div className="h-4 w-full bg-slate-100 rounded-md" />
                        <div className="h-4 w-2/3 bg-slate-100 rounded-md" />
                    </div>
                    <div className="h-4 w-40 bg-slate-100 rounded-md" />
                </div>

                {/* Mentor Card */}
                <div className="bg-white rounded-[30px] px-8 py-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-start gap-5 mb-7">
                        <div className="size-20 bg-slate-200 rounded-[18px]" />
                        <div className="flex-1 space-y-3">
                            <div className="h-4 w-20 bg-slate-200 rounded-md" />
                            <div className="h-7 w-40 bg-slate-200 rounded-lg" />
                            <div className="h-4 w-full bg-slate-100 rounded-md" />
                            <div className="h-4 w-3/4 bg-slate-100 rounded-md" />
                        </div>
                    </div>
                    <div className="h-12 w-full bg-slate-200 rounded-[10px]" />
                </div>
            </div>
        </div>
    );
}