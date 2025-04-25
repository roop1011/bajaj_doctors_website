import { useState, useEffect, useCallback } from "react";
import { useLocation, useRoute } from "wouter";
import { Filters, ConsultationType, SortOption } from "@/types/doctor";

export const useQueryParams = (): [Filters, (newFilters: Partial<Filters>) => void] => {
  const [location, setLocation] = useLocation();
  
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
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.consultationType) params.set("consultationType", filters.consultationType);
    if (filters.specialties.length > 0) params.set("specialties", filters.specialties.join(","));
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    setLocation(newUrl, { replace: true });
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
