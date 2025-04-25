import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Doctor, Filters } from "@/types/doctor";
import { filterDoctors, getAutocompleteSuggestions, getAllSpecialties } from "@/utils/filters";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

// Validate doctor data and ensure it has required properties
const validateDoctors = (data: any[]): Doctor[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(item => ({
    id: item.id || `doc-${Math.random().toString(36).substr(2, 9)}`,
    name: item.name || 'Unknown Doctor',
    image: item.image,
    specialty: Array.isArray(item.specialty) ? item.specialty : [],
    experience: item.experience || 0,
    fee: item.fee || 0,
    reviews: {
      count: item.reviews?.count || 0,
      rating: item.reviews?.rating || 0
    },
    consultationMode: {
      videoConsult: !!item.consultationMode?.videoConsult,
      inClinic: !!item.consultationMode?.inClinic
    },
    languages: Array.isArray(item.languages) ? item.languages : [],
    location: item.location || ''
  }));
};

export const useDoctorSearch = (filters: Filters) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([]);
  
  // Fetch all doctors
  const { 
    data: rawDoctors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Error fetching doctors:', err);
        throw new Error('Failed to fetch doctors data. Please try again later.');
      }
    },
  });
  
  // Validate and normalize doctor data
  const doctors = validateDoctors(rawDoctors);
  
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
