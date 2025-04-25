import React, { useState, useRef, useEffect } from 'react';
import { Doctor } from '@/types/doctor';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  suggestions: Doctor[];
  onSuggestionClick: (doctor: Doctor) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearch, 
  suggestions, 
  onSuggestionClick 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (doctor: Doctor) => {
    onSearch(doctor.name);
    onSuggestionClick(doctor);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-6" ref={searchRef}>
      <div className="w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-neutral-300 h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search doctors by name"
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="autocomplete-input"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setShowSuggestions(false);
            }
          }}
        />
        
        {/* Autocomplete Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute w-full mt-2 max-h-64 overflow-auto shadow-lg bg-white rounded-lg z-10">
            {suggestions.map((doctor) => (
              <div
                key={doctor.id}
                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer suggestion-item"
                data-testid="suggestion-item"
                onClick={() => handleSuggestionSelect(doctor)}
              >
                <div>{doctor.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
