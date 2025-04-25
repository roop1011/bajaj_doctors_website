import React from 'react';
import { Filters, SortOption, ConsultationType } from '@/types/doctor';
import { Search } from 'lucide-react';

interface FilterPanelProps {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  availableSpecialties: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  updateFilters, 
  availableSpecialties 
}) => {
  const clearAllFilters = () => {
    updateFilters({
      consultationType: '',
      specialties: [],
      sortBy: ''
    });
  };

  const handleSortChange = (sortBy: SortOption) => {
    if (filters.sortBy === sortBy) {
      updateFilters({ sortBy: '' });
    } else {
      updateFilters({ sortBy });
    }
  };

  const handleConsultationChange = (consultationType: ConsultationType) => {
    if (filters.consultationType === consultationType) {
      updateFilters({ consultationType: '' });
    } else {
      updateFilters({ consultationType });
    }
  };

  const handleSpecialtyChange = (specialty: string) => {
    if (filters.specialties.includes(specialty)) {
      updateFilters({ 
        specialties: filters.specialties.filter(item => item !== specialty) 
      });
    } else {
      updateFilters({ 
        specialties: [...filters.specialties, specialty] 
      });
    }
  };

  return (
    <div className="w-full lg:w-72 bg-white p-0 rounded-md shadow-sm">
      {/* Header with Sort by and Clear All */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="font-medium">Sort by</div>
        <div className="text-sm text-blue-600 cursor-pointer" onClick={clearAllFilters}>
          Clear All
        </div>
      </div>
      
      {/* Price Filters */}
      <div className="border-b p-4">
        <div className="flex items-center mb-3">
          <input
            type="radio"
            id="price-low-high"
            name="price"
            className="w-4 h-4 text-blue-600 border-gray-300"
            checked={filters.sortBy === 'fees'}
            onChange={() => handleSortChange('fees')}
          />
          <label htmlFor="price-low-high" className="ml-2 text-sm font-medium text-gray-700">
            Price: Low-High
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="experience-most-first"
            name="experience"
            className="w-4 h-4 text-blue-600 border-gray-300"
            checked={filters.sortBy === 'experience'}
            onChange={() => handleSortChange('experience')}
          />
          <label htmlFor="experience-most-first" className="ml-2 text-sm font-medium text-gray-700">
            Experience: Most First
          </label>
        </div>
      </div>
      
      {/* Specialties Filter */}
      <div className="border-b p-4">
        <h3 className="font-medium mb-3">Specialities</h3>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search specialities"
            className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm"
          />
          <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {/* Display specialties as checkboxes */}
          {availableSpecialties.slice(0, 10).map((specialty) => (
            <div key={specialty} className="flex items-center">
              <input
                type="checkbox"
                id={`specialty-${specialty.replace(/\s+/g, '-').toLowerCase()}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor={`specialty-${specialty.replace(/\s+/g, '-').toLowerCase()}`}
                className="ml-2 text-sm text-gray-700"
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mode of consultation */}
      <div className="p-4">
        <h3 className="font-medium mb-3">Mode of consultation</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="video-consultation"
              name="consultation-mode"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationChange('Video Consult')}
              className="w-4 h-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="video-consultation" className="ml-2 text-sm text-gray-700">
              Video Consultation
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="in-clinic-consultation"
              name="consultation-mode"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationChange('In Clinic')}
              className="w-4 h-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="in-clinic-consultation" className="ml-2 text-sm text-gray-700">
              In-clinic Consultation
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="all-consultations"
              name="consultation-mode"
              checked={filters.consultationType === ''}
              onChange={() => updateFilters({ consultationType: '' })}
              className="w-4 h-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="all-consultations" className="ml-2 text-sm text-gray-700">
              All
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
