import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints, Achievement, FeatureGate } from '../../context/PointsContext';

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const { points, achievements, featureGates } = usePoints();
  const [showMomentumMasterModal, setShowMomentumMasterModal] = useState(false);
  
  // Check if Momentum Master badge was just earned
  useEffect(() => {
    const momentumMaster = achievements.find(a => a.id === 'MomentumMaster');
    if (momentumMaster?.earned) {
      // Check if it was earned in the last minute (just now)
      const earnedRecently = momentumMaster.earnedAt && 
        (new Date().getTime() - new Date(momentumMaster.earnedAt).getTime() < 60000);
      
      if (earnedRecently) {
        setShowMomentumMasterModal(true);
      }
    }
  }, [achievements]);

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
          <p className="text-gray-400 mb-6">Please sign in to view your progress and achievements.</p>
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
          Your Civic Progress
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Track your points, achievements, and unlock exclusive features
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Points Dashboard */}
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal mb-8">
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full blur opacity-70 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-r from-neon-purple to-primary-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold animate-neon-glow">
                  {points}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Civic Points</h2>
                <p className="text-gray-400">Earn more points to unlock features</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-neon-purple font-medium">{points}/150 Points</span>
              </div>
              <div className="h-4 bg-dark-input rounded-full overflow-hidden relative">
                {/* Background grid effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-input to-dark-input bg-[length:10px_10px] bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(157,78,221,0.1)_1px,transparent_5px)] bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(157,78,221,0.1)_1px,transparent_5px)]"></div>
                
                {/* Progress fill */}
                <div 
                  className="h-full bg-gradient-to-r from-neon-purple to-primary-500 rounded-full relative z-10 transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, (points / 150) * 100)}%` }}
                ></div>
                
                {/* Milestone markers */}
                <div className="absolute inset-0 flex items-center">
                  {/* 0 Points */}
                  <div className="absolute left-0 w-4 h-4 bg-dark-card border-2 border-gray-600 rounded-full transform -translate-x-1/2 z-20"></div>
                  
                  {/* 50 Points */}
                  <div className={`absolute left-1/3 w-4 h-4 rounded-full transform -translate-x-1/2 z-20 ${
                    points >= 50 
                      ? 'bg-neon-purple border-2 border-white animate-pulse-slow' 
                      : 'bg-dark-card border-2 border-gray-600'
                  }`}></div>
                  
                  {/* 100 Points */}
                  <div className={`absolute left-2/3 w-4 h-4 rounded-full transform -translate-x-1/2 z-20 ${
                    points >= 100 
                      ? 'bg-neon-purple border-2 border-white animate-pulse-slow' 
                      : 'bg-dark-card border-2 border-gray-600'
                  }`}></div>
                  
                  {/* 150 Points */}
                  <div className={`absolute right-0 w-4 h-4 rounded-full transform -translate-x-1/2 z-20 ${
                    points >= 150 
                      ? 'bg-neon-purple border-2 border-white animate-pulse-slow' 
                      : 'bg-dark-card border-2 border-gray-600'
                  }`}></div>
                </div>
              </div>
              
              {/* Milestone labels */}
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500">0</span>
                <span className={points >= 50 ? 'text-neon-purple' : 'text-gray-500'}>50</span>
                <span className={points >= 100 ? 'text-neon-purple' : 'text-gray-500'}>100</span>
                <span className={points >= 150 ? 'text-neon-purple' : 'text-gray-500'}>150</span>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                to="/moments/create" 
                className="bg-dark-input hover:bg-gray-800 p-4 rounded-lg border border-dark-border transition-all duration-300 transform hover:scale-[1.02] hover:border-neon-purple/30 group"
              >
                <div className="flex items-center">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3 group-hover:bg-neon-purple/30 transition-colors">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Create a Moment</h3>
                    <p className="text-gray-400 text-xs">+5 points per moment</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/referral" 
                className="bg-dark-input hover:bg-gray-800 p-4 rounded-lg border border-dark-border transition-all duration-300 transform hover:scale-[1.02] hover:border-neon-purple/30 group"
              >
                <div className="flex items-center">
                  <div className="bg-neon-purple/20 p-2 rounded-full mr-3 group-hover:bg-neon-purple/30 transition-colors">
                    <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Invite Friends</h3>
                    <p className="text-gray-400 text-xs">+10 points per referral</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Achievement Tracker */}
          <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Achievements
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Unlockable Perks Panel */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border animate-grid-reveal sticky top-4">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">🔓</span>
              Unlockable Features
            </h2>
            
            <div className="space-y-4">
              {featureGates.map((feature) => (
                <FeatureCard 
                  key={feature.id}
                  feature={feature}
                  points={points}
                  achievements={achievements}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Momentum Master Modal */}
      {showMomentumMasterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowMomentumMasterModal(false)}></div>
          <div className="relative bg-dark-card rounded-xl p-8 max-w-md w-full shadow-2xl border border-neon-purple animate-neon-glow">
            <button 
              onClick={() => setShowMomentumMasterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-r from-neon-purple to-primary-500 w-full h-full rounded-full flex items-center justify-center text-white text-6xl animate-bounce-subtle">
                  🏆
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent">
                Momentum Master Achieved!
              </h3>
              <p className="text-gray-300 mb-6">
                Congratulations! You've earned the highest achievement by collecting 100+ points and 5+ badges.
              </p>
              
              <div className="bg-neon-purple/20 p-4 rounded-lg mb-6 animate-pulse-slow">
                <p className="text-white font-medium">+50 Civic Points Awarded</p>
                <p className="text-gray-400 text-sm">All Pro Features Unlocked</p>
              </div>
              
              <button
                onClick={() => setShowMomentumMasterModal(false)}
                className="py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium"
              >
                Continue My Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Achievement Card Component
const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <div className={`p-4 rounded-lg border transition-all duration-300 ${
      achievement.earned 
        ? 'bg-dark-input border-neon-purple/30 animate-neon-glow' 
        : 'bg-dark-input/50 border-dark-border opacity-70'
    }`}>
      <div className="flex items-center mb-3">
        <div className={`text-2xl mr-2 ${achievement.earned ? 'animate-bounce-subtle' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
        <div>
          <h3 className={`font-bold ${
            achievement.earned 
              ? 'text-white' 
              : 'text-gray-400'
          }`}>
            {achievement.name}
          </h3>
          <p className="text-gray-500 text-xs">+{achievement.pointsAwarded} points</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm">{achievement.description}</p>
      
      {achievement.earned && achievement.earnedAt && (
        <div className="mt-2 text-xs text-neon-purple flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Earned on {new Date(achievement.earnedAt).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{ 
  feature: FeatureGate; 
  points: number;
  achievements: Achievement[];
}> = ({ feature, points, achievements }) => {
  // Check if the required badge is earned
  const hasBadge = feature.requiresBadge 
    ? achievements.some(a => a.id === feature.requiresBadge && a.earned)
    : true;
  
  // Check if enough points
  const hasEnoughPoints = feature.requiresPoints 
    ? points >= feature.requiresPoints
    : true;
  
  // Determine if unlocked
  const isUnlocked = feature.unlocked || (hasEnoughPoints && hasBadge);
  
  return (
    <div className={`rounded-xl overflow-hidden border transition-all duration-300 transform ${
      isUnlocked 
        ? 'bg-dark-input border-neon-purple/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-purple/20' 
        : 'bg-dark-input/50 border-dark-border opacity-70'
    }`}>
      <div className="p-5">
        <div className="flex items-center mb-3">
          {isUnlocked ? (
            <div className="bg-neon-purple/20 p-2 rounded-full mr-3 animate-neon-glow">
              <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
            </div>
          ) : (
            <div className="bg-gray-800 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          )}
          <div>
            <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
              {feature.name}
            </h3>
            <p className="text-gray-500 text-xs">{feature.description}</p>
          </div>
        </div>
        
        {!isUnlocked && (
          <div className="mt-2 space-y-2">
            {feature.requiresPoints && (
              <div className={`flex items-center text-xs ${points >= feature.requiresPoints ? 'text-green-400' : 'text-gray-400'}`}>
                <svg className={`w-4 h-4 mr-1 ${points >= feature.requiresPoints ? 'text-green-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {points >= feature.requiresPoints ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  )}
                </svg>
                <span>Requires {feature.requiresPoints} Points</span>
              </div>
            )}
            
            {feature.requiresBadge && (
              <div className={`flex items-center text-xs ${hasBadge ? 'text-green-400' : 'text-gray-400'}`}>
                <svg className={`w-4 h-4 mr-1 ${hasBadge ? 'text-green-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {hasBadge ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  )}
                </svg>
                <span>Requires '{feature.requiresBadge}' Badge</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {isUnlocked && (
        <div className="bg-dark-card p-3 border-t border-neon-purple/20">
          <Link 
            to={`/${feature.id}`}
            className="flex items-center justify-center text-neon-purple hover:text-white transition-colors text-sm font-medium"
          >
            <span>Access Now</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
