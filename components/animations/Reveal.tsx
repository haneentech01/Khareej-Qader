"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    amount?: number;
    distance?: number;
    delay?: number;
    className?: string;
}

export function Reveal({
    children,
    amount = 0.08,
    distance = 36,
    delay = 0,
    className,
}: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{
                duration: 0.55,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
