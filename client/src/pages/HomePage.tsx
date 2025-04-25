import React, { useCallback } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorList from '@/components/DoctorList';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useDoctorSearch } from '@/hooks/useDoctorSearch';
import { Doctor } from '@/types/doctor';

const HomePage: React.FC = () => {
  // Get filters from URL params
  const [filters, updateFilters] = useQueryParams();
  
  // Fetch and filter doctors
  const { 
    doctors, 
    suggestions, 
    availableSpecialties, 
    isLoading, 
    error 
  } = useDoctorSearch(filters);

  // Memoize handlers to prevent unnecessary re-renders
  const handleSearch = useCallback((searchTerm: string) => {
    updateFilters({ search: searchTerm });
  }, [updateFilters]);

  const handleSuggestionClick = useCallback((doctor: Doctor) => {
    updateFilters({ search: doctor.name });
  }, [updateFilters]);

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white p-12 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-medium text-red-500 mb-2">Error loading data</h3>
              <p className="text-neutral-500">
                {(error as Error).message || 'Failed to load doctors. Please try again later.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* FilterPanel */}
            <FilterPanel 
              filters={filters} 
              updateFilters={updateFilters} 
              availableSpecialties={availableSpecialties} 
            />
            
            {/* Main Content Area */}
            <div className="flex-1">
              {/* SearchBar */}
              <SearchBar 
                searchTerm={filters.search} 
                onSearch={handleSearch} 
                suggestions={suggestions} 
                onSuggestionClick={handleSuggestionClick} 
              />
              
              {/* DoctorList */}
              <DoctorList 
                doctors={doctors} 
                filters={filters} 
                updateFilters={updateFilters} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
