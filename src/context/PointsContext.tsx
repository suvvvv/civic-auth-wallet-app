import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define types for badges
export type BadgeType = 
  | 'Referrer' 
  | 'Creator' 
  | 'Explorer' 
  | 'Web3Curious' 
  | 'IdentityVerified' 
  | 'GlobalCitizen' 
  | 'MomentumMaster';

// Define types for achievements
export interface Achievement {
  id: BadgeType;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
  pointsAwarded: number;
}

// Define types for feature gates
export interface FeatureGate {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  requiresPoints?: number;
  requiresBadge?: BadgeType;
}

// Define the context type
interface PointsContextType {
  points: number;
  achievements: Achievement[];
  featureGates: FeatureGate[];
  referralCount: number;
  referredUsers: string[];
  addPoints: (amount: number, reason?: string) => void;
  awardBadge: (badgeId: BadgeType) => void;
  hasBadge: (badgeId: BadgeType) => boolean;
  canAccessFeature: (featureId: string) => boolean;
  unlockFeature: (featureId: string) => void;
  addReferral: (userAddress: string) => void;
  profileCompletion: {
    name: boolean;
    bio: boolean;
    country: boolean;
  };
  updateProfileCompletion: (field: 'name' | 'bio' | 'country', value: boolean) => void;
}

// Create the context
const PointsContext = createContext<PointsContextType | undefined>(undefined);

