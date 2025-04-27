import React, { useEffect, useState } from 'react';
import { FaEthereum, FaCopy, FaExternalLinkAlt, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Mock balance hook for demonstration
const useBalance = ({ address, enabled }: { address?: string | null, enabled: boolean }) => {
  const { user } = useAuth();
  const [data, setData] = useState<{ formatted: string; symbol: string } | undefined>(undefined);

  useEffect(() => {
    if (enabled && address && user) {
      // Generate a deterministic balance based on user ID
      let hash = 0;
      for (let i = 0; i < user.id.length; i++) {
        hash = hash + user.id.charCodeAt(i);
      }
      
      // Create a balance between 0.1 and 5.0 ETH
      const balance = (0.1 + (hash % 490) / 100).toFixed(4);
      
      // Simulate fetching balance with a short delay
      const timer = setTimeout(() => {
        setData({
          formatted: balance,
          symbol: 'ETH'
        });
      }, 600);

      return () => clearTimeout(timer);
    } else {
      setData(undefined);
    }
  }, [enabled, address, user]);

  return { data };
};

export const WalletActions: React.FC = () => {
  const { user, walletAddress } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [walletCreated, setWalletCreated] = useState(false);
  
  // Get balance if connected
  const { data: balanceData } = useBalance({
    address: walletAddress,
    enabled: !!walletAddress,
  });

  // Initialize wallet display when component mounts or user changes
  useEffect(() => {
    if (user && walletAddress) {
      setWalletCreated(true);
      // Add a small delay before showing the wallet to ensure smooth animation
      setTimeout(() => setIsLoading(false), 500);
    } else {
      setWalletCreated(false);
      setIsLoading(true);
    }
  }, [user, walletAddress]);

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Don't show anything if user is not authenticated
  if (!user) {
    return null;
  }
  
  // Show loading state while wallet is being created
  if (isLoading && !walletCreated) {
    return (
      <div className="mt-8 w-full max-w-md mx-auto">
        <div className="bg-dark-card rounded-xl p-8 shadow-2xl text-center backdrop-blur-sm bg-opacity-90 border border-gray-800 animate-fade-in">
          <div className="flex flex-col items-center justify-center mb-6">
            {/* Animated wallet creation icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-primary-400/30 rounded-full filter blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="relative">
                <svg className="h-20 w-20 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path className="text-gray-700" fill="currentColor" d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-2V6a2 2 0 00-2-2H4z"></path>
                  <path className="text-primary-500 animate-pulse" fill="currentColor" d="M18 9H2V6a2 2 0 012-2h12a2 2 0 012 2v3z"></path>
                  <circle className="text-white animate-ping" cx="19" cy="13" r="2" fill="currentColor" style={{animationDuration: '2s'}}></circle>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-3">Creating Your Wallet</h2>
            <p className="text-gray-400 mb-6">Please wait while we set up your embedded wallet...</p>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 animate-shimmer rounded-full" style={{backgroundSize: '200% 100%'}}></div>
            </div>
            
            {/* Animated steps */}
            <div className="mt-6 text-left w-full">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <svg className="mr-2 h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Generating secure keys...</span>
              </div>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <svg className="mr-2 h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Creating wallet address...</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <div className="mr-2 h-5 w-5 flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-primary-500 rounded-full border-t-transparent"></div>
                </div>
                <span>Connecting to blockchain...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Don't show wallet if it's not created yet
  if (!walletCreated) {
    return null;
  }

  return (
    <div className="mt-0 w-full max-w-md mx-auto">
      <div className="bg-dark-card rounded-xl p-6 shadow-2xl backdrop-blur-sm bg-opacity-90 border border-dark-border transform transition-all duration-500 hover:shadow-neon-purple/30 hover:border-neon-purple/50 animate-fade-in animate-grid-reveal">
        {/* Wallet header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full blur opacity-70 animate-pulse-slow"></div>
              <div className="relative bg-dark-card p-2 rounded-full animate-neon-glow">
                <FaEthereum className="text-neon-purple text-xl animate-hologram-flicker" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent">ETH Wallet</h3>
              <p className="text-xs text-gray-400">Ethereum Network</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-neon-purple border border-neon-purple/30">
              <span className="w-2 h-2 mr-1 bg-neon-purple rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
        </div>

        {/* Wallet address */}
        <div className="mb-6">
          <div className="text-xs text-gray-400 mb-1 flex items-center">
            <FaShieldAlt className="mr-1 text-neon-purple" />
            Wallet Address
          </div>
          <div className="flex items-center justify-between">
            <div className="relative overflow-hidden rounded-lg bg-dark-input p-3 text-sm font-mono text-neon-purple flex-1 mr-2 border border-neon-purple/20 animate-scanline">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent animate-shimmer" style={{backgroundSize: '200% 100%'}}></div>
              <div className="relative">
                {walletAddress ? (
                  <span className="truncate block animate-hologram-flicker">{walletAddress}</span>
                ) : (
                  <span className="text-gray-500">Connecting...</span>
                )}
              </div>
            </div>
            <button 
              onClick={copyToClipboard}
              className="p-3 bg-dark-input rounded-lg hover:bg-gray-700 transition-colors border border-neon-purple/20 animate-neon-glow"
              title="Copy address"
              disabled={!walletAddress}
            >
              {copied ? (
                <span className="text-neon-purple text-sm">Copied!</span>
              ) : (
                <FaCopy className="text-gray-400 hover:text-neon-purple transition-colors" />
              )}
            </button>
          </div>
          
          {copied && (
            <div className="flex items-center mt-2 text-xs text-primary-400 animate-fade-in">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Address copied to clipboard!</span>
            </div>
          )}
        </div>
        
        {/* Balance display with glow effect */}
        {balanceData && (
          <div className="bg-dark-input rounded-xl p-5 mb-6 animate-fade-in relative group transform hover:scale-[1.02] transition-all duration-300" style={{animationDelay: '0.4s'}}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/0 to-primary-400/0 group-hover:from-primary-600/20 group-hover:to-primary-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <p className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Balance
              </p>
              <div className="flex items-center">
                <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                  <FaEthereum className="text-primary-400 text-xl" />
                </div>
                <div>
                  <p className="text-white font-bold text-2xl">
                    {parseFloat(balanceData.formatted).toFixed(4)}
                  </p>
                  <p className="text-gray-400 text-xs">{balanceData.symbol}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Action buttons with advanced hover effects */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <button className="py-3 px-4 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium relative group overflow-hidden animate-neon-glow">
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
            <span className="relative z-10 flex items-center justify-center animate-hologram-flicker">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              Send
            </span>
          </button>
          <button className="py-3 px-4 bg-dark-input hover:bg-gray-700 text-white rounded-xl border border-neon-purple/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/20 font-medium relative group overflow-hidden animate-data-stream">
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-neon-purple opacity-10 group-hover:animate-shine"></div>
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
              </svg>
              Receive
            </span>
          </button>
        </div>
      </div>
      
      {/* Security features card with hover effects */}
      <div className="mt-6 bg-dark-card rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:shadow-primary-500/10 backdrop-blur-sm bg-opacity-90 border border-gray-800 animate-fade-in" style={{animationDelay: '0.8s'}}>
        <h3 className="text-xl font-bold text-white mb-5 flex items-center">
          <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
            <FaShieldAlt className="text-primary-400 text-xl" />
          </div>
          Security Features
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start transform transition-all duration-300 hover:translate-x-2 group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-400 p-1.5 rounded-full mr-3 mt-0.5 group-hover:shadow-lg group-hover:shadow-primary-500/20">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Secure key management with no seed phrases to remember</p>
          </li>
          <li className="flex items-start transform transition-all duration-300 hover:translate-x-2 group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-400 p-1.5 rounded-full mr-3 mt-0.5 group-hover:shadow-lg group-hover:shadow-primary-500/20">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Multi-factor authentication for transaction approval</p>
          </li>
          <li className="flex items-start transform transition-all duration-300 hover:translate-x-2 group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-400 p-1.5 rounded-full mr-3 mt-0.5 group-hover:shadow-lg group-hover:shadow-primary-500/20">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Social recovery options for account access</p>
          </li>
        </ul>
        
        {/* Transaction history preview */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h4 className="text-white font-medium mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Recent Activity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark-input rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
              <div className="flex items-center">
                <div className="bg-green-500/20 p-1.5 rounded-lg mr-3">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white">Received ETH</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-500">+0.05 ETH</p>
                <p className="text-xs text-gray-400 group-hover:text-primary-400 transition-colors">View</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-input rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
              <div className="flex items-center">
                <div className="bg-red-500/20 p-1.5 rounded-lg mr-3">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white">Sent ETH</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-500">-0.1 ETH</p>
                <p className="text-xs text-gray-400 group-hover:text-primary-400 transition-colors">View</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
