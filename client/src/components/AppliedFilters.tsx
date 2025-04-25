import React from 'react';
import { Filters } from '@/types/doctor';
import { X } from 'lucide-react';

interface AppliedFiltersProps {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({ filters, updateFilters }) => {
  const hasActiveFilters = filters.search || 
                          filters.consultationType || 
                          filters.specialties.length > 0 || 
                          filters.sortBy;
  
  if (!hasActiveFilters) return null;
  
  const handleRemoveSearch = () => {
    updateFilters({ search: '' });
  };
  
  const handleRemoveConsultationType = () => {
    updateFilters({ consultationType: '' });
  };
  
  const handleRemoveSpecialty = (specialty: string) => {
    updateFilters({
      specialties: filters.specialties.filter(s => s !== specialty)
    });
  };
  
  const handleRemoveSortBy = () => {
    updateFilters({ sortBy: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-400">Applied Filters:</span>
        
        {filters.search && (
          <span className="bg-neutral-100 text-neutral-500 text-sm px-3 py-1 rounded-full flex items-center">
            <span>Search: {filters.search}</span>
            <button 
              className="ml-2 text-neutral-400 hover:text-neutral-500" 
              onClick={handleRemoveSearch}
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        )}
        
        {filters.consultationType && (
          <span className="bg-neutral-100 text-neutral-500 text-sm px-3 py-1 rounded-full flex items-center">
            <span>{filters.consultationType}</span>
            <button 
              className="ml-2 text-neutral-400 hover:text-neutral-500" 
              onClick={handleRemoveConsultationType}
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        )}
        
        {filters.specialties.map(specialty => (
          <span 
            key={specialty}
            className="bg-primary-light text-white text-sm px-3 py-1 rounded-full flex items-center"
          >
            <span>{specialty}</span>
            <button 
              className="ml-2 text-white hover:text-neutral-100" 
              onClick={() => handleRemoveSpecialty(specialty)}
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
        
        {filters.sortBy && (
          <span className="bg-neutral-100 text-neutral-500 text-sm px-3 py-1 rounded-full flex items-center">
            <span>
              Sorted by: {filters.sortBy === 'fees' ? 'Fees (Low to High)' : 'Experience (High to Low)'}
            </span>
            <button 
              className="ml-2 text-neutral-400 hover:text-neutral-500" 
              onClick={handleRemoveSortBy}
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default AppliedFilters;
