import React from 'react';
import { Doctor } from '@/types/doctor';
import { Clock, MapPin, Building, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  // Handle booking appointment
  const handleBookAppointment = () => {
    // In a real application, this would open a modal or navigate to an appointment booking page
    alert(`Booking an appointment with ${doctor.name}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4" data-testid="doctor-card">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image */}
        <div className="md:w-1/6 flex-shrink-0 mb-4 md:mb-0 flex justify-center md:justify-start">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-blue-100">
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl text-gray-400">{doctor.name.charAt(0)}</span>
            )}
          </div>
        </div>

        {/* Doctor Information */}
        <div className="md:w-3/4 flex-1">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              {/* Doctor Name and Specialty */}
              <h3 data-testid="doctor-name" className="text-lg font-semibold text-blue-800">
                {doctor.name}
              </h3>
              <p data-testid="doctor-specialty" className="text-neutral-700 text-sm mb-1">
                General Physician
              </p>
              <p className="text-neutral-500 text-xs mb-1">
                {doctor.specialty.length > 0 && `${doctor.specialty[0]} • General Medicine`}
              </p>
              
              {/* Doctor Experience */}
              <p data-testid="doctor-experience" className="text-neutral-600 text-sm mb-1">
                <Clock className="inline-block mr-1 h-3 w-3" /> {doctor.experience} yrs exp.
              </p>
              
              {/* Doctor Clinic Info */}
              <div className="mt-2 flex items-center text-xs text-neutral-500">
                {doctor.clinic && (
                  <div className="flex items-center mr-4">
                    <Medal className="h-3.5 w-3.5 mr-1" />
                    {doctor.clinic}
                  </div>
                )}
                {doctor.location && (
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {doctor.location}
                  </div>
                )}
              </div>
            </div>
            
            {/* Fee and Book Button */}
            <div className="mt-4 md:mt-0 text-right">
              <p data-testid="doctor-fee" className="text-blue-800 font-medium text-lg mb-1">
                ₹ {doctor.fee}
              </p>
              <Button 
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
