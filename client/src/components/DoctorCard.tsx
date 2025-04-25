import React, { useState } from 'react';
import { Doctor } from '@/types/doctor';
import { Clock, MapPin, Building, Medal, Calendar, Clock3, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'video' | 'clinic'>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return format(date, 'yyyy-MM-dd');
  });
  
  // Generate available time slots
  const morningSlots = ['09:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonSlots = ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
  const eveningSlots = ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];
  
  const handleBookAppointment = () => {
    setIsBookingOpen(true);
  };
  
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your appointment');
      return;
    }
    
    alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}`);
    setIsBookingOpen(false);
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
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
              
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                    <DialogDescription>
                      Schedule an appointment with Dr. {doctor.name}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <Tabs defaultValue={doctor.consultationMode.inClinic ? "clinic" : "video"} className="w-full" onValueChange={(value) => setAppointmentType(value as 'video' | 'clinic')}>
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="clinic" disabled={!doctor.consultationMode.inClinic}>
                          <Building className="mr-2 h-4 w-4" />
                          In-Clinic Visit
                        </TabsTrigger>
                        <TabsTrigger value="video" disabled={!doctor.consultationMode.videoConsult}>
                          <Video className="mr-2 h-4 w-4" />
                          Video Consult
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="clinic">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Select Date</p>
                            <Select value={selectedDate} onValueChange={setSelectedDate}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableDates.map(date => (
                                  <SelectItem key={date} value={date}>
                                    {format(new Date(date), 'EEEE, MMMM d')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {selectedDate && (
                            <div>
                              <p className="text-sm font-medium mb-2">Select Time</p>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Morning</p>
                                  <div className="flex flex-wrap gap-2">
                                    {morningSlots.map(slot => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`px-3 py-1 text-sm rounded-full border ${
                                          selectedTime === slot 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Afternoon</p>
                                  <div className="flex flex-wrap gap-2">
                                    {afternoonSlots.map(slot => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`px-3 py-1 text-sm rounded-full border ${
                                          selectedTime === slot 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Evening</p>
                                  <div className="flex flex-wrap gap-2">
                                    {eveningSlots.map(slot => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`px-3 py-1 text-sm rounded-full border ${
                                          selectedTime === slot 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {selectedDate && selectedTime && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-md">
                              <p className="text-sm text-blue-800 font-medium">Appointment Summary</p>
                              <p className="text-sm mt-1">
                                <Calendar className="inline-block mr-1 h-3 w-3" />
                                {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                              </p>
                              <p className="text-sm">
                                <Clock3 className="inline-block mr-1 h-3 w-3" />
                                {selectedTime}
                              </p>
                              <p className="text-sm">
                                <Building className="inline-block mr-1 h-3 w-3" />
                                {doctor.clinic} - {doctor.location}
                              </p>
                              <p className="text-sm font-medium mt-1">
                                Fee: ₹ {doctor.fee}
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="video">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Select Date</p>
                            <Select value={selectedDate} onValueChange={setSelectedDate}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableDates.map(date => (
                                  <SelectItem key={date} value={date}>
                                    {format(new Date(date), 'EEEE, MMMM d')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {selectedDate && (
                            <div>
                              <p className="text-sm font-medium mb-2">Select Time</p>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Morning</p>
                                  <div className="flex flex-wrap gap-2">
                                    {morningSlots.map(slot => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`px-3 py-1 text-sm rounded-full border ${
                                          selectedTime === slot 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Afternoon</p>
                                  <div className="flex flex-wrap gap-2">
                                    {afternoonSlots.map(slot => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`px-3 py-1 text-sm rounded-full border ${
                                          selectedTime === slot 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Evening</p>
                                  <div className="flex flex-wrap gap-2">
                                    {eveningSlots.map(slot => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`px-3 py-1 text-sm rounded-full border ${
                                          selectedTime === slot 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {selectedDate && selectedTime && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-md">
                              <p className="text-sm text-blue-800 font-medium">Video Consultation Details</p>
                              <p className="text-sm mt-1">
                                <Calendar className="inline-block mr-1 h-3 w-3" />
                                {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                              </p>
                              <p className="text-sm">
                                <Clock3 className="inline-block mr-1 h-3 w-3" />
                                {selectedTime}
                              </p>
                              <p className="text-sm">
                                <Video className="inline-block mr-1 h-3 w-3" />
                                Video consultation with Dr. {doctor.name}
                              </p>
                              <p className="text-sm font-medium mt-1">
                                Fee: ₹ {doctor.fee}
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleConfirmBooking}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirm Booking
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
