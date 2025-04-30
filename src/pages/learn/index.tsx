import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';

const LearnPage: React.FC = () => {
  const { user } = useAuth();
  const { addPoints, awardBadge, hasBadge } = usePoints();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [showBadgeConfirmation, setShowBadgeConfirmation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll to detect when user reaches the bottom
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Check if user has scrolled to the bottom (with a small buffer)
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setHasScrolledToBottom(true);
      }
    }
  };
  
  // Award badge when user scrolls to the bottom
  useEffect(() => {
    if (hasScrolledToBottom && user && !hasBadge('Web3Curious')) {
      // Award badge and points
      awardBadge('Web3Curious');
      // Show confirmation banner
      setShowBadgeConfirmation(true);
      // Hide confirmation after 5 seconds
      setTimeout(() => {
        setShowBadgeConfirmation(false);
      }, 5000);
    }
  }, [hasScrolledToBottom, user, awardBadge, hasBadge]);

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
          <p className="text-gray-400 mb-6">Please sign in to access the learning content.</p>
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
          Learn & Earn
        </h1>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-primary-500/20 blur-xl rounded-full"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Expand your Web3 knowledge and earn rewards
          </p>
        </div>
      </div>
      
      {/* Badge confirmation banner */}
      {showBadgeConfirmation && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-dark-card p-4 rounded-lg border border-neon-purple shadow-lg shadow-neon-purple/20 animate-neon-glow flex items-center">
            <div className="bg-neon-purple/20 p-2 rounded-full mr-3">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <p className="text-white font-medium">Web3 Curious Badge Earned!</p>
              <p className="text-gray-400 text-sm">+5 Civic Points added to your account</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        {/* Article content with scroll tracking */}
        <div 
          ref={contentRef} 
          onScroll={handleScroll} 
          className="bg-dark-card rounded-xl p-8 shadow-xl border border-dark-border animate-grid-reveal overflow-y-auto"
          style={{ maxHeight: '70vh' }}
        >
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-white">Web3: The Future of the Internet</h2>
            
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80" 
                alt="Web3 Concept" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-400 text-sm italic text-center">The decentralized web is changing how we interact online</p>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">What is Web3?</h3>
            <p className="text-gray-300 mb-6">
              Web3 represents the next evolution of the internet, built on decentralized technologies like blockchain. Unlike Web2 (the current internet dominated by large tech companies), Web3 aims to give users control over their data, digital assets, and online identities.
            </p>
            
            <div className="bg-dark-input p-6 rounded-lg border border-dark-border mb-8">
              <h4 className="text-xl font-bold mb-3 text-white">Key Features of Web3</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong className="text-neon-purple">Decentralization:</strong> No single entity controls the network</li>
                <li><strong className="text-neon-purple">Ownership:</strong> Users own their data and digital assets</li>
                <li><strong className="text-neon-purple">Permissionless:</strong> Anyone can participate without authorization from a governing body</li>
                <li><strong className="text-neon-purple">Native Payments:</strong> Uses cryptocurrency for sending money directly in the browser</li>
                <li><strong className="text-neon-purple">Trustless:</strong> Operates using incentives and economic mechanisms instead of relying on trusted third parties</li>
              </ul>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">The Evolution of the Web</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <h4 className="text-lg font-bold mb-2 text-white">Web1 (1990s-2000s)</h4>
                <p className="text-gray-400 text-sm">The "Read-Only" web. Static websites with minimal interaction. Users consumed information provided by content creators.</p>
              </div>
              
              <div className="bg-dark-input p-4 rounded-lg border border-dark-border">
                <h4 className="text-lg font-bold mb-2 text-white">Web2 (2000s-2020s)</h4>
                <p className="text-gray-400 text-sm">The "Read-Write" web. Interactive platforms where users create content, but platforms own the data and extract value from user activity.</p>
              </div>
              
              <div className="bg-gradient-to-br from-dark-input to-dark-input border-neon-purple/30 p-4 rounded-lg border animate-neon-glow">
                <h4 className="text-lg font-bold mb-2 text-white">Web3 (2020s-Future)</h4>
                <p className="text-gray-400 text-sm">The "Read-Write-Own" web. Decentralized applications where users control their data, digital identity, and assets through blockchain technology.</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">Core Technologies Behind Web3</h3>
            <p className="text-gray-300 mb-6">
              Web3 is built on several foundational technologies that enable its unique features:
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-neon-purple/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Blockchain</h4>
                  <p className="text-gray-300">
                    A distributed ledger that records transactions across many computers. This ensures that the record cannot be altered retroactively without the alteration of all subsequent blocks, which requires network consensus.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neon-purple/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Cryptocurrency</h4>
                  <p className="text-gray-300">
                    Digital or virtual currencies that use cryptography for security and operate on blockchain networks. Examples include Bitcoin, Ethereum, and Solana.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neon-purple/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Smart Contracts</h4>
                  <p className="text-gray-300">
                    Self-executing contracts with the terms directly written into code. They automatically execute when predefined conditions are met, without requiring intermediaries.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neon-purple/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Decentralized Applications (dApps)</h4>
                  <p className="text-gray-300">
                    Applications that run on a peer-to-peer network of computers rather than a single computer. They exist and run on a blockchain network in a public, open-source, decentralized environment.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">Web3 Use Cases</h3>
            <p className="text-gray-300 mb-6">
              Web3 technologies are enabling new possibilities across various domains:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-dark-input p-5 rounded-lg border border-dark-border">
                <h4 className="text-lg font-bold mb-2 text-white">Decentralized Finance (DeFi)</h4>
                <p className="text-gray-400 text-sm">
                  Financial services without centralized intermediaries like banks, enabling lending, borrowing, trading, and earning interest on crypto assets.
                </p>
              </div>
              
              <div className="bg-dark-input p-5 rounded-lg border border-dark-border">
                <h4 className="text-lg font-bold mb-2 text-white">Non-Fungible Tokens (NFTs)</h4>
                <p className="text-gray-400 text-sm">
                  Unique digital assets that represent ownership of items like art, collectibles, music, and virtual real estate.
                </p>
              </div>
              
              <div className="bg-dark-input p-5 rounded-lg border border-dark-border">
                <h4 className="text-lg font-bold mb-2 text-white">Decentralized Autonomous Organizations (DAOs)</h4>
                <p className="text-gray-400 text-sm">
                  Member-owned communities without centralized leadership, using smart contracts for governance and decision-making.
                </p>
              </div>
              
              <div className="bg-dark-input p-5 rounded-lg border border-dark-border">
                <h4 className="text-lg font-bold mb-2 text-white">Digital Identity</h4>
                <p className="text-gray-400 text-sm">
                  Self-sovereign identity systems that give users control over their personal data and how it's shared online.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">Getting Started with Web3</h3>
            <p className="text-gray-300 mb-6">
              Ready to dive into the Web3 ecosystem? Here are some steps to get started:
            </p>
            
            <ol className="list-decimal pl-6 space-y-4 text-gray-300 mb-8">
              <li>
                <strong className="text-white">Set up a wallet:</strong> Create a cryptocurrency wallet like MetaMask or use an embedded wallet solution like Civic to securely store your digital assets and interact with Web3 applications.
              </li>
              <li>
                <strong className="text-white">Learn about cryptocurrencies:</strong> Understand the basics of major cryptocurrencies like Ethereum and Solana, which power many Web3 applications.
              </li>
              <li>
                <strong className="text-white">Explore dApps:</strong> Start using decentralized applications in areas that interest you, such as DeFi, NFT marketplaces, or social platforms.
              </li>
              <li>
                <strong className="text-white">Join communities:</strong> Participate in Web3 communities on platforms like Discord or Twitter to learn from others and stay updated on the latest developments.
              </li>
              <li>
                <strong className="text-white">Create and collect:</strong> Mint your own NFTs or collect digital assets that resonate with you to experience ownership in the digital realm.
              </li>
            </ol>
            
            <div className="bg-gradient-to-br from-neon-purple/10 to-primary-500/10 p-6 rounded-lg border border-neon-purple/30 mb-8 animate-neon-glow">
              <h4 className="text-xl font-bold mb-3 text-white">The Future of Web3</h4>
              <p className="text-gray-300">
                Web3 is still in its early stages, with new innovations emerging regularly. As the technology matures, we can expect more user-friendly interfaces, improved scalability, and integration with existing systems. The vision is to create a more open, fair, and user-centric internet that empowers individuals rather than centralized entities.
              </p>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">Conclusion</h3>
            <p className="text-gray-300 mb-6">
              Web3 represents a paradigm shift in how we interact with the internet. By embracing decentralization, ownership, and user control, it offers a compelling alternative to the current web dominated by large tech companies. Whether you're interested in finance, art, gaming, or social networking, Web3 opens up new possibilities for creating and participating in digital ecosystems.
            </p>
            
            <p className="text-gray-300">
              As you continue your Web3 journey with Civic Momentum, you'll have opportunities to not just learn about these technologies but actively engage with them through creating moments, earning points, and unlocking achievements.
            </p>
            
            <div className="mt-12 text-center">
              <p className="text-gray-400 italic">
                Congratulations on completing this introduction to Web3! You've earned the Web3 Curious badge.
              </p>
              {hasBadge('Web3Curious') && (
                <div className="mt-4 inline-block bg-dark-input p-3 rounded-lg border border-neon-purple/30 animate-neon-glow">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🧠</span>
                    <span className="text-white font-medium">Web3 Curious Badge Earned!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Link 
            to="/progress" 
            className="py-3 px-6 bg-dark-input hover:bg-gray-800 text-white rounded-lg border border-dark-border transition-all duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
            </svg>
            View Your Progress
          </Link>
          
          <Link 
            to="/moments/create" 
            className="py-3 px-6 bg-gradient-to-r from-neon-purple to-primary-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30 font-medium flex items-center"
          >
            Create Your First Moment
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
