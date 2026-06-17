"use client";

import React from "react";
import { motion } from "framer-motion";

interface AppListItemProps {
  index?: number;
  appName: string;
  appSubtitle: string;
  iconSrc?: string;
  inAppPurchases?: boolean;
}

export function AppListItem({
  index,
  appName,
  appSubtitle,
  iconSrc,
  inAppPurchases = false,
}: AppListItemProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-4 py-3 w-full"
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-background-secondary shadow-sm shrink-0 border border-border-subtle">
        {iconSrc ? (
          <img src={iconSrc} alt={appName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-brand-accent to-emerald-400" />
        )}
      </div>

      <div className="flex flex-col flex-1 h-full justify-center border-b border-border-subtle/50 pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-text-primary font-semibold text-base">
              {appName}
            </span>
            <span className="text-text-secondary text-xs">
              {appSubtitle}
            </span>
          </div>

          <div className="flex flex-col items-center ml-4">
            <button className="bg-background-secondary hover:bg-gray-200 text-blue-500 font-bold text-sm px-5 py-1.5 rounded-full uppercase tracking-wide">
              GET
            </button>
            {inAppPurchases && (
              <span className="text-[9px] text-text-secondary mt-1 text-center leading-tight">
                In-App<br/>Purchases
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
