import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Filters, ConsultationType, SortOption } from "@/types/doctor";

export const useQueryParams = (): [Filters, (newFilters: Partial<Filters>) => void] => {
  const [location, setLocation] = useLocation();
  const isInitialMount = useRef(true);
  
  const getInitialFilters = useCallback((): Filters => {
    const params = new URLSearchParams(window.location.search);
    
    return {
      search: params.get("search") || "",
      consultationType: (params.get("consultationType") as ConsultationType) || "",
      specialties: params.get("specialties") ? params.get("specialties")!.split(",") : [],
      sortBy: (params.get("sortBy") as SortOption) || "",
    };
  }, []);
  
  const [filters, setFilters] = useState<Filters>(getInitialFilters);
  
  // Update URL when filters change, but skip on initial mount
  useEffect(() => {
    // Skip the effect on the initial render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Create query parameters from filters
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.consultationType) params.set("consultationType", filters.consultationType);
    if (filters.specialties.length > 0) params.set("specialties", filters.specialties.join(","));
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    
    // Build the new URL
    const queryString = params.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
    
    // Only update the URL if it's different from the current one
    if (newUrl !== window.location.pathname + window.location.search) {
      setLocation(newUrl, { replace: true });
    }
  }, [filters, setLocation]);
  
  // Listen for history changes (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setFilters(getInitialFilters());
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getInitialFilters]);
  
  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };
  
  return [filters, updateFilters];
};
