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
        <Header onSearch={handleSearch} searchTerm={filters.search} />
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
      {/* Pass search functionality to Header */}
      <Header onSearch={handleSearch} searchTerm={filters.search} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* FilterPanel */}
            <div className="w-full lg:w-72">
              <FilterPanel 
                filters={filters} 
                updateFilters={updateFilters} 
                availableSpecialties={availableSpecialties} 
              />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Doctor Count and Applied Filters */}
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {doctors.length} Doctor{doctors.length !== 1 ? 's' : ''} Available
                </h1>
                {filters.search && (
                  <p className="text-sm text-gray-600">Search results for: "{filters.search}"</p>
                )}
              </div>
              
              {/* DoctorList */}
              <DoctorList 
                doctors={doctors} 
                filters={filters} 
                updateFilters={updateFilters} 
                isLoading={isLoading} 
              />
              
              {/* No Results */}
              {!isLoading && doctors.length === 0 && (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No doctors found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria to find more doctors.
                  </p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => updateFilters({ search: '', specialties: [], consultationType: '', sortBy: '' })}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
