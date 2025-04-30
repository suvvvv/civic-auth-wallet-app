import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';

const BetaZonePage: React.FC = () => {
  const { user } = useAuth();
  const { hasBadge, canAccessFeature } = usePoints();
  
  // Check if user can access this feature
  const hasAccess = canAccessFeature('beta-zone');
  const hasReferrerBadge = hasBadge('Referrer');

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
          <p className="text-gray-400 mb-6">Please sign in to access the Beta Zone.</p>
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
            Beta Zone
          </h1>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
              Experimental features and early access
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
            You need the 'Referrer' badge to unlock Beta Zone access.
          </p>
          
          <div className="mb-8 flex justify-center">
            <div className={`p-4 rounded-lg border transition-all duration-300 ${
              hasReferrerBadge 
                ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
                : 'bg-dark-input/50 border-dark-border opacity-70'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`text-2xl mr-2 ${hasReferrerBadge ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
                  👥
                </div>
                <h4 className={`font-bold ${hasReferrerBadge ? 'text-white' : 'text-gray-400'}`}>
                  Referrer Badge
                </h4>
              </div>
              <p className="text-gray-400 text-xs">Refer a friend to join Civic Momentum</p>
            </div>
          </div>
          
          <Link 
            to="/referral" 
            className="py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            Go to Referral Page
          </Link>
        </div>
      </div>
    );
  }

  // User has access to Beta Zone
  return (
    <div className="py-8 animate-fade-in">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
          Beta Zone
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Experimental features and early access
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Beta Access Banner */}
        <div className="bg-gradient-to-r from-neon-purple/20 to-primary-500/20 p-6 rounded-xl mb-12 border border-neon-purple/30 animate-neon-glow">
          <div className="flex items-center">
            <div className="bg-neon-purple/20 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Beta Access Granted</h2>
              <p className="text-gray-300">
                Welcome to the Beta Zone! You now have access to experimental features before they're released to everyone.
              </p>
            </div>
          </div>
        </div>
        
        {/* Beta Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in">
            <div className="relative">
              <div className="absolute top-4 right-4 bg-neon-purple/80 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-slow">
                BETA
              </div>
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" 
                alt="AI NFT Generator" 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                AI NFT Generator
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Create unique NFT artwork using our experimental AI generation tools. Input text prompts or reference images to generate custom designs.
              </p>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-purple/30 font-medium">
                Try Now
              </button>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group hover:border-neon-purple/30 hover:shadow-neon-purple/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="relative">
              <div className="absolute top-4 right-4 bg-neon-purple/80 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-slow">
                BETA
              </div>
              <img 
                src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" 
                alt="Social Token Creator" 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Social Token Creator
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Launch your own social token with customizable tokenomics. Create a token for your community, brand, or personal brand.
              </p>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-purple/30 font-medium">
                Try Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Coming Soon Section */}
        <div className="bg-dark-card rounded-xl p-8 shadow-xl border border-dark-border animate-grid-reveal mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-2">🔮</span>
            Coming Soon
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-dark-input p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-white">DAO Governance Tools</h3>
                <p className="text-gray-400">
                  Create and manage decentralized autonomous organizations with customizable voting mechanisms and treasury management.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-dark-input p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-white">Cross-Chain Bridge</h3>
                <p className="text-gray-400">
                  Seamlessly move your assets between different blockchains with our upcoming cross-chain bridge technology.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-dark-input p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-white">Decentralized Identity Verification</h3>
                <p className="text-gray-400">
                  Advanced identity verification tools that maintain privacy while providing verifiable credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feedback Section */}
        <div className="bg-dark-card rounded-xl p-8 shadow-xl border border-dark-border animate-grid-reveal">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-2">💬</span>
            Provide Feedback
          </h2>
          
          <p className="text-gray-300 mb-6">
            Your feedback helps us improve our beta features. Let us know what you think about the experimental tools you've tried.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="feedback" className="block text-gray-300 mb-2 font-medium">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                placeholder="Share your thoughts, suggestions, or report any bugs..."
                rows={4}
                className="w-full bg-dark-input text-white border border-dark-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50"
              />
            </div>
            
            <button className="py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium">
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaZonePage;
