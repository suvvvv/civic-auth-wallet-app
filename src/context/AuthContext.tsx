import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

// User type
export interface User {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  walletAddress: string | null;
  isLoading: boolean;
  login: (options?: { loginMethods?: string[] }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a deterministic wallet address from a string
  const generateWalletAddress = (seed: string): string => {
    // Create a simple hash from the seed string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Create a hex string with leading zeros
    const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
    
    // Format as Ethereum address with more realistic length (42 chars including 0x)
    return `0x${hexHash}71C7656EC7ab88b098defB751B7401B5f6d8976F`.substring(0, 42);
  };

  // Check for existing user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Generate or retrieve wallet address
      const storedWalletAddress = localStorage.getItem('walletAddress');
      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress);
      } else {
        const newWalletAddress = generateWalletAddress(parsedUser.id);
        setWalletAddress(newWalletAddress);
        localStorage.setItem('walletAddress', newWalletAddress);
      }
    }
  }, []);

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        // Fetch user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        
        const userInfo = await userInfoResponse.json();
        
        // Create user object
        const newUser: User = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
          provider: 'google'
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Generate wallet address
        const newWalletAddress = generateWalletAddress(newUser.id);
        setWalletAddress(newWalletAddress);
        localStorage.setItem('walletAddress', newWalletAddress);
        
        setUser(newUser);
        console.log('Logged in with Google');
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      setIsLoading(false);
    }
  });

  // Regular Civic login
  const login = (options?: { loginMethods?: string[] }) => {
    // If Google login is requested, use the Google OAuth flow
    if (options?.loginMethods?.includes('google')) {
      googleLogin();
      return;
    }
    
    // Otherwise use Civic login (mocked for now)
    setIsLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: 'civic-' + Math.random().toString(36).substring(2, 9),
        name: 'Civic User',
        email: 'civic.user@example.com',
        avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
        provider: 'civic'
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Generate wallet address
      const newWalletAddress = generateWalletAddress(newUser.id);
      setWalletAddress(newWalletAddress);
      localStorage.setItem('walletAddress', newWalletAddress);
      
      setUser(newUser);
      setIsLoading(false);
      console.log('Logged in with Civic');
    }, 1500);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('walletAddress');
      setWalletAddress(null);
      
      // Reload the page to ensure clean state
      window.location.reload();
    }, 800);
  };

  return (
    <AuthContext.Provider value={{ user, walletAddress, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
