"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { useDebounce } from "use-debounce";
import { createClient } from "@/utils/supabase/client";

export type Location = {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
};

interface LocationSearchProps {
  onLocationSelect: (location: Location | null) => void;
  selectedLocation?: Location | null;
}

export function LocationSearch({ onLocationSelect, selectedLocation }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setSearchTerm(selectedLocation.name);
    }
  }, [selectedLocation]);

  useEffect(() => {
    async function fetchLocations() {
      if (!debouncedSearchTerm.trim()) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      // If the term matches the currently selected location exactly, don't re-fetch/open
      if (selectedLocation && debouncedSearchTerm === selectedLocation.name) {
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
        setIsOpen(true);
      }
      setIsLoading(false);
    }

    fetchLocations();
  }, [debouncedSearchTerm, supabase, selectedLocation]);

  const handleSelect = (location: Location) => {
    setSearchTerm(location.name);
    setIsOpen(false);
    onLocationSelect(location);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // If the user clears the input, clear the selection
    if (e.target.value === "") {
      onLocationSelect(null);
    }
  };

  return (
    <div className="relative w-full z-50" ref={dropdownRef}>
      {/* Search Input Container - Increased height to 60px (approx 10% taller than 54px) */}
      <div className="w-full h-[60px] bg-background-secondary rounded-full flex items-center px-5 gap-3">
        <Search size={22} className="text-text-secondary" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder="Buscar Clubs en tu zona"
          className="bg-transparent border-none outline-none text-[17px] text-text-primary w-full placeholder:text-text-secondary font-medium"
        />
        {isLoading && (
          <div className="w-5 h-5 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-[68px] left-0 w-full bg-background-secondary rounded-2xl shadow-xl border border-border-subtle overflow-hidden flex flex-col max-h-[300px] overflow-y-auto">
          {suggestions.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelect(location)}
              className="flex items-center gap-3 px-5 py-4 hover:bg-[#2C2C2E] transition-colors w-full text-left border-b border-border-subtle last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full bg-background-base flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#00E676]" />
              </div>
              <div className="flex flex-col">
                <span className="text-text-primary font-medium">{location.name}</span>
                {location.province && (
                  <span className="text-text-secondary text-sm">{location.province}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
