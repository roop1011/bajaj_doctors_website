import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold text-primary">MediConnect</h1>
          </div>
          <div className="hidden md:block">
            <nav className="flex space-x-8">
              <a href="#" className="text-primary-dark font-medium">Find Doctors</a>
              <a href="#" className="text-neutral-400 hover:text-primary-dark font-medium">Appointments</a>
              <a href="#" className="text-neutral-400 hover:text-primary-dark font-medium">Health Records</a>
              <a href="#" className="text-neutral-400 hover:text-primary-dark font-medium">Help</a>
            </nav>
          </div>
          <div>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
