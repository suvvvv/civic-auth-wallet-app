import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import components
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { Login } from './components/Login';
import { WalletActions } from './components/WalletActions';

// Import Auth Context
import { AuthProvider } from './context/AuthContext';

// Add global animation styles
const globalAnimations = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes neonGlow {
    0% { box-shadow: 0 0 5px #9D4EDD, 0 0 10px #9D4EDD, 0 0 15px #9D4EDD, 0 0 20px #9D4EDD; }
    50% { box-shadow: 0 0 10px #B14AED, 0 0 20px #B14AED, 0 0 30px #B14AED, 0 0 40px #B14AED; }
    100% { box-shadow: 0 0 5px #9D4EDD, 0 0 10px #9D4EDD, 0 0 15px #9D4EDD, 0 0 20px #9D4EDD; }
  }
  
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  @keyframes gridReveal {
    0% { opacity: 0; background-size: 10px 10px; }
    50% { opacity: 0.5; background-size: 15px 15px; }
    100% { opacity: 0.2; background-size: 10px 10px; }
  }
  
  @keyframes hologramFlicker {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    52% { opacity: 0.9; }
    54% { opacity: 0.7; }
    56% { opacity: 0.9; }
    100% { opacity: 1; }
  }
  
  @keyframes dataStream {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.5s ease-out;
  }
  
  .animate-pulse-slow {
    animation: pulse 2s infinite;
  }

  .animate-shimmer {
    background: linear-gradient(90deg, rgba(157,78,221,0) 0%, rgba(157,78,221,0.1) 50%, rgba(157,78,221,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .animate-neon-glow {
    animation: neonGlow 2s infinite;
  }
  
  .animate-scanline {
    position: relative;
    overflow: hidden;
  }
  
  .animate-scanline::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(to bottom, rgba(177,74,237,0.2), rgba(177,74,237,0));
    animation: scanline 2s linear infinite;
    pointer-events: none;
  }
  
  .animate-grid-reveal {
    position: relative;
  }
  
  .animate-grid-reveal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, rgba(157,78,221,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(157,78,221,0.1) 1px, transparent 1px);
    background-size: 10px 10px;
    animation: gridReveal 4s infinite;
    pointer-events: none;
  }
  
  .animate-hologram-flicker {
    animation: hologramFlicker 3s infinite;
  }
  
  .animate-data-stream {
    background: linear-gradient(90deg, 
      rgba(157,78,221,0.05) 0%, 
      rgba(157,78,221,0.1) 15%, 
      rgba(157,78,221,0.05) 30%,
      rgba(157,78,221,0.1) 45%,
      rgba(157,78,221,0.05) 60%,
      rgba(157,78,221,0.1) 75%,
      rgba(157,78,221,0.05) 90%);
    background-size: 200% 100%;
    animation: dataStream 3s linear infinite;
  }

  .feature-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(157,78,221,0.1) 0%, rgba(0,0,0,0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .feature-card:hover::after {
    opacity: 1;
  }
`;

const App: React.FC = () => {
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Set dark mode on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Get client ID from environment variables
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '635396497802-0he1si2b1kiinisgpmlkdq0v6lorr6fq.apps.googleusercontent.com';

  return (
    <React.Fragment>
      <style dangerouslySetInnerHTML={{ __html: globalAnimations }} />
      <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <Router>
              <div className={`flex flex-col min-h-screen ${darkMode ? 'dark bg-dark-background text-dark-text' : 'bg-gray-50 text-gray-900'}`}>
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={
                    <div className="py-8 animate-fade-in">
                      <div className="text-center mb-12 animate-slide-up">
                        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent animate-hologram-flicker">
                          Secure Wallet Authentication
                        </h1>
                        <div className="relative inline-block">
                          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
                          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto relative z-10`}>
                            Experience the future of authentication with secure embedded wallets.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <div className="animate-fade-in w-full md:w-auto" style={{animationDelay: '0.2s'}}>
                          <Login />
                        </div>
                        <div className="animate-fade-in w-full md:w-auto" style={{animationDelay: '0.4s'}}>
                          <WalletActions />
                        </div>
                      </div>
                      
                      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className={`feature-card animate-grid-reveal ${darkMode ? 'bg-dark-card' : 'bg-white'} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border ${darkMode ? 'border-dark-border' : 'border-gray-200'} animate-fade-in`} style={{animationDelay: '0.5s'}}>
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full blur-md opacity-70 animate-pulse-slow"></div>
                            <div className="bg-gradient-to-r from-neon-purple to-primary-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 relative animate-neon-glow">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent">Secure Authentication</h3>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Sign in with trusted providers like Google, Discord, or Facebook for enhanced security.
                          </p>
                        </div>
                        <div className={`feature-card animate-scanline ${darkMode ? 'bg-dark-card' : 'bg-white'} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border ${darkMode ? 'border-dark-border' : 'border-gray-200'} animate-fade-in`} style={{animationDelay: '0.7s'}}>
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full blur-md opacity-70 animate-pulse-slow"></div>
                            <div className="bg-gradient-to-r from-neon-purple to-primary-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 relative animate-neon-glow">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent">Embedded Wallets</h3>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Get an Ethereum and Solana wallet automatically created when you sign in.
                          </p>
                        </div>
                        <div className={`feature-card animate-data-stream ${darkMode ? 'bg-dark-card' : 'bg-white'} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border ${darkMode ? 'border-dark-border' : 'border-gray-200'} animate-fade-in`} style={{animationDelay: '0.9s'}}>
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-primary-500 rounded-full blur-md opacity-70 animate-pulse-slow"></div>
                            <div className="bg-gradient-to-r from-neon-purple to-primary-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 relative animate-neon-glow">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-neon-purple to-primary-500 bg-clip-text text-transparent">Blockchain Transactions</h3>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Send and receive tokens on multiple blockchains with a seamless experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  } />
                  <Route path="/transactions" element={<div className="p-8 text-center animate-fade-in">Transactions page coming soon</div>} />
                  <Route path="/security" element={<div className="p-8 text-center animate-fade-in">Security settings coming soon</div>} />
                </Routes>
              </main>
              <Footer />
              
              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-dark-card dark:bg-gray-200 shadow-lg z-50 transition-transform hover:scale-110"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                )}
              </button>
              </div>
            </Router>
          </AuthProvider>
      </GoogleOAuthProvider>
    </React.Fragment>
  );
}

export default App;
