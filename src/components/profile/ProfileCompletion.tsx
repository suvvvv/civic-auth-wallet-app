import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';

const ProfileCompletion: React.FC = () => {
  const { user } = useAuth();
  const { profileCompletion, updateProfileCompletion, hasBadge } = usePoints();
  
  // Form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [isGeoDetecting, setIsGeoDetecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Load existing profile data if available
  useEffect(() => {
    if (user) {
      const savedName = localStorage.getItem(`civic_profile_name_${user.id}`);
      const savedBio = localStorage.getItem(`civic_profile_bio_${user.id}`);
      const savedCountry = localStorage.getItem(`civic_profile_country_${user.id}`);
      
      if (savedName) {
        setName(savedName);
        updateProfileCompletion('name', true);
      }
      
      if (savedBio) {
        setBio(savedBio);
        updateProfileCompletion('bio', true);
      }
      
      if (savedCountry) {
        setCountry(savedCountry);
        updateProfileCompletion('country', true);
      }
    }
  }, [user, updateProfileCompletion]);
  
  // Save profile data and update completion status
  const handleSave = () => {
    if (user) {
      // Save name if provided
      if (name.trim()) {
        localStorage.setItem(`civic_profile_name_${user.id}`, name);
        updateProfileCompletion('name', true);
      }
      
      // Save bio if provided
      if (bio.trim()) {
        localStorage.setItem(`civic_profile_bio_${user.id}`, bio);
        updateProfileCompletion('bio', true);
      }
      
      // Save country if provided
      if (country.trim()) {
        localStorage.setItem(`civic_profile_country_${user.id}`, country);
        updateProfileCompletion('country', true);
      }
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  
  // Detect user's country using geolocation
  const detectCountry = async () => {
    setIsGeoDetecting(true);
    
    try {
      // In a real app, this would use a geolocation API
      // For demo purposes, we'll simulate a delay and set a random country
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const countries = [
        'United States', 'Canada', 'United Kingdom', 'Australia', 
        'Germany', 'France', 'Japan', 'Brazil', 'India', 'South Africa'
      ];
      
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      setCountry(randomCountry);
      
      if (user) {
        localStorage.setItem(`civic_profile_country_${user.id}`, randomCountry);
        updateProfileCompletion('country', true);
      }
    } catch (error) {
      console.error('Failed to detect country:', error);
    } finally {
      setIsGeoDetecting(false);
    }
  };
  
  // Calculate completion percentage
  const completionPercentage = 
    (Number(profileCompletion.name) + Number(profileCompletion.bio) + Number(profileCompletion.country)) * 100 / 3;

  return (
    <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="text-2xl mr-2">👤</span>
          Your Profile
        </h2>
        
        {/* Completion indicator */}
        <div className="flex items-center">
          <div className="w-24 h-2 bg-dark-input rounded-full overflow-hidden mr-2">
            <div 
              className="h-full bg-gradient-to-r from-neon-purple to-primary-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-400">{Math.round(completionPercentage)}%</span>
        </div>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="mb-6 bg-green-900/30 border border-green-500/50 text-green-200 p-3 rounded-lg animate-fade-in">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Profile updated successfully!
          </p>
        </div>
      )}
      
      {/* Badges section */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg border transition-all duration-300 ${
          hasBadge('IdentityVerified') 
            ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
            : 'bg-dark-input/50 border-dark-border opacity-70'
        }`}>
          <div className="flex items-center mb-2">
            <div className={`text-2xl mr-2 ${hasBadge('IdentityVerified') ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
              ✅
            </div>
            <h4 className={`font-bold ${hasBadge('IdentityVerified') ? 'text-white' : 'text-gray-400'}`}>
              Identity Verified
            </h4>
          </div>
          <p className="text-gray-400 text-xs">Complete your name and bio</p>
        </div>
        
        <div className={`p-4 rounded-lg border transition-all duration-300 ${
          hasBadge('GlobalCitizen') 
            ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
            : 'bg-dark-input/50 border-dark-border opacity-70'
        }`}>
          <div className="flex items-center mb-2">
            <div className={`text-2xl mr-2 ${hasBadge('GlobalCitizen') ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
              🌎
            </div>
            <h4 className={`font-bold ${hasBadge('GlobalCitizen') ? 'text-white' : 'text-gray-400'}`}>
              Global Citizen
            </h4>
          </div>
          <p className="text-gray-400 text-xs">Add your country to your profile</p>
        </div>
      </div>
      
      {/* Profile form */}
      <div className="space-y-6">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-dark-input text-white border border-dark-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50"
          />
        </div>
        
        {/* Bio input */}
        <div>
          <label htmlFor="bio" className="block text-gray-300 mb-2 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={3}
            className="w-full bg-dark-input text-white border border-dark-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50"
          />
        </div>
        
        {/* Country input */}
        <div>
          <label htmlFor="country" className="block text-gray-300 mb-2 font-medium flex items-center justify-between">
            <span>Country</span>
            <button
              type="button"
              onClick={detectCountry}
              disabled={isGeoDetecting}
              className="text-xs text-neon-purple hover:text-white transition-colors flex items-center"
            >
              {isGeoDetecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-neon-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Detecting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Auto-detect
                </>
              )}
            </button>
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Your country"
            className="w-full bg-dark-input text-white border border-dark-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50"
          />
        </div>
        
        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium relative group overflow-hidden"
        >
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          <span className="relative z-10 flex items-center justify-center">
            Save Profile
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletion;
