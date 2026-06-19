'use client';
import React, { useState } from 'react';
import { TabActivity } from './tabs/TabActivity';
import { TabPhotos } from './tabs/TabPhotos';
import { TabInfo } from './tabs/TabInfo';
import { TabReviews } from './tabs/TabReviews';
import type { Club } from '@/types';

type Tab = 'activity' | 'photos' | 'info' | 'reviews';

interface ProfileContentProps {
  club: Club;
}

export function ProfileContent({ club }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>('activity');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'activity', label: 'Actividad' },
    { id: 'photos', label: 'Fotos' },
    { id: 'info', label: 'Información' },
    { id: 'reviews', label: 'Reseñas' },
  ];

  return (
    <div className="w-full mt-8">
      {/* Sticky Navigation */}
      <div className="sticky top-[60px] md:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <nav className="flex space-x-8 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative py-4 text-sm font-semibold whitespace-nowrap transition-colors
                  ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {tab.label}
                {/* Active Indicator (Instagram/Airbnb style) */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-8 min-h-[50vh]">
        {activeTab === 'activity' && <TabActivity club={club} />}
        {activeTab === 'photos' && <TabPhotos club={club} />}
        {activeTab === 'info' && <TabInfo club={club} />}
        {activeTab === 'reviews' && <TabReviews club={club} />}
      </div>
    </div>
  );
}
