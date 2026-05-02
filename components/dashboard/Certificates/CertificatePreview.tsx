import React from "react";
import { Award, BadgeCheck, Stamp } from "lucide-react";
import Image from "next/image";

interface CertificatePreviewProps {
  academyName: string;
  certificateType: string;
  trackName: string;
  certifyText: string;
  studentName: string;
  completionText: string;
  academicDirector: string;
  directorName: string;
  issueDateLabel: string;
  issueDate: string;
}

export function CertificatePreview({
  academyName,
  certificateType,
  trackName,
  certifyText,
  studentName,
  completionText,
  academicDirector,
  directorName,
  issueDateLabel,
  issueDate,
}: CertificatePreviewProps) {
  return (
    <div className="bg-white rounded-[32px] p-6 h-full relative">



      {/* Certificate Box */}
      <div className="bg-white w-full max-w-[584px] 
      rounded-lg p-6 border-12 border-[#006B561A] relative 
      overflow-hidden shadow-sm mx-auto">

        {/* Badge Image */}
        <div className="absolute top-0 left-0 w-48 h-60 z-10 ">
          <Image src="/images/topOverlay.png"
            alt="Top Overlay"
            fill
            className="object-cover"
          />
        </div>


        {/* Header */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-black text-[#006B56]">
            {academyName}
          </h2>
          <div className="absolute left-8 bg-[#F2F4F2] rounded-full p-2 border border-[#BCCAC34D]">
            <BadgeCheck className="size-8 text-[#BCCAC3]" strokeWidth={1.9} />
          </div>

        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2 mt-10">
          <span className="text-xl font-medium text-[#006B56]">
            {certificateType}
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            {trackName}
          </h1>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center mt-10">
          <p className="text-sm md:text-base text-brand-muted mb-4">
            {certifyText}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-black border-b-2 border-[#006B5633] pb-3 px-12 inline-block">
            {studentName}
          </h3>
          <p className="text-sm md:text-base text-brand-muted max-w-[428px] mt-8 leading-relaxed">
            {completionText}
          </p>
        </div>

        {/* Footer / Signatures */}
        <div className="w-full flex items-end justify-between mt-12 px-2 md:px-8">
          <div className="text-center">
            <h4 className="text-base md:text-lg font-bold text-black">
              {directorName}
            </h4>
            <p className="text-xs text-brand-muted mt-0.5">
              {academicDirector}
            </p>
          </div>

          <div className="flex items-center justify-center shrink-0">
            <div className="size-[85px] rounded-full
            bg-linear-to-br from-[#E2E8F0] to-[#94A3B8] 
            border-4 border-white shadow-sm flex items-center 
            justify-center relative">
              <div className="absolute inset-1 border-2 border-white rounded-full" />
              <Award className="size-8 text-white" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-brand-muted mb-1">
              {issueDateLabel}
            </p>
            <h4 className="text-sm font-bold text-black">
              {issueDate}
            </h4>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-56 h-56 z-10 ">
          <Image src="/images/bottomOverlay.png"
            alt="Bottom Overlay"
            fill
            className="object-cover"
          />
        </div>

      </div>

    </div >
  );
}
