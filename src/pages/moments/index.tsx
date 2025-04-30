import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';
import MomentCard from '../../components/moments/MomentCard';

// Define the Moment type
interface Moment {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ipfsUrl?: string; // IPFS URL for the NFT
  createdAt: Date;
  createdBy: string;
}

const MomentsPage: React.FC = () => {
  const { user, walletAddress } = useAuth();
  const { hasBadge } = usePoints();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch moments from local storage
  useEffect(() => {
    if (user) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const savedMoments = localStorage.getItem(`civic_moments_${user.id}`);
        if (savedMoments) {
          // Parse the saved moments and convert string dates back to Date objects
          const parsedMoments = JSON.parse(savedMoments, (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
          });
          setMoments(parsedMoments);
        }
        setLoading(false);
      }, 800);
    }
  }, [user]);

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
          <p className="text-gray-400 mb-6">Please sign in to view your Civic Moments collection.</p>
          <Link to="/" className="inline-block py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 animate-fade-in">
      {/* Header section */}
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
          Your Civic Moments
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Collect and showcase your Web3 journey with soulbound NFTs
          </p>
        </div>
      </div>
      
      {/* Create new moment button */}
      <div className="flex justify-center mb-12">
        <Link 
          to="/moments/create" 
          className="py-4 px-8 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium relative group overflow-hidden animate-neon-glow"
        >
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          <span className="relative z-10 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create New Moment
          </span>
        </Link>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/30 to-primary-500/30 rounded-full filter blur-xl opacity-70 animate-pulse-slow"></div>
            <div className="relative">
              <svg className="animate-spin h-16 w-16 text-neon-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <p className="mt-4 text-gray-400">Loading your moments...</p>
        </div>
      )}
      
      {/* Empty state */}
      {!loading && moments.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] max-w-2xl mx-auto text-center bg-dark-card p-10 rounded-xl border border-dark-border animate-grid-reveal">
          <div className="mb-6 text-neon-purple">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">No Moments Yet</h2>
          <p className="text-gray-400 mb-8">Create your first Civic Moment to start your collection. Mint a soulbound NFT to commemorate your Web3 journey.</p>
          <Link 
            to="/moments/create" 
            className="py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium relative group overflow-hidden animate-pulse-slow"
          >
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Mint Your First Moment
            </span>
          </Link>
        </div>
      )}
      
      {/* Moments grid */}
      {!loading && moments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {moments.map((moment, index) => (
            <MomentCard
              key={moment.id}
              id={moment.id}
              title={moment.title}
              description={moment.description}
              imageUrl={moment.imageUrl}
              ipfsUrl={moment.ipfsUrl}
              createdAt={moment.createdAt}
              isNew={new Date().getTime() - moment.createdAt.getTime() < 86400000} // 24 hours
            />
          ))}
        </div>
      )}
      
      {/* Creator badge notification */}
      {!loading && moments.length > 0 && hasBadge('Creator') && (
        <div className="mt-12 max-w-md mx-auto bg-dark-card p-4 rounded-lg border border-neon-purple/30 flex items-center animate-neon-glow">
          <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <p className="text-white font-medium">Creator Badge Earned!</p>
            <p className="text-gray-400 text-sm">You've successfully minted your first Civic Moment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentsPage;
