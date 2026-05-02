import { GraduationCap } from "lucide-react";

interface CertificateProgressCardProps {
  title: string;
  requirementsCompleted: string;
  percentCompletedText: string;
  currentCertificateLabel: string;
  trackName: string;
  trackDesc: string;
  percent: number;
}

export function CertificateProgressCard({
  title,
  requirementsCompleted,
  percentCompletedText,
  currentCertificateLabel,
  trackName,
  trackDesc,
  percent,
}: CertificateProgressCardProps) {
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-xs border border-gray-50 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

      {/* Right Section (Track Details) */}
      <div className="flex items-center gap-6 w-full lg:w-auto">
        <div className="w-12 h-16 rounded-2xl bg-[#E8FDF2] flex items-center justify-center shrink-0">
          <GraduationCap className="size-9 text-brand-base" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-primary mb-1.5">{currentCertificateLabel}</p>
          <h3 className="text-2xl font-bold text-black mb-1.5">{trackName}</h3>
          <p className="text-sm text-brand-muted max-w-[220px] leading-relaxed">{trackDesc}</p>
        </div>
      </div>

      {/* Middle Section (Circular Progress) */}
      <div className="flex items-center justify-center relative shrink-0">
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
          <circle
            stroke="#F1F5F9"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="var(--color-brand-base, #13774D)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-black leading-none mb-1">
            {percent}%
          </span>
          <span className="text-[10px] font-bold text-brand-muted">
            {percentCompletedText}
          </span>
        </div>
      </div>

      {/* Left Section (Linear Progress) */}
      <div className="w-full lg:w-[367px] flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-base font-bold text-black">
            {title}
          </span>
          <span className="text-sm text-brand-muted">
            {requirementsCompleted}
          </span>
        </div>
        <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-base h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

    </div>
  );
}
