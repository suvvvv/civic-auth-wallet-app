import React from 'react';
import { FaWallet, FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="border-t dark:border-dark-border dark:bg-dark-background bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <div className="bg-primary-600 p-2 rounded-full mr-2">
                <FaWallet className="text-white text-sm" />
              </div>
              <p className="text-lg font-semibold dark:text-dark-text">Civic Auth Wallet</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Experience the future of authentication with Civic Auth and embedded wallets.
              Secure, fast, and user-friendly.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-3 dark:text-dark-text">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://auth.civic.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Civic Auth Docs
                  </a>
                </li>
                <li>
                  <a 
                    href="https://auth.civic.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Developer Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 dark:text-dark-text">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/civicteam" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href="https://twitter.com/civickey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
                <a 
                  href="https://discord.com/invite/civic" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Discord"
                >
                  <FaDiscord size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t dark:border-dark-border text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Civic Auth Wallet App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
