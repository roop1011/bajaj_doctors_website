import React from 'react';
import { Doctor } from '@/types/doctor';
import DoctorCard from './DoctorCard';
import AppliedFilters from './AppliedFilters';
import { Filters } from '@/types/doctor';

interface DoctorListProps {
  doctors: Doctor[];
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  isLoading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ 
  doctors, 
  filters, 
  updateFilters, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-500">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="space-y-4">
        <AppliedFilters filters={filters} updateFilters={updateFilters} />
        <div className="bg-white p-12 rounded-lg shadow-sm text-center">
          <h3 className="text-xl font-medium text-neutral-500 mb-2">No doctors found</h3>
          <p className="text-neutral-400">
            Try adjusting your search or filter criteria to find more doctors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AppliedFilters filters={filters} updateFilters={updateFilters} />
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
