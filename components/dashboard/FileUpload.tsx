"use client";

import React from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  title: string;
  dropText: string;
  hintText: string;
  buttonText: string;
}

export function FileUpload({ title, dropText, hintText, buttonText }: FileUploadProps) {
  return (
    <div className="mt-6">
      <h4 className="text-xl font-bold text-black mb-4">{title}</h4>
      
      <div className="border-2 border-dashed border-[#BCCAC3] rounded-[30px] p-12 flex flex-col items-center justify-center bg-transparent transition-all hover:bg-gray-50/50">
        <div className="size-16 bg-[#F4F7F5] rounded-full flex items-center justify-center mb-4">
          <CloudUpload className="size-8 text-brand-base" />
        </div>
        
        <p className="text-lg font-bold text-black mb-1">{dropText}</p>
        <p className="text-sm text-brand-muted mb-6">{hintText}</p>
        
        <Button className="bg-brand-base hover:bg-brand-hover text-white px-8 h-12 rounded-[10px] font-bold">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
