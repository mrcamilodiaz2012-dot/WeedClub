"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Navigation, MapPin } from "lucide-react";
import { useDebounce } from "use-debounce";
import { createClient } from "@/utils/supabase/client";

export type Location = {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
};

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: Location | null) => void;
  selectedLocation: Location | null;
}

export function LocationModal({ isOpen, onClose, onLocationSelect, selectedLocation }: LocationModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      // Clear suggestions when modal opens
      setSearchTerm("");
      setSuggestions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchLocations() {
      if (!debouncedSearchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .ilike('name', `%${debouncedSearchTerm}%`)
        .limit(10);

      if (!error && data) {
        setSuggestions(data as Location[]);
      }
      setIsLoading(false);
    }

    fetchLocations();
  }, [debouncedSearchTerm, supabase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background-base">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle bg-background-base">
        <h2 className="text-lg font-bold text-text-primary">Ubicación</h2>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
          Introduce tu dirección
        </h3>
        <p className="text-text-secondary text-[15px] mb-6 leading-relaxed">
          Usamos tu ubicación para ofrecerte la experiencia más cercana y relevante. Descubre lo que hay cerca de ti.
        </p>

        {/* Search Input */}
        <div className="relative mb-6">
          <div className="w-full h-[54px] bg-background-secondary rounded-2xl flex items-center px-4 border border-border-subtle focus-within:border-[#00E676] transition-colors">
            <Search size={20} className="text-text-secondary mr-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar una dirección"
              className="bg-transparent border-none outline-none text-[16px] text-text-primary w-full placeholder:text-text-secondary"
              autoFocus
            />
            {isLoading && (
              <div className="w-4 h-4 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin shrink-0 ml-3" />
            )}
          </div>
        </div>

        {/* Current Location Button */}
        {!searchTerm && (
          <button 
            className="flex items-center gap-4 w-full p-2 hover:bg-background-secondary rounded-xl transition-colors text-left"
            onClick={() => {
              // Mock geolocation select, or implement real logic
              onLocationSelect(null); // Reset to default
              onClose();
            }}
          >
            <div className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center shrink-0 border border-border-subtle">
              <Navigation size={18} className="text-text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary font-semibold text-[15px]">Ubicación actual</span>
              <span className="text-text-secondary text-[13px] underline decoration-border-subtle underline-offset-2">Usar mi ubicación</span>
            </div>
          </button>
        )}

        {/* Suggestions List */}
        {searchTerm && suggestions.length > 0 && (
          <div className="flex flex-col">
            {suggestions.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  onLocationSelect(location);
                  onClose();
                }}
                className="flex items-center gap-4 py-3 border-b border-border-subtle last:border-b-0 hover:bg-background-secondary px-2 rounded-xl transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center shrink-0 border border-border-subtle">
                  <MapPin size={18} className="text-text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary font-medium text-[15px]">{location.name}</span>
                  {location.province && (
                    <span className="text-text-secondary text-[13px]">{location.province}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {searchTerm && !isLoading && suggestions.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            No se encontraron resultados para "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
