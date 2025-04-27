import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaWallet, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { user, login, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-dark-card p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-opacity-90 border border-gray-800 animate-fade-in">
        <div className="flex flex-col items-center justify-center h-48">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
          </div>
          <p className="text-center mt-6 text-gray-400 font-medium">Connecting to your wallet...</p>
          <div className="mt-4 w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 animate-shimmer rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-dark-card p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-opacity-90 border border-gray-800 transform transition-all duration-500 hover:shadow-primary-500/10 hover:border-primary-500/30 animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-lg filter blur-xl opacity-50"></div>
          {user.avatar && (
            <div className="flex justify-center relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full blur opacity-70"></div>
              <div className="relative rounded-full p-1 bg-gradient-to-r from-primary-600 to-primary-400">
                <img 
                  src={user.avatar} 
                  alt="User avatar" 
                  className="w-24 h-24 rounded-full border-2 border-dark-card"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {user.name || 'User'}
          </h2>
          <p className="text-gray-400">{user.email}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-neon-purple/20 rounded-full text-xs text-neon-purple font-medium animate-neon-glow">
            {user.provider === 'google' ? 'Google Account' : 'Secure Identity'}
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-gray-300 rounded-lg border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group"
        >
          <FaSignOutAlt className="text-gray-400 group-hover:text-primary-400 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-card p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-opacity-90 border border-gray-800 animate-fade-in">
      <div className="w-full space-y-6">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-primary-600 to-primary-400 rounded-full mb-4 transform transition-transform hover:scale-110">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign In to Create Your Wallet</h2>
          <p className="text-gray-400 max-w-xs mx-auto">Secure, simple authentication with embedded wallet creation</p>
        </div>
        
        <button
          onClick={() => login({ loginMethods: ['google'] })}
          className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-white text-gray-800 font-medium transition-all hover:shadow-md hover:scale-105 transform duration-300 relative overflow-hidden group"
          disabled={isLoading}
        >
          <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-50 to-blue-100 transition-all duration-500 ease-out group-hover:w-full"></div>
          <div className="relative flex items-center justify-center">
            <FcGoogle className="mr-2 text-xl" />
            <span>Continue with Google</span>
          </div>
        </button>
        
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-dark-card text-sm text-gray-500">or</span>
          </div>
        </div>
        
        <button
          onClick={() => login()}
          className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium transition-all hover:from-primary-500 hover:to-primary-400 transform hover:scale-105 duration-300 relative overflow-hidden group"
          disabled={isLoading}
        >
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          <img src="https://auth.civic.com/dashboard/favicon.ico" alt="Civic" className="mr-2 w-5 h-5" />
          <span>Sign in with Civic</span>
        </button>
        
        <p className="text-sm text-gray-500 text-center mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
