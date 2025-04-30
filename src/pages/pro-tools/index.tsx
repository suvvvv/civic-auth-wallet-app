import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';

const ProToolsPage: React.FC = () => {
  const { user } = useAuth();
  const { points, canAccessFeature } = usePoints();
  
  // Check if user can access this feature
  const hasAccess = canAccessFeature('pro-tools');

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-dark-card rounded-xl shadow-2xl border border-dark-border animate-fade-in">
          <div className="mb-6 text-neon-purple">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Authentication Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access Pro Tools.</p>
          <Link to="/" className="inline-block py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // If user doesn't have access, show gated content screen
  if (!hasAccess) {
    return (
      <div className="py-8 animate-fade-in">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
            Pro Tools
          </h1>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
              Advanced Web3 tools for power users
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-dark-card p-8 rounded-xl shadow-xl border border-dark-border animate-grid-reveal text-center">
          <div className="mb-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-gray-700 blur-md rounded-full opacity-50"></div>
              <div className="relative bg-dark-input w-full h-full rounded-full flex items-center justify-center text-gray-500 text-4xl">
                🔒
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-white">This Feature is Locked</h2>
          <p className="text-gray-400 mb-6">
            You need 50 Civic Points to unlock Pro Tools. You currently have {points} points.
          </p>
          
          <div className="mb-8">
            <div className="h-4 bg-dark-input rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-full relative z-10 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, (points / 50) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-500">0</span>
              <span className="text-gray-500">50 Points Required</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/moments/create" 
              className="py-3 px-6 bg-dark-input hover:bg-gray-800 text-white rounded-lg border border-dark-border transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create Moments
            </Link>
            
            <Link 
              to="/referral" 
              className="py-3 px-6 bg-dark-input hover:bg-gray-800 text-white rounded-lg border border-dark-border transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              Invite Friends
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User has access to Pro Tools
  return (
    <div className="py-8 animate-fade-in">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
          Pro Tools
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Advanced Web3 tools for power users
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tool Card 1 */}
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in">
          <div className="h-48 bg-gradient-to-br from-dark-input to-dark-card flex items-center justify-center p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <svg className="w-24 h-24 text-neon-purple opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Advanced Analytics
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Detailed insights into your Web3 activity with custom reports and visualizations.
            </p>
            <button className="w-full py-2 px-4 bg-dark-input hover:bg-gray-800 text-neon-purple rounded-lg border border-neon-purple/30 transition-colors text-sm font-medium">
              Launch Tool
            </button>
          </div>
        </div>
        
        {/* Tool Card 2 */}
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="h-48 bg-gradient-to-br from-dark-input to-dark-card flex items-center justify-center p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <svg className="w-24 h-24 text-neon-purple opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Smart Contract Generator
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Create custom smart contracts with an intuitive no-code interface.
            </p>
            <button className="w-full py-2 px-4 bg-dark-input hover:bg-gray-800 text-neon-purple rounded-lg border border-neon-purple/30 transition-colors text-sm font-medium">
              Launch Tool
            </button>
          </div>
        </div>
        
        {/* Tool Card 3 */}
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="h-48 bg-gradient-to-br from-dark-input to-dark-card flex items-center justify-center p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <svg className="w-24 h-24 text-neon-purple opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Multi-Chain Dashboard
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Monitor and manage your assets across multiple blockchains in one interface.
            </p>
            <button className="w-full py-2 px-4 bg-dark-input hover:bg-gray-800 text-neon-purple rounded-lg border border-neon-purple/30 transition-colors text-sm font-medium">
              Launch Tool
            </button>
          </div>
        </div>
        
        {/* Tool Card 4 */}
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="h-48 bg-gradient-to-br from-dark-input to-dark-card flex items-center justify-center p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <svg className="w-24 h-24 text-neon-purple opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Gas Optimizer
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Intelligent transaction timing and fee optimization for Ethereum transactions.
            </p>
            <button className="w-full py-2 px-4 bg-dark-input hover:bg-gray-800 text-neon-purple rounded-lg border border-neon-purple/30 transition-colors text-sm font-medium">
              Launch Tool
            </button>
          </div>
        </div>
        
        {/* Tool Card 5 */}
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="h-48 bg-gradient-to-br from-dark-input to-dark-card flex items-center justify-center p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <svg className="w-24 h-24 text-neon-purple opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"></path>
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              NFT Metadata Editor
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Advanced tools for creating and editing NFT metadata and properties.
            </p>
            <button className="w-full py-2 px-4 bg-dark-input hover:bg-gray-800 text-neon-purple rounded-lg border border-neon-purple/30 transition-colors text-sm font-medium">
              Launch Tool
            </button>
          </div>
        </div>
        
        {/* Tool Card 6 */}
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="h-48 bg-gradient-to-br from-dark-input to-dark-card flex items-center justify-center p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <svg className="w-24 h-24 text-neon-purple opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Automated Trading
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Create custom trading strategies with conditional triggers and safety limits.
            </p>
            <button className="w-full py-2 px-4 bg-dark-input hover:bg-gray-800 text-neon-purple rounded-lg border border-neon-purple/30 transition-colors text-sm font-medium">
              Launch Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProToolsPage;
