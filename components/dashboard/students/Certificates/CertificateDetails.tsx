import { Info, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateDetailsProps {
  title: string;
  typeLabel: string;
  typeValue: string;
  trackLabel: string;
  trackValue: string;
  expectedDateLabel: string;
  expectedDate: string;
  alertMessage: string;
  downloadBtnText: string;
  disabledHint: string;
  isUnlocked: boolean;
}

export function CertificateDetails({
  title,
  typeLabel,
  typeValue,
  trackLabel,
  trackValue,
  expectedDateLabel,
  expectedDate,
  alertMessage,
  downloadBtnText,
  disabledHint,
  isUnlocked,
}: CertificateDetailsProps) {
  return (
    <div className="flex flex-col h-full gap-6">


      {/* certificate info */}
      <div className="bg-white rounded-[20px] shadow-xs 
      border border-gray-50 flex flex-col gap-4 p-6">
        <h3 className="text-xl font-bold text-brand-primary">
          {title}
        </h3>
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <span className="text-brand-muted">
            {typeLabel}
          </span>
          <span className="font-bold text-black">
            {typeValue}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <span className="text-brand-muted">
            {trackLabel}
          </span>
          <span className="font-bold text-black">
            {trackValue}
          </span>
        </div>

        <div className="flex justify-between items-center pb-4">
          <span className="text-brand-muted">
            {expectedDateLabel}
          </span>
          <span className="font-bold text-black">
            {expectedDate}
          </span>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-[#FFF4E5] border border-[#FFDDB3] 
      rounded-xl p-5 flex gap-4 items-start">
        <Info className="size-6 text-[#B26200] shrink-0" />
        <p className="text-sm font-medium text-[#7A4100] leading-relaxed">
          {alertMessage}
        </p>
      </div>

      {/* button for download the certificate */}
      <div className="flex flex-col gap-3">
        <Button
          disabled={!isUnlocked}
          className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2
            ${isUnlocked
              ? "bg-brand-base hover:bg-brand-hover text-white"
              : "bg-[#E1E3E1] text-brand-muted cursor-not-allowed"}`}
        >
          {!isUnlocked && <LockKeyhole className="size-5" />}
          {downloadBtnText}
        </Button>
        {!isUnlocked && (
          <p className="text-xs text-center text-brand-muted font-medium">
            {disabledHint}
          </p>
        )}
      </div>
    </div>
  );
}
