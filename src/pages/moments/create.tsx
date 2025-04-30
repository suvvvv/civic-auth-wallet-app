import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';
import { v4 as uuidv4 } from 'uuid';
import { uploadNFT, dataURLToFile } from '../../services/nftStorage';

const MomentsCreatePage: React.FC = () => {
  const { user, walletAddress } = useAuth();
  const { addPoints, awardBadge, hasBadge } = usePoints();
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      setImage(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Clear any previous errors
      setError(null);
    }
  };
  
  // Trigger file input click
  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    if (!image || !imagePreview) {
      setError('Image is required');
      return;
    }
    
    // Start minting process
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate a unique ID for the moment
      const momentId = uuidv4();
      
      // Prepare the image file for NFT.Storage
      const imageFile = dataURLToFile(imagePreview, `civic-moment-${momentId}.jpg`);
      
      // Upload to IPFS via NFT.Storage
      const ipfsUrl = await uploadNFT(
        imageFile,
        title,
        description,
        walletAddress || user?.id || 'unknown'
      );
      
      // Create the moment object with IPFS URL
      const newMoment = {
        id: momentId,
        title,
        description,
        imageUrl: imagePreview, // Keep the data URL for local preview
        ipfsUrl, // Store the IPFS URL for the NFT
        createdAt: new Date(),
        createdBy: walletAddress || user?.id || 'unknown'
      };
      
      // Save to local storage for app persistence
      const userId = user?.id;
      if (userId) {
        const savedMoments = localStorage.getItem(`civic_moments_${userId}`);
        const moments = savedMoments ? JSON.parse(savedMoments) : [];
        moments.push(newMoment);
        localStorage.setItem(`civic_moments_${userId}`, JSON.stringify(moments));
      }
      
      // Award Creator badge if this is their first moment
      if (!hasBadge('Creator')) {
        awardBadge('Creator');
      } else {
        // If they already have the badge, just award some points
        addPoints(5, 'Minted a new moment');
      }
      
      // Show success state
      setIsMinted(true);
      
      // Reset form after 3 seconds and redirect to moments gallery
      setTimeout(() => {
        navigate('/moments');
      }, 3000);
      
    } catch (err) {
      setError('Failed to mint your moment. Please try again.');
      setIsLoading(false);
    }
  };
  
  // If user is not authenticated, redirect to home
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="py-8 animate-fade-in">
      {/* Header section */}
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
          Create a Civic Moment
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Mint a soulbound NFT to commemorate your Web3 journey
          </p>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form section */}
        <div className="bg-dark-card p-6 rounded-xl shadow-xl border border-dark-border animate-grid-reveal">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title input */}
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-2 font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My First Web3 Transaction"
                className="w-full bg-dark-input text-white border border-dark-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50"
                disabled={isLoading || isMinted}
              />
            </div>
            
            {/* Description input */}
            <div>
              <label htmlFor="description" className="block text-gray-300 mb-2 font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this moment in your Web3 journey..."
                rows={4}
                className="w-full bg-dark-input text-white border border-dark-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50"
                disabled={isLoading || isMinted}
              />
            </div>
            
            {/* Image upload */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Image
              </label>
              <div 
                onClick={handleSelectImage}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  imagePreview ? 'border-neon-purple/50' : 'border-gray-700 hover:border-gray-500'
                } ${isLoading || isMinted ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ minHeight: '200px' }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isLoading || isMinted}
                />
                
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-dark-card p-1 rounded-full text-white hover:text-red-500 transition-colors"
                      disabled={isLoading || isMinted}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-gray-400">Click to upload an image</p>
                    <p className="text-gray-500 text-sm mt-2">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-3 rounded-lg animate-fade-in">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </p>
              </div>
            )}
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || isMinted}
              className={`w-full py-4 px-6 rounded-xl font-medium text-white relative overflow-hidden group ${
                isLoading || isMinted
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-neon-purple to-primary-500 hover:shadow-lg hover:shadow-neon-purple/30 transform hover:scale-[1.02] transition-all duration-300 animate-pulse-slow'
              }`}
            >
              {!isLoading && !isMinted && (
                <>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Mint Moment
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </span>
                </>
              )}
              
              {isLoading && !isMinted && (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Minting...
                </span>
              )}
              
              {isMinted && (
                <span className="flex items-center justify-center text-neon-purple">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Minted Successfully!
                </span>
              )}
            </button>
          </form>
        </div>
        
        {/* Preview card section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 text-white">NFT Preview</h3>
          
          <div className="flex-1 bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border animate-scanline relative">
            {/* NFT Preview */}
            <div className="aspect-square bg-gradient-to-br from-dark-background to-dark-card flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <svg className="w-24 h-24 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-gray-500">Image preview will appear here</p>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 text-white">
                {title || 'Moment Title'}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {description || 'Your moment description will appear here...'}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Just now</span>
                </div>
                <div className="text-xs font-mono text-neon-purple opacity-70">
                  #{uuidv4().substring(0, 6)}
                </div>
              </div>
            </div>
            
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent animate-scanline"></div>
            </div>
            
            {/* Holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
          
          {/* Wallet info */}
          <div className="mt-6 bg-dark-card p-4 rounded-lg border border-dark-border">
            <div className="flex items-center">
              <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Soulbound NFT</p>
                <p className="text-gray-400 text-xs">Non-transferable token tied to your identity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success celebration modal */}
      {isMinted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative bg-dark-card rounded-xl p-8 max-w-md w-full shadow-2xl border border-neon-purple animate-neon-glow">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-neon-purple blur-xl rounded-full opacity-70 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-r from-neon-purple to-primary-500 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl animate-bounce-subtle">
                  🎉
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent">
                Moment Minted Successfully!
              </h3>
              <p className="text-gray-300 mb-6">
                Your Civic Moment has been minted as a soulbound NFT and added to your collection.
              </p>
              
              {!hasBadge('Creator') && (
                <div className="bg-neon-purple/20 p-4 rounded-lg mb-6 animate-pulse-slow">
                  <p className="text-white font-medium">🎨 Creator Badge Earned!</p>
                  <p className="text-gray-400 text-sm">+15 Civic Points</p>
                </div>
              )}
              
              <p className="text-gray-400 text-sm">
                Redirecting to your moments gallery...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentsCreatePage;
