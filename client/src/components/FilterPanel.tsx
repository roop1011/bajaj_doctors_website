import React from 'react';
import { Filters, SortOption, ConsultationType } from '@/types/doctor';

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
  const handleConsultationChange = (consultationType: ConsultationType) => {
    // Toggle if same value is selected again
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

  const handleSortChange = (sortBy: SortOption) => {
    // Toggle if same value is selected again
    if (filters.sortBy === sortBy) {
      updateFilters({ sortBy: '' });
    } else {
      updateFilters({ sortBy });
    }
  };

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="text-neutral-500 font-medium text-sm uppercase mb-3"
        >
          Consultation Mode
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="radio" 
              id="video-consult" 
              name="consultation-type" 
              value="Video Consult" 
              className="hidden" 
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationChange('Video Consult')}
            />
            <label htmlFor="video-consult" className="flex items-center cursor-pointer">
              <span 
                className={`w-5 h-5 inline-block mr-2 rounded-full border ${
                  filters.consultationType === 'Video Consult' 
                    ? 'bg-primary border-primary' 
                    : 'border-grey'
                }`}
              ></span>
              <span>Video Consult</span>
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="in-clinic" 
              name="consultation-type" 
              value="In Clinic" 
              className="hidden" 
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationChange('In Clinic')}
            />
            <label htmlFor="in-clinic" className="flex items-center cursor-pointer">
              <span 
                className={`w-5 h-5 inline-block mr-2 rounded-full border ${
                  filters.consultationType === 'In Clinic' 
                    ? 'bg-primary border-primary' 
                    : 'border-grey'
                }`}
              ></span>
              <span>In Clinic</span>
            </label>
          </div>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="text-neutral-500 font-medium text-sm uppercase mb-3"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {availableSpecialties.map((specialty) => {
            const id = `specialty-${specialty.replace(/[^a-zA-Z0-9]/g, '-')}`;
            
            return (
              <div key={specialty} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={id} 
                  value={specialty} 
                  className="hidden" 
                  data-testid={`filter-${id}`}
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                />
                <label htmlFor={id} className="flex items-center cursor-pointer">
                  <span 
                    className={`w-5 h-5 inline-block mr-2 rounded border ${
                      filters.specialties.includes(specialty) 
                        ? 'bg-primary border-primary' 
                        : 'border-grey'
                    }`}
                  ></span>
                  <span>{specialty}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="text-neutral-500 font-medium text-sm uppercase mb-3"
        >
          Sort By
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="radio" 
              id="sort-fees" 
              name="sort-option" 
              value="fees" 
              className="hidden" 
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
            />
            <label htmlFor="sort-fees" className="flex items-center cursor-pointer">
              <span 
                className={`w-5 h-5 inline-block mr-2 rounded-full border ${
                  filters.sortBy === 'fees' 
                    ? 'bg-primary border-primary' 
                    : 'border-grey'
                }`}
              ></span>
              <span>Fees (Low to High)</span>
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="sort-experience" 
              name="sort-option" 
              value="experience" 
              className="hidden" 
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
            />
            <label htmlFor="sort-experience" className="flex items-center cursor-pointer">
              <span 
                className={`w-5 h-5 inline-block mr-2 rounded-full border ${
                  filters.sortBy === 'experience' 
                    ? 'bg-primary border-primary' 
                    : 'border-grey'
                }`}
              ></span>
              <span>Experience (High to Low)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
