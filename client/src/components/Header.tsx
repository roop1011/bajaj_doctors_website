import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm = '' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(searchTerm);
  
  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials with a backend API
    setIsAuthenticated(true);
    setUser(email.split('@')[0]); // Just use the part before @ as username
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register the user with a backend API
    setIsAuthenticated(true);
    setUser(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold text-white">Roop Health</h1>
          </div>
          
          {/* Search bar */}
          <div className="max-w-xl w-full hidden md:block mx-4">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search Symptoms, Doctors, Specialists, Clinics"
                value={searchInput}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600"
                onClick={handleSearchSubmit}
              >
                <span className="text-sm font-medium">Search</span>
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <a href="#" className="text-white font-medium hover:text-blue-200">Find Doctors</a>
              <a href="#" className="text-white font-medium hover:text-blue-200">Appointments</a>
              <a href="#" className="text-white font-medium hover:text-blue-200">Health Records</a>
            </nav>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-white">Hi, {user}</span>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-blue-700"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-blue-800 hover:bg-blue-100">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    
                    {/* Login Form */}
                    <TabsContent value="login">
                      <form onSubmit={handleLogin}>
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold mb-4">
                            Sign in to your account
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full">Sign in</Button>
                        </DialogFooter>
                      </form>
                    </TabsContent>
                    
                    {/* Register Form */}
                    <TabsContent value="register">
                      <form onSubmit={handleRegister}>
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold mb-4">
                            Create a new account
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username" 
                              type="text" 
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-email">Email</Label>
                            <Input 
                              id="register-email" 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-password">Password</Label>
                            <Input 
                              id="register-password" 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full">Register</Button>
                        </DialogFooter>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
