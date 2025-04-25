export interface ApiDoctorSpecialty {
  name: string;
}

export interface ApiDoctorClinic {
  name: string;
  address: {
    locality: string;
    city: string;
    address_line1: string;
    location: string;
    logo_url: string;
  };
}

export interface ApiDoctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: ApiDoctorSpecialty[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: ApiDoctorClinic;
  video_consult: boolean;
  in_clinic: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  image?: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultationMode: {
    videoConsult: boolean;
    inClinic: boolean;
  };
  languages: string[];
  location: string;
  clinic?: string;
  reviews?: {
    count: number;
    rating: number;
  };
}

export type ConsultationType = 'Video Consult' | 'In Clinic' | '';
export type SortOption = 'fees' | 'experience' | '';

export interface Filters {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}
