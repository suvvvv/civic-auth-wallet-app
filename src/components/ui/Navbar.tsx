import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaChartLine, FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-dark-background border-b border-dark-border text-dark-text shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-neon-purple p-2 rounded-full mr-1 animate-neon-glow">
              <img src="https://auth.civic.com/dashboard/favicon.ico" alt="Logo" className="w-6 h-6" />
            </div>
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
              Civic Wallet
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors">
              <FaWallet className="mr-1" />
              Dashboard
            </Link>
            <Link to="/transactions" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors">
              <FaChartLine className="mr-1" />
              Transactions
            </Link>
            <Link to="/security" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors">
              <FaShieldAlt className="mr-1" />
              Security
            </Link>
            
            {user && (
              <div className="flex items-center ml-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-500">
                  <img 
                    src={user.avatar || 'https://via.placeholder.com/32'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32';
                    }}
                  />
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
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaWallet className="mr-2" />
              Dashboard
            </Link>
            <Link 
              to="/transactions" 
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaChartLine className="mr-2" />
              Transactions
            </Link>
            <Link 
              to="/security" 
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaShieldAlt className="mr-2" />
              Security
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
