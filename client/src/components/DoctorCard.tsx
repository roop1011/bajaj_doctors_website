import React from 'react';
import { Doctor } from '@/types/doctor';
import { Clock, ThumbsUp, Video, Building, Stethoscope, MapPin } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm" data-testid="doctor-card">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center md:justify-start">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-400">{doctor.name.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              <h3 data-testid="doctor-name" className="text-lg font-semibold text-neutral-500">
                {doctor.name}
              </h3>
              <p data-testid="doctor-specialty" className="text-primary text-sm mb-2">
                {doctor.specialty.join(', ')}
              </p>
              <p data-testid="doctor-experience" className="text-neutral-400 text-sm mb-2">
                <Clock className="inline-block mr-1 h-4 w-4" /> {doctor.experience} years experience
              </p>
              
              {doctor.reviews ? (
                <div className="flex items-center mb-2">
                  <div className="bg-green-50 text-success text-xs font-medium px-2 py-1 rounded mr-2">
                    {doctor.reviews.rating}% <ThumbsUp className="inline-block ml-1 h-3 w-3" />
                  </div>
                  <span className="text-neutral-400 text-sm">{doctor.reviews.count} patient reviews</span>
                </div>
              ) : (
                <div className="flex items-center mb-2">
                  <div className="bg-green-50 text-success text-xs font-medium px-2 py-1 rounded mr-2">
                    <span>Highly Rated</span> <ThumbsUp className="inline-block ml-1 h-3 w-3" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <p data-testid="doctor-fee" className="text-neutral-500 font-medium text-lg mb-1">
                ₹{doctor.fee}
              </p>
              <p className="text-neutral-300 text-sm mb-3">Consultation fee</p>
              <div className="space-x-2">
                <button className="bg-secondary hover:bg-secondary-dark text-white text-sm font-medium px-4 py-2 rounded">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <div className="flex flex-wrap gap-3">
              {doctor.consultationMode.videoConsult && (
                <div className="bg-neutral-100 text-neutral-400 text-xs px-3 py-1 rounded-full">
                  <Video className="inline-block mr-1 h-3 w-3" /> Video Consult
                </div>
              )}
              {doctor.consultationMode.inClinic && (
                <div className="bg-neutral-100 text-neutral-400 text-xs px-3 py-1 rounded-full">
                  <Building className="inline-block mr-1 h-3 w-3" /> In Clinic
                </div>
              )}
              {doctor.languages.length > 0 && (
                <div className="bg-neutral-100 text-neutral-400 text-xs px-3 py-1 rounded-full">
                  <Stethoscope className="inline-block mr-1 h-3 w-3" /> {doctor.languages.join(', ')}
                </div>
              )}
              {doctor.location && (
                <div className="bg-neutral-100 text-neutral-400 text-xs px-3 py-1 rounded-full">
                  <MapPin className="inline-block mr-1 h-3 w-3" /> {doctor.location}
                </div>
              )}
              {doctor.clinic && (
                <div className="bg-neutral-100 text-neutral-400 text-xs px-3 py-1 rounded-full">
                  <Building className="inline-block mr-1 h-3 w-3" /> {doctor.clinic}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
