import React from 'react';
import { format } from 'date-fns';

interface MomentCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ipfsUrl?: string; // IPFS URL for the NFT
  createdAt: Date;
  isNew?: boolean;
}

const MomentCard: React.FC<MomentCardProps> = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  ipfsUrl,
  createdAt, 
  isNew = false 
}) => {
  return (
    <div className="relative group transform transition-all duration-300 hover:scale-[1.02]">
      {/* New badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-purple blur-md rounded-full opacity-70 animate-pulse-slow"></div>
            <span className="relative bg-gradient-to-r from-neon-purple to-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-neon-glow">
              NEW
            </span>
          </div>
        </div>
      )}
      
      {/* Card container */}
      <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl border border-dark-border group-hover:border-neon-purple/30 group-hover:shadow-neon-purple/20 animate-fade-in">
        {/* Image container with glow effect */}
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-primary-500/10 group-hover:opacity-70 opacity-30 transition-opacity duration-300"></div>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 animate-scanline transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* IPFS Badge - only show if ipfsUrl exists */}
          {ipfsUrl && (
            <div className="mb-2">
              <a 
                href={ipfsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs bg-dark-background text-neon-purple px-2 py-1 rounded-md hover:bg-neon-purple/10 transition-colors"
              >
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.42-7 9.88-3.87-1.45-7-5.2-7-9.88V6.3l7-3.12z"/>
                </svg>
                IPFS
              </a>
            </div>
          )}
          <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-primary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{format(createdAt, 'MMM d, yyyy')}</span>
            </div>
            <div className="text-xs font-mono text-neon-purple opacity-70">
              #{id.substring(0, 6)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentCard;
