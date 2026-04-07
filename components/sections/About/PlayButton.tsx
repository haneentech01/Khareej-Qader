import { Play } from "lucide-react";

interface PlayButtonProps {
  label: string;
  onClick: () => void;
}

export function PlayButton({ label, onClick }: PlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute inset-0 z-10 flex items-center justify-center 
                 rounded-3xl outline-none focus-visible:ring-4 
                 focus-visible:ring-brand-primary/50 transition-all 
                 cursor-pointer"
    >
      {/* Play Button Icon */}
      <div className="relative size-16 md:size-32 lg:size-40 bg-brand-primary 
                       rounded-full flex items-center justify-center text-white 
                       shadow-2xl transition-all duration-500 
                       group-hover:scale-110 group-hover:shadow-brand-primary/40 
                       group-active:scale-95 group-active:duration-150">
        <Play className="size-8 md:size-12 lg:size-16 fill-current 
                         ml-1.5 transition-transform group-hover:rotate-6" />
      </div>

      {/* Tooltip-like Text Overlay */}
      <span className="absolute bottom-[58px] md:bottom-40 lg:bottom-36 xl:bottom-44
                        right-0 -translate-x-12 md:right-10 lg:right-[108px] xl:right-36
                        text-white font-bold 
                        text-sm md:text-xl lg:text-2xl 
                        transition-all duration-500 delay-75 
                        opacity-0 translate-y-4 
                        group-hover:opacity-100 group-hover:translate-y-0 
                        pointer-events-none drop-shadow-md">
        {label}
      </span>
    </button>
  );
}
