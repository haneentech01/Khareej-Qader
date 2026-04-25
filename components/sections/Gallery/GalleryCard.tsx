"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import { GalleryItem } from "@/types";

interface GalleryCardProps {
    item: GalleryItem;
    index?: number;
}

export function GalleryCard({ item, index = 0 }: GalleryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: Math.min(index * 0.3, 5),
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative w-full aspect-square rounded-[24px]
            overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.07)]
            transition-all duration-700 hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)]
            cursor-pointer"
        >
            <Image
                src={item.image}
                alt={`${item.title} ${item.id}`}
                fill
                className="object-contain p-6 transition-transform duration-[1.5s] group-hover:scale-110"
            />

            {/* Hover overlay — pure Tailwind CSS */}
            <div className="absolute inset-0 bg-linear-to-t from-brand-primary/80 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
            flex flex-col items-center justify-center gap-4">
                <div className="size-14 bg-white rounded-full flex items-center justify-center
                text-brand-primary shadow-2xl scale-0 group-hover:scale-100 group-hover:rotate-12
                transition-transform duration-500">
                    <Maximize2 className="size-6" />
                </div>
                <span className="text-white font-bold text-base tracking-wide
                translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                </span>
            </div>
        </motion.div>
    );
}
