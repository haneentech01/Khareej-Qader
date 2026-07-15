"use client";

export function StudentsSkeleton() {
    return (
        <div
            className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-12 space-y-6 md:space-y-8"
        >
            {/* ─── Stats Card ─────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-5 flex items-center gap-4 animate-pulse">
                <div className="size-12 rounded-2xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-slate-100 rounded-md" />
                    <div className="h-6 w-16 bg-slate-200 rounded-md" />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] overflow-hidden w-full animate-pulse">
                {/* ─── Search Filter ──────────────────────────────────────────────────── */}
                <div>
                    <div className="h-11 w-full bg-slate-100 rounded-xl" />
                </div>

                {/* ─── Students Table ─────────────────────────────────────────────────── */}
                <div>
                    {/* Table header */}
                    <div className="border-b border-slate-100 bg-slate-50/40 px-6 py-5 flex gap-6">
                        <div className="h-4 w-32 bg-slate-200 rounded-md" />
                        <div className="h-4 w-24 bg-slate-200 rounded-md" />
                        <div className="h-4 w-20 bg-slate-200 rounded-md" />
                    </div>

                    {/* Table rows (5 skeleton rows) */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="border-b border-slate-50 px-6 py-4.5 flex items-center gap-6"
                        >
                            {/* Avatar + name */}
                            <div className="flex items-center gap-3 flex-1">
                                <div className="size-8 rounded-full bg-slate-100" />
                                <div className="h-4 w-32 bg-slate-100 rounded-md" />
                            </div>
                            {/* Email */}
                            <div className="h-4 w-40 bg-slate-100 rounded-md flex-1" />
                            {/* Action */}
                            <div className="h-8 w-20 bg-slate-100 rounded-xl" />
                        </div>
                    ))}
                </div>

                {/* ─── Pagination ─────────────────────────────────────────────────────── */}
                <div className="flex items-center justify-center gap-2 animate-pulse">
                    <div className="h-9 w-20 bg-slate-100 rounded-lg" />
                    <div className="h-9 w-9 bg-slate-200 rounded-lg" />
                    <div className="h-9 w-9 bg-slate-100 rounded-lg" />
                    <div className="h-9 w-20 bg-slate-100 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
