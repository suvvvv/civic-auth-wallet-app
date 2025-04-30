import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';
import { QRCodeSVG } from 'qrcode.react';

const ReferralPage: React.FC = () => {
  const { user, walletAddress } = useAuth();
  const { referralCount, referredUsers, hasBadge } = usePoints();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // Generate referral link
  const baseUrl = window.location.origin;
  const referralLink = walletAddress 
    ? `${baseUrl}/?ref=${walletAddress}`
    : `${baseUrl}/?ref=${user?.id || ''}`;
  
  // Copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <p className="text-gray-400 mb-6">Please sign in to access your referral program.</p>
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
          Refer & Earn
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Invite friends to join Civic Momentum and earn rewards
          </p>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Referral Link Section */}
        <div className="md:col-span-2">
          <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">🔗</span>
              Your Referral Link
            </h2>
            
            {/* Referral link display */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-400 text-sm">Share this link with friends</label>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="text-xs text-neon-purple hover:text-white transition-colors flex items-center"
                >
                  {showQR ? 'Hide QR Code' : 'Show QR Code'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                  </svg>
                </button>
              </div>
              <div className="flex items-center">
                <div className="relative overflow-hidden rounded-lg bg-dark-input p-3 text-sm font-mono text-neon-purple flex-1 mr-2 border border-neon-purple/20 animate-scanline">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent animate-shimmer" style={{backgroundSize: '200% 100%'}}></div>
                  <div className="relative truncate">
                    {referralLink}
                  </div>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-3 bg-dark-input rounded-lg hover:bg-gray-700 transition-colors border border-neon-purple/20 animate-neon-glow"
                  title="Copy link"
                >
                  {copied ? (
                    <span className="text-neon-purple text-sm">Copied!</span>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400 hover:text-neon-purple transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              {copied && (
                <div className="flex items-center mt-2 text-xs text-primary-400 animate-fade-in">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Link copied to clipboard!</span>
                </div>
              )}
            </div>
            
            {/* QR Code */}
            {showQR && (
              <div className="mb-6 flex justify-center animate-fade-in">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeSVG 
                    value={referralLink} 
                    size={200}
                    level="H"
                    includeMargin={true}
                    // QRCodeSVG doesn't support imageSettings, so we'll need to implement that separately if needed
                  />
                </div>
              </div>
            )}
            
            {/* Share buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20Civic%20Momentum%20and%20start%20your%20Web3%20journey!&url=${encodeURIComponent(referralLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 px-4 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a94e0] transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              
              <a 
                href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20me%20on%20Civic%20Momentum%20and%20start%20your%20Web3%20journey!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 px-4 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5] transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.25l-2.173 10.26c-.168.78-.721.96-1.464.6l-4.032-2.94-1.944 1.884c-.168.168-.336.336-.684.336-.432 0-.36-.168-.504-.6l-1.14-3.732-3.33-1.044c-.72-.24-.72-.72.156-.984l12.996-4.968c.6-.24 1.116.144.912.984z"/>
                </svg>
                Telegram
              </a>
              
              <a 
                href={`mailto:?subject=Join%20Civic%20Momentum&body=Hey!%20I%20thought%20you%20might%20be%20interested%20in%20Civic%20Momentum.%20Join%20using%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`}
                className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email
              </a>
            </div>
          </div>
          
          {/* Referral Stats */}
          <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Your Referral Stats
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <p className="text-gray-400 text-sm mb-1">Total Referrals</p>
                <div className="flex items-center">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">{referralCount}</span>
                </div>
              </div>
              
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <p className="text-gray-400 text-sm mb-1">Points Earned</p>
                <div className="flex items-center">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">{referralCount * 10}</span>
                </div>
              </div>
              
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <p className="text-gray-400 text-sm mb-1">Next Milestone</p>
                <div className="flex items-center">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {referralCount < 1 ? '1' : referralCount < 3 ? '3' : referralCount < 5 ? '5' : 'Max'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Referral badges */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Referral Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  referralCount >= 1 
                    ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
                    : 'bg-dark-input/50 border-dark-border opacity-70'
                }`}>
                  <div className="flex items-center mb-2">
                    <div className={`text-2xl mr-2 ${referralCount >= 1 ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
                      👥
                    </div>
                    <h4 className={`font-bold ${referralCount >= 1 ? 'text-white' : 'text-gray-400'}`}>
                      Referrer
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs">Refer your first friend</p>
                  {referralCount >= 1 && (
                    <div className="mt-2 text-xs text-neon-purple flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Earned!</span>
                    </div>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  referralCount >= 3 
                    ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
                    : 'bg-dark-input/50 border-dark-border opacity-70'
                }`}>
                  <div className="flex items-center mb-2">
                    <div className={`text-2xl mr-2 ${referralCount >= 3 ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
                      🌟
                    </div>
                    <h4 className={`font-bold ${referralCount >= 3 ? 'text-white' : 'text-gray-400'}`}>
                      Connector
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs">Refer 3 friends</p>
                  {referralCount >= 3 && (
                    <div className="mt-2 text-xs text-neon-purple flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Earned!</span>
                    </div>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  referralCount >= 5 
                    ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
                    : 'bg-dark-input/50 border-dark-border opacity-70'
                }`}>
                  <div className="flex items-center mb-2">
                    <div className={`text-2xl mr-2 ${referralCount >= 5 ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
                      👑
                    </div>
                    <h4 className={`font-bold ${referralCount >= 5 ? 'text-white' : 'text-gray-400'}`}>
                      Community Leader
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs">Refer 5 friends</p>
                  {referralCount >= 5 && (
                    <div className="mt-2 text-xs text-neon-purple flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Earned!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Referred users list */}
            {referredUsers.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Referred Users</h3>
                <div className="bg-dark-input rounded-lg border border-dark-border overflow-hidden">
                  <ul className="divide-y divide-dark-border">
                    {referredUsers.map((user, index) => (
                      <li key={index} className="p-4 flex items-center">
                        <div className="bg-neon-purple/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-neon-purple">
                          {index + 1}
                        </div>
                        <div className="font-mono text-sm text-gray-300 truncate">
                          {user.substring(0, 8)}...{user.substring(user.length - 8)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Referral Benefits */}
        <div className="md:col-span-1">
          <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal sticky top-4">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">🎁</span>
              Referral Benefits
            </h2>
            
            <div className="space-y-6">
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <div className="flex items-center mb-3">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">10 Points</h3>
                    <p className="text-gray-400 text-xs">Per successful referral</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <div className="flex items-center mb-3">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Referrer Badge</h3>
                    <p className="text-gray-400 text-xs">After your first referral</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <div className="flex items-center mb-3">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Beta Zone Access</h3>
                    <p className="text-gray-400 text-xs">Unlocked with Referrer badge</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <div className="flex items-center mb-3">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Milestone Badges</h3>
                    <p className="text-gray-400 text-xs">At 1, 3, and 5 referrals</p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/progress"
                className="block text-center py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium mt-6"
              >
                View Your Progress
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
