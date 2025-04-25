export interface Doctor {
  id: string;
  name: string;
  image?: string;
  specialty: string[];
  experience: number;
  fee: number;
  reviews: {
    count: number;
    rating: number;
  };
  consultationMode: {
    videoConsult: boolean;
    inClinic: boolean;
  };
  languages: string[];
  location: string;
}

export type ConsultationType = 'Video Consult' | 'In Clinic' | '';
export type SortOption = 'fees' | 'experience' | '';

export interface Filters {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}
