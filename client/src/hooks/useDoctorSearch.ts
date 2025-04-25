import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Doctor, ApiDoctor, Filters } from "@/types/doctor";
import { filterDoctors, getAutocompleteSuggestions, getAllSpecialties } from "@/utils/filters";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

// Convert API doctor format to our application format
const convertApiDoctors = (apiDoctors: ApiDoctor[]): Doctor[] => {
  if (!Array.isArray(apiDoctors)) return [];
  
  return apiDoctors.map(apiDoctor => {
    // Extract experience years from string like "13 Years of experience"
    const experienceMatch = apiDoctor.experience?.match(/(\d+)/);
    const experienceYears = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
    
    // Extract fee amount from string like "₹ 500"
    const feeMatch = apiDoctor.fees?.match(/(\d+)/);
    const feeAmount = feeMatch ? parseInt(feeMatch[1], 10) : 0;
    
    // Get location from clinic address
    const location = apiDoctor.clinic?.address?.locality 
      ? `${apiDoctor.clinic.address.locality}, ${apiDoctor.clinic.address.city || ''}`
      : '';
    
    return {
      id: apiDoctor.id || `doc-${Math.random().toString(36).substr(2, 9)}`,
      name: apiDoctor.name || 'Unknown Doctor',
      image: apiDoctor.photo || undefined,
      specialty: apiDoctor.specialities?.map(spec => spec.name) || [],
      experience: experienceYears,
      fee: feeAmount,
      consultationMode: {
        videoConsult: !!apiDoctor.video_consult,
        inClinic: !!apiDoctor.in_clinic
      },
      languages: apiDoctor.languages || [],
      location: location,
      clinic: apiDoctor.clinic?.name || ''
    };
  });
};

export const useDoctorSearch = (filters: Filters) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([]);
  
  // Fetch all doctors
  const { 
    data: apiDoctors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      try {
        console.log('Fetching doctors from API:', API_URL);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        console.log('API response received:', data.length, 'doctors');
        return data as ApiDoctor[];
      } catch (err) {
        console.error('Error fetching doctors:', err);
        throw new Error('Failed to fetch doctors data. Please try again later.');
      }
    },
  });
  
  // Convert API data to our app format
  const doctors = convertApiDoctors(apiDoctors);
  
  // Get filtered doctors based on current filters
  const filteredDoctors = doctors.length > 0 ? filterDoctors(doctors, filters) : [];
  
  // Update autocomplete suggestions when search changes
  useEffect(() => {
    try {
      if (doctors.length && filters.search) {
        setSuggestions(getAutocompleteSuggestions(doctors, filters.search));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error generating suggestions:', err);
      setSuggestions([]);
    }
  }, [doctors, filters.search]);
  
  // Extract all unique specialties from doctors data
  useEffect(() => {
    try {
      if (doctors.length) {
        setAvailableSpecialties(getAllSpecialties(doctors));
      }
    } catch (err) {
      console.error('Error extracting specialties:', err);
      setAvailableSpecialties([]);
    }
  }, [doctors]);
  
  return {
    doctors: filteredDoctors,
    suggestions,
    availableSpecialties,
    isLoading,
    error,
  };
};
