import Image from "next/image";
import { StepItem } from "@/types";

interface StepCardProps {
    step: StepItem;
}

export function StepCard({ step }: StepCardProps) {
    return (
        <div className="h-full bg-white
            rounded-[20px] p-4 pt-9 md:pt-16
            flex flex-col items-center text-center
            shadow-[0_10px_40px_#0000000D] border border-slate-50
            transition-all duration-500 group-hover:shadow-2xl
            group-hover:shadow-brand-primary/10 group-hover:-translate-y-2
            "
        >
            {/* TOP CIRCLE: Step Number with Gradient */}
            <div className="absolute top-0 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            size-14 md:size-16 rounded-full bg-linear-to-b from-brand-primary to-brand-dark
            text-white flex items-center justify-center font-bold text-xl md:text-2xl
            shadow-xl shadow-brand-primary/20 z-20 transition-transform duration-500
            group-hover:scale-110">
                {step.number}
            </div>

            {/* Content Title & Description */}
            <div className="w-full max-w-[240px] md:max-w-[180px]">
                <h3 className="text-lg md:text-xl font-bold text-black mb-4
            transition-colors group-hover:text-brand-primary">
                    {step.title}
                </h3>
                <p className="text-brand-muted text-sm md:text-base leading-relaxed grow">
                    {step.desc}
                </p>
            </div>

            {/* BOTTOM CIRCLE: Icon Display */}
            <div className="mt-5 md:mt-8 size-16 md:size-20 rounded-[24px]
            bg-[#F0F5F1] flex items-center justify-center
            transition-all duration-500 group-hover:rotate-6">
                <Image
                    src={step.icon}
                    alt={step.title}
                    width={32}
                    height={42}
                    className="object-contain w-auto h-auto"
                />
            </div>
        </div>
    );
}
