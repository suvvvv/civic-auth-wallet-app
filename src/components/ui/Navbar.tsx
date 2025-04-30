import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWallet, FaImage, FaChartLine, FaUsers, FaTools, FaFlask, FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, walletAddress } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-dark-background border-b border-dark-border text-dark-text shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-neon-purple p-2 rounded-full mr-1 animate-neon-glow">
              <img src="https://auth.civic.com/dashboard/favicon.ico" alt="Logo" className="w-6 h-6" />
            </div>
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
              Civic Momentum
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`flex items-center transition-colors ${location.pathname === '/' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}>
              <FaWallet className="mr-1" />
              Home
            </Link>
            <Link to="/moments" className={`flex items-center transition-colors ${location.pathname.includes('/moments') ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}>
              <FaImage className="mr-1" />
              Moments
            </Link>
            <Link to="/progress" className={`flex items-center transition-colors ${location.pathname === '/progress' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}>
              <FaChartLine className="mr-1" />
              Progress
            </Link>
            <Link to="/referral" className={`flex items-center transition-colors ${location.pathname === '/referral' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}>
              <FaUsers className="mr-1" />
              Refer
            </Link>
            <Link to="/learn" className={`flex items-center transition-colors ${location.pathname === '/learn' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}>
              <FaGraduationCap className="mr-1" />
              Learn
            </Link>
            
            {user && (
              <div className="flex items-center ml-4 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full opacity-0 group-hover:opacity-70 blur transition-opacity duration-300"></div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neon-purple relative transform transition-all duration-300 group-hover:scale-110 animate-neon-glow">
                  <img 
                    src={user.avatar || 'https://via.placeholder.com/40'} 
                    alt={user.name || 'Profile'} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                    }}
                  />
                </div>
                <div className="absolute top-full mt-2 right-0 bg-dark-card rounded-lg shadow-xl border border-dark-border p-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="text-center mb-2">
                    <p className="font-medium text-white">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className="pt-2 border-t border-dark-border">
                    <p className="text-xs text-gray-400 mb-1">Wallet Address:</p>
                    <p className="text-xs text-neon-purple truncate font-mono">{walletAddress || '0x...'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-primary-400 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
            {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-card border-t border-dark-border py-3">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`flex items-center transition-colors py-2 ${location.pathname === '/' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaWallet className="mr-2" />
              Home
            </Link>
            <Link 
              to="/moments" 
              className={`flex items-center transition-colors py-2 ${location.pathname.includes('/moments') ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaImage className="mr-2" />
              Moments
            </Link>
            <Link 
              to="/progress" 
              className={`flex items-center transition-colors py-2 ${location.pathname === '/progress' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaChartLine className="mr-2" />
              Progress
            </Link>
            <Link 
              to="/referral" 
              className={`flex items-center transition-colors py-2 ${location.pathname === '/referral' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUsers className="mr-2" />
              Refer
            </Link>
            <Link 
              to="/learn" 
              className={`flex items-center transition-colors py-2 ${location.pathname === '/learn' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaGraduationCap className="mr-2" />
              Learn
            </Link>
            <Link 
              to="/pro-tools" 
              className={`flex items-center transition-colors py-2 ${location.pathname === '/pro-tools' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaTools className="mr-2" />
              Pro Tools
            </Link>
            <Link 
              to="/beta-zone" 
              className={`flex items-center transition-colors py-2 ${location.pathname === '/beta-zone' ? 'text-neon-purple' : 'text-gray-300 hover:text-primary-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaFlask className="mr-2" />
              Beta Zone
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
