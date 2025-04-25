import { Doctor, Filters } from "@/types/doctor";

export const filterDoctors = (doctors: Doctor[], filters: Filters): Doctor[] => {
  let filteredDoctors = [...doctors];
  
  // Filter by name search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name?.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by consultation type
  if (filters.consultationType) {
    if (filters.consultationType === 'Video Consult') {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.consultationMode?.videoConsult);
    } else if (filters.consultationType === 'In Clinic') {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.consultationMode?.inClinic);
    }
  }
  
  // Filter by specialties
  if (filters.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      if (!Array.isArray(doctor.specialty)) return false;
      
      return filters.specialties.some(specialty => 
        doctor.specialty.some(s => s?.toLowerCase() === specialty.toLowerCase())
      );
    });
  }
  
  // Sort doctors
  if (filters.sortBy) {
    if (filters.sortBy === 'fees') {
      filteredDoctors.sort((a, b) => (a.fee || 0) - (b.fee || 0));
    } else if (filters.sortBy === 'experience') {
      filteredDoctors.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    }
  }
  
  return filteredDoctors;
};

export const getAutocompleteSuggestions = (doctors: Doctor[], searchTerm: string): Doctor[] => {
  if (!searchTerm) return [];
  
  const searchLower = searchTerm.toLowerCase();
  return doctors
    .filter(doctor => doctor.name?.toLowerCase().includes(searchLower))
    .slice(0, 3); // Limit to top 3 matches
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtySet = new Set<string>();
  
  doctors.forEach(doctor => {
    if (Array.isArray(doctor.specialty)) {
      doctor.specialty.forEach(specialty => {
        if (specialty) {
          specialtySet.add(specialty);
        }
      });
    }
  });
  
  return Array.from(specialtySet).sort();
};
