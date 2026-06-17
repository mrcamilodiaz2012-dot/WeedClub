"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface AppListItemProps {
  index?: number;
  title: string;
  subtitle: string;
  iconSrc?: string;
  verified?: boolean;
}

export function AppListItem({
  index,
  title,
  subtitle,
  iconSrc,
  verified = false,
}: AppListItemProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-4 py-3 w-full"
    >
      <div className="w-16 h-16 rounded-[14px] overflow-hidden bg-background-secondary shrink-0">
        {iconSrc ? (
          <img src={iconSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-brand-accent to-emerald-400" />
        )}
      </div>

      <div className="flex flex-col flex-1 h-full justify-center border-b border-border-subtle/30 pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-text-primary font-semibold text-base">
              {title}
            </span>
            <span className="text-text-secondary text-xs">
              {subtitle}
            </span>
          </div>

          <div className="flex flex-col items-center ml-4">
            <button className="bg-background-secondary hover:bg-gray-200 text-blue-500 font-bold text-sm px-5 py-1.5 rounded-full uppercase tracking-wide">
              VER
            </button>
            {verified && (
              <span className="text-[9px] text-[#00AA6C] font-semibold mt-1 text-center leading-tight flex items-center gap-0.5">
                <ShieldCheck size={10} />
                Verificado
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
