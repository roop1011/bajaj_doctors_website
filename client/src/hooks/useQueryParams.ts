import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Filters, ConsultationType, SortOption } from "@/types/doctor";

export const useQueryParams = (): [Filters, (newFilters: Partial<Filters>) => void] => {
  const [location, setLocation] = useLocation();
  const isUpdatingRef = useRef(false);
  
  // Get initial filters from URL parameters on first load
  const getInitialFilters = useCallback((): Filters => {
    const params = new URLSearchParams(window.location.search);
    
    return {
      search: params.get("search") || "",
      consultationType: (params.get("consultationType") as ConsultationType) || "",
      specialties: params.get("specialties") ? params.get("specialties")!.split(",") : [],
      sortBy: (params.get("sortBy") as SortOption) || "",
    };
  }, []);
  
  // Initialize filters state with values from URL
  const [filters, setFilters] = useState<Filters>(getInitialFilters);
  
  // Update URL when filters change (but not on first render)
  useEffect(() => {
    // Skip if we're currently updating from URL change
    if (isUpdatingRef.current) {
      return;
    }
    
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.consultationType) params.set("consultationType", filters.consultationType);
    if (filters.specialties.length > 0) params.set("specialties", filters.specialties.join(","));
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    
    const queryString = params.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
    
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== newUrl) {
      setLocation(newUrl, { replace: true });
    }
  }, [filters, setLocation]);
  
  // Update filters when URL changes
  useEffect(() => {
    if (location === '/') return; // Skip on initial render with empty location
    
    isUpdatingRef.current = true;
    setFilters(getInitialFilters());
    isUpdatingRef.current = false;
  }, [location, getInitialFilters]);
  
  // Function to update filters
  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);
  
  return [filters, updateFilters];
};
