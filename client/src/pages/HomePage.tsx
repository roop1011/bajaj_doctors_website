import React, { useCallback, useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import DoctorList from '@/components/DoctorList';
import { Doctor, Filters } from '@/types/doctor';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// API URL
const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

// Initial filters state
const initialFilters: Filters = {
  search: '',
  consultationType: '',
  specialties: [],
  sortBy: ''
};

const HomePage: React.FC = () => {
  // State for doctors data and UI
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: ${response.status} ${response.statusText}`);
        }
        
        const apiData = await response.json();
        
        // Transform API data to our format
        const transformedDoctors = apiData.map((doctor: any) => {
          // Extract experience years from string
          const experienceMatch = doctor.experience?.match(/(\d+)/);
          const experienceYears = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
          
          // Extract fee amount from string
          const feeMatch = doctor.fees?.match(/(\d+)/);
          const feeAmount = feeMatch ? parseInt(feeMatch[1], 10) : 0;
          
          // Get location from clinic address
          const location = doctor.clinic?.address?.locality 
            ? `${doctor.clinic.address.locality}, ${doctor.clinic.address.city || ''}`
            : '';
            
          return {
            id: doctor.id || `doc-${Math.random().toString(36).substr(2, 9)}`,
            name: doctor.name || 'Unknown Doctor',
            image: doctor.photo || undefined,
            specialty: doctor.specialities?.map((spec: any) => spec.name) || [],
            experience: experienceYears,
            fee: feeAmount,
            consultationMode: {
              videoConsult: !!doctor.video_consult,
              inClinic: !!doctor.in_clinic
            },
            languages: doctor.languages || [],
            location: location,
            clinic: doctor.clinic?.name || ''
          };
        });
        
        setDoctors(transformedDoctors);
        
        // Extract unique specialties
        const allSpecialties = new Set<string>();
        transformedDoctors.forEach(doctor => {
          doctor.specialty.forEach(specialty => {
            allSpecialties.add(specialty);
          });
        });
        setSpecialties(Array.from(allSpecialties));
        
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch doctors data"));
        setIsLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);
  
  // Filter doctors based on current filters
  useEffect(() => {
    if (!doctors.length) return;
    
    let filtered = [...doctors];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) || 
        doctor.specialty.some(s => s.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply consultation type filter
    if (filters.consultationType) {
      if (filters.consultationType === 'Video Consult') {
        filtered = filtered.filter(doctor => doctor.consultationMode.videoConsult);
      } else if (filters.consultationType === 'In Clinic') {
        filtered = filtered.filter(doctor => doctor.consultationMode.inClinic);
      }
    }
    
    // Apply specialty filter
    if (filters.specialties.length > 0) {
      filtered = filtered.filter(doctor => 
        filters.specialties.some(s => doctor.specialty.includes(s))
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      if (filters.sortBy === 'fees') {
        filtered.sort((a, b) => a.fee - b.fee);
      } else if (filters.sortBy === 'experience') {
        filtered.sort((a, b) => b.experience - a.experience);
      }
    }
    
    setFilteredDoctors(filtered);
  }, [doctors, filters]);
  
  // Handler for updating filters
  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);
  
  // Handle search
  const handleSearch = useCallback((searchTerm: string) => {
    updateFilters({ search: searchTerm });
  }, [updateFilters]);
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} searchTerm={filters.search} />
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white p-12 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-medium text-red-500 mb-2">Error loading data</h3>
              <p className="text-neutral-500">
                {error.message || 'Failed to load doctors. Please try again later.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} searchTerm={filters.search} />
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
              <span className="text-neutral-600">Loading doctors...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Main layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <Header onSearch={handleSearch} searchTerm={filters.search} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Panel */}
            <div className="w-full lg:w-72">
              <FilterPanel 
                filters={filters} 
                updateFilters={updateFilters} 
                availableSpecialties={specialties} 
              />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Doctor Count and Search Results */}
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 ? 's' : ''} Available
                </h1>
                {filters.search && (
                  <p className="text-sm text-gray-600">Search results for: "{filters.search}"</p>
                )}
              </div>
              
              {/* Doctor List */}
              {filteredDoctors.length > 0 ? (
                <DoctorList 
                  doctors={filteredDoctors} 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  isLoading={false} 
                />
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No doctors found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria to find more doctors.
                  </p>
                  <Button 
                    className="mt-4"
                    onClick={() => setFilters(initialFilters)}
                  >
                    Clear all filters
                  </Button>
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
