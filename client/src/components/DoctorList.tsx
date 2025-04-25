import React from 'react';
import { Doctor } from '@/types/doctor';
import DoctorCard from './DoctorCard';
import { Filters } from '@/types/doctor';
import { Loader2 } from 'lucide-react';

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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-neutral-600">Loading doctors...</span>
      </div>
    );
  }

  // Empty state is now handled in HomePage component
  
  return (
    <div data-testid="doctors-list" className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