// Provider component
export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState<number>(0);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [referredUsers, setReferredUsers] = useState<string[]>([]);
  const [profileCompletion, setProfileCompletion] = useState({
    name: false,
    bio: false,
    country: false
  });

  // Initialize achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'Referrer',
      name: 'Referrer',
      description: 'Refer a friend to join Civic Momentum',
      icon: '👥',
      earned: false,
      pointsAwarded: 10
    },
    {
      id: 'Creator',
      name: 'Creator',
      description: 'Mint your first Civic Moment NFT',
      icon: '🎨',
      earned: false,
      pointsAwarded: 15
    },
    {
      id: 'Explorer',
      name: 'Explorer',
      description: 'Visit all sections of the Civic Momentum app',
      icon: '🧭',
      earned: false,
      pointsAwarded: 20
    },
    {
      id: 'Web3Curious',
      name: 'Web3 Curious',
      description: 'Complete the Web3 onboarding article',
      icon: '🧠',
      earned: false,
      pointsAwarded: 5
    },
    {
      id: 'IdentityVerified',
      name: 'Identity Verified',
      description: 'Complete your profile with name and bio',
      icon: '✅',
      earned: false,
      pointsAwarded: 10
    },
    {
      id: 'GlobalCitizen',
      name: 'Global Citizen',
      description: 'Add your country to your profile',
      icon: '🌎',
      earned: false,
      pointsAwarded: 5
    },
    {
      id: 'MomentumMaster',
      name: 'Momentum Master',
      description: 'Earn 100+ points and collect 5+ badges',
      icon: '🏆',
      earned: false,
      pointsAwarded: 50
    }
  ]);

  // Initialize feature gates
  const [featureGates, setFeatureGates] = useState<FeatureGate[]>([
    {
      id: 'pro-tools',
      name: 'Pro Tools',
      description: 'Access advanced Web3 tools and features',
      unlocked: false,
      requiresPoints: 50
    },
    {
      id: 'beta-zone',
      name: 'Beta Zone',
      description: 'Try experimental features before they go live',
      unlocked: false,
      requiresBadge: 'Referrer'
    },
    {
      id: 'custom-moments',
      name: 'Custom Moments',
      description: 'Create custom NFT moments with special attributes',
      unlocked: false,
      requiresPoints: 100
    },
    {
      id: 'exclusive-content',
      name: 'Exclusive Content',
      description: 'Access exclusive Web3 educational content',
      unlocked: false,
      requiresPoints: 30
    }
  ]);

  // Load data from localStorage when user changes
  useEffect(() => {
    if (user) {
      const userId = user.id;
      
      // Load points
      const savedPoints = localStorage.getItem(`civic_points_${userId}`);
      if (savedPoints) {
        setPoints(parseInt(savedPoints, 10));
      }
      
      // Load achievements
      const savedAchievements = localStorage.getItem(`civic_achievements_${userId}`);
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
      
      // Load feature gates
      const savedFeatureGates = localStorage.getItem(`civic_features_${userId}`);
      if (savedFeatureGates) {
        setFeatureGates(JSON.parse(savedFeatureGates));
      }
      
      // Load referrals
      const savedReferralCount = localStorage.getItem(`civic_referral_count_${userId}`);
      if (savedReferralCount) {
        setReferralCount(parseInt(savedReferralCount, 10));
      }
      
      const savedReferredUsers = localStorage.getItem(`civic_referred_users_${userId}`);
      if (savedReferredUsers) {
        setReferredUsers(JSON.parse(savedReferredUsers));
      }
      
      // Load profile completion
      const savedProfileCompletion = localStorage.getItem(`civic_profile_completion_${userId}`);
      if (savedProfileCompletion) {
        setProfileCompletion(JSON.parse(savedProfileCompletion));
      }
    }
  }, [user]);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (user) {
      const userId = user.id;
      localStorage.setItem(`civic_points_${userId}`, points.toString());
      localStorage.setItem(`civic_achievements_${userId}`, JSON.stringify(achievements));
      localStorage.setItem(`civic_features_${userId}`, JSON.stringify(featureGates));
      localStorage.setItem(`civic_referral_count_${userId}`, referralCount.toString());
      localStorage.setItem(`civic_referred_users_${userId}`, JSON.stringify(referredUsers));
      localStorage.setItem(`civic_profile_completion_${userId}`, JSON.stringify(profileCompletion));
    }
  }, [user, points, achievements, featureGates, referralCount, referredUsers, profileCompletion]);

  // Check for Momentum Master achievement
  useEffect(() => {
    if (points >= 100 && achievements.filter(a => a.earned).length >= 5) {
      const momentumMasterIndex = achievements.findIndex(a => a.id === 'MomentumMaster');
      if (momentumMasterIndex !== -1 && !achievements[momentumMasterIndex].earned) {
        const newAchievements = [...achievements];
        newAchievements[momentumMasterIndex].earned = true;
        newAchievements[momentumMasterIndex].earnedAt = new Date();
        setAchievements(newAchievements);
        
        // Don't add points for this one to avoid infinite loop
        // But we could trigger a celebration modal here
      }
    }
  }, [points, achievements]);

  // Add points function
  const addPoints = (amount: number, reason?: string) => {
    setPoints(prevPoints => prevPoints + amount);
    
    // Check if any features should be unlocked based on new point total
    const newPoints = points + amount;
    const newFeatureGates = [...featureGates];
    let featuresChanged = false;
    
    newFeatureGates.forEach((feature, index) => {
      if (!feature.unlocked && feature.requiresPoints && newPoints >= feature.requiresPoints) {
        newFeatureGates[index].unlocked = true;
        featuresChanged = true;
      }
    });
    
    if (featuresChanged) {
      setFeatureGates(newFeatureGates);
    }
  };

  // Award badge function
  const awardBadge = (badgeId: BadgeType) => {
    const badgeIndex = achievements.findIndex(a => a.id === badgeId);
    
    if (badgeIndex !== -1 && !achievements[badgeIndex].earned) {
      const newAchievements = [...achievements];
      newAchievements[badgeIndex].earned = true;
      newAchievements[badgeIndex].earnedAt = new Date();
      setAchievements(newAchievements);
      
      // Award points for earning the badge
      addPoints(newAchievements[badgeIndex].pointsAwarded);
      
      // Check if any features should be unlocked based on this badge
      const newFeatureGates = [...featureGates];
      let featuresChanged = false;
      
      newFeatureGates.forEach((feature, index) => {
        if (!feature.unlocked && feature.requiresBadge === badgeId) {
          newFeatureGates[index].unlocked = true;
          featuresChanged = true;
        }
      });
      
      if (featuresChanged) {
        setFeatureGates(newFeatureGates);
      }
    }
  };

  // Check if user has a specific badge
  const hasBadge = (badgeId: BadgeType): boolean => {
    return achievements.some(a => a.id === badgeId && a.earned);
  };

  // Check if user can access a feature
  const canAccessFeature = (featureId: string): boolean => {
    const feature = featureGates.find(f => f.id === featureId);
    return feature ? feature.unlocked : false;
  };

  // Unlock a feature
  const unlockFeature = (featureId: string) => {
    const featureIndex = featureGates.findIndex(f => f.id === featureId);
    
    if (featureIndex !== -1 && !featureGates[featureIndex].unlocked) {
      const newFeatureGates = [...featureGates];
      newFeatureGates[featureIndex].unlocked = true;
      setFeatureGates(newFeatureGates);
    }
  };

  // Add a referral
  const addReferral = (userAddress: string) => {
    // Check if this user has already been referred
    if (!referredUsers.includes(userAddress)) {
      // Add to referred users list
      setReferredUsers(prev => [...prev, userAddress]);
      
      // Increment referral count
      const newReferralCount = referralCount + 1;
      setReferralCount(newReferralCount);
      
      // Award Referrer badge if this is the first referral
      if (newReferralCount === 1) {
        awardBadge('Referrer');
      }
      
      // Add points for the referral
      addPoints(10, 'Referral');
    }
  };

  // Update profile completion
  const updateProfileCompletion = (field: 'name' | 'bio' | 'country', value: boolean) => {
    setProfileCompletion(prev => {
      const newCompletion = { ...prev, [field]: value };
      
      // Check if name and bio are completed for Identity Verified badge
      if (newCompletion.name && newCompletion.bio && (!prev.name || !prev.bio)) {
        awardBadge('IdentityVerified');
      }
      
      // Check if country is completed for Global Citizen badge
      if (newCompletion.country && !prev.country) {
        awardBadge('GlobalCitizen');
      }
      
      return newCompletion;
    });
  };

  // Context value
  const value = {
    points,
    achievements,
    featureGates,
    referralCount,
    referredUsers,
    addPoints,
    awardBadge,
    hasBadge,
    canAccessFeature,
    unlockFeature,
    addReferral,
    profileCompletion,
    updateProfileCompletion
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};

// Custom hook to use the points context
export const usePoints = (): PointsContextType => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
