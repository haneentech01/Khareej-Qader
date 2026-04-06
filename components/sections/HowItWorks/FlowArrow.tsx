import Image from "next/image";

interface FlowArrowProps {
    index: number;
    totalSteps: number;
}

export function FlowArrow({ index, totalSteps }: FlowArrowProps) {
    if (index === totalSteps - 1) return null;

    return (
        <>
            {/* LG Screens: 4-column layout (Arrows between 1-2, 2-3, 3-4) */}
            <div className="hidden lg:block absolute top-[-60px] left-[-50%]
            w-[85%] h-14 z-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                <Image
                    src="/images/dashArrow.png"
                    alt="Flow Arrow"
                    fill
                    className="object-contain"
                />
            </div>

            {/* MD Screens: 2-column layout (Arrows between 1-2 and 3-4 only) */}
            {index % 2 === 0 && (
                <div className="hidden md:block lg:hidden absolute top-[-60px] left-[-50%]
                w-[85%] h-14 z-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                    <Image
                        src="/images/dashArrow.png"
                        alt="Flow Arrow"
                        fill
                        className="object-contain"
                    />
                </div>
            )}
        </>
    );
}
