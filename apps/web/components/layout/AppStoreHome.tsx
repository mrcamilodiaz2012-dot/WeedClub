"use client";

import React from "react";
import { HeroCard } from "@/components/ui/HeroCard";
import { Carousel } from "@/components/ui/Carousel";
import { AppListItem } from "@/components/ui/AppListItem";
import { UserCircle } from "lucide-react";

export function AppStoreHome() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <div className="w-full h-full pb-24 overflow-y-auto bg-background-base">
      <div className="px-5 pt-12 pb-4">
        <span className="text-text-secondary text-sm font-semibold tracking-wider">
          {currentDate}
        </span>
        <div className="flex items-center justify-between mt-1">
          <h1 className="text-4xl font-display font-bold text-text-primary">
            Today
          </h1>
          <button className="w-9 h-9 rounded-full bg-background-secondary flex items-center justify-center text-blue-500 overflow-hidden">
            <UserCircle size={36} strokeWidth={1} />
          </button>
        </div>
      </div>

      <div className="px-5">
        <HeroCard
          subtitle="PREMIERE"
          title="Welcome to the New WeedClub"
          appName="WeedClub Official"
          appSubtitle="The ultimate cannabis community"
          imageSrc="https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=2000&auto=format&fit=crop"
        />

        <HeroCard
          subtitle="GETTING STARTED"
          title="Find Your Nearest Club"
          appName="Club Finder"
          appSubtitle="Locate and join verified clubs"
          imageSrc="https://images.unsplash.com/photo-1559815024-11f81dfca8d4?q=80&w=2000&auto=format&fit=crop"
        />
      </div>

      <Carousel title="Apps We Love" subtitle="Curated for you">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-[280px] shrink-0 snap-start">
            <div className="w-full h-[200px] bg-background-secondary rounded-2xl overflow-hidden mb-3 relative">
               <img src={`https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-accent to-emerald-400 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold">Club Companion {i}</span>
                 <span className="text-xs text-text-secondary">Essential toolkit</span>
               </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="px-5 mt-8 mb-4">
        <div className="flex items-end justify-between mb-4 border-b border-border-subtle pb-2">
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Top Free Apps
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <AppListItem appName="WeedClub Tracker" appSubtitle="Track your visits" inAppPurchases />
          <AppListItem appName="Green Maps" appSubtitle="Find dispensaries" />
          <AppListItem appName="Strain Guide" appSubtitle="Learn about strains" inAppPurchases />
          <AppListItem appName="Club Chat" appSubtitle="Connect with members" />
        </div>
      </div>
    </div>
  );
}
