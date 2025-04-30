# Civic Auth Wallet App

## Overview

This project demonstrates the integration of Civic Auth into a modern React application, providing a seamless authentication experience with embedded wallets. The application showcases how to leverage Civic Auth to enable familiar sign-in options (including Google OAuth) while offering embedded blockchain wallets to users with a sleek, dark-themed UI. The app focuses on creating a comprehensive Web3 identity platform where users can mint soulbound NFTs, earn points, and unlock features as they progress in their blockchain journey.

## Features

### Core Functionality
- **Multi-Provider Authentication**: Seamless login experience using Civic Auth with Google OAuth integration
- **Embedded Wallets**: Automatic creation of blockchain wallets for authenticated users without seed phrases
- **Dark Mode UI**: Modern, responsive dark-themed interface with subtle animations
- **Wallet Management**: View wallet addresses, balances, and transaction capabilities

### Web3 Identity Features
- **Moments NFT System**: Mint soulbound NFTs to commemorate your Web3 journey milestones
- **Points & Achievements**: Earn Civic Points through various actions and unlock achievements
- **Progressive Feature Access**: Unlock advanced features as you progress in your Web3 journey
- **Referral System**: Invite friends and earn rewards through the built-in referral program

### Security & UX
- **Enhanced Security**: Multi-factor authentication and social recovery options for account access
- **Recent Activity Tracking**: Monitor recent transactions with detailed information
- **Optimized Readability**: Carefully balanced UI effects for both aesthetics and usability
- **Responsive Design**: Fully responsive interface that works seamlessly across devices

## Why Civic Auth?

Civic Auth provides a simple, flexible, and fast way to integrate authentication into applications. With Civic Auth, you can:

- Enable familiar sign-in options like Google, Discord, or other OAuth providers
- Offer embedded wallets that unlock blockchain benefits for your users
- Get up and running in 5 minutes with minimal configuration
- Provide a seamless user experience without compromising on security

## Technologies Used

- React 18 with TypeScript
- Civic Auth Web3 SDK (`@civic/auth-web3`)
- Google OAuth Integration (`@react-oauth/google`)
- Tailwind CSS for styling
- React Router for navigation
- React Icons for UI elements

## Prerequisites

- Node.js (v16+)
- npm or yarn
- A Civic Auth client ID (sign up at [auth.civic.com](https://auth.civic.com))

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/civic-auth-wallet-app.git
   cd civic-auth-wallet-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Civic Auth client ID
   ```
   REACT_APP_CIVIC_CLIENT_ID=your-client-id-here
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click the "Sign In" button to authenticate with Civic Auth
3. After authentication, an embedded wallet will be automatically created
4. Use the dashboard to view wallet details and perform transactions

## Application Pages

### Home / Dashboard
- **Authentication**: Google and Civic login options
- **Wallet Display**: ETH wallet with address and balance
- **Recent Activity**: Transaction history with timestamps
- **Security Features**: Key management, MFA, and recovery options

### Moments
- Create and view soulbound NFTs that commemorate your Web3 journey
- Each moment is stored on the blockchain as a non-transferable token

### Progress
- Track your Civic Points earned through various actions
- View achievements and badges unlocked through engagement
- Monitor your progress toward unlocking premium features

### Referral
- Generate unique referral links to invite friends
- Track referral status and earned rewards
- View referral leaderboards and statistics

### Pro Tools
- Access advanced features unlocked through points and achievements
- Premium tools for experienced Web3 users

### Beta Zone
- Preview and test experimental features before full release
- Provide feedback on new functionality

### Learn
- Educational content about blockchain and Web3 concepts
- Complete lessons to earn Civic Points
- Track learning progress and knowledge growth

## Project Structure

```
├── public/                  # Static files
├── src/
│   ├── components/          # React components
│   │   ├── auth/            # Authentication components
│   │   ├── wallet/          # Wallet-related components
│   │   └── ui/              # UI components
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Page components
│   ├── services/            # API and service functions
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main App component
│   └── index.tsx            # Entry point
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Testing

The application includes comprehensive tests for components and functionality:

```bash
npm test
```

## Recent UI Improvements

The application has undergone several UI enhancements to improve readability and user experience:

- **Optimized Glow Effects**: Reduced intensity of neon glow animations to improve text readability
- **Balanced Animations**: Fine-tuned animation effects to be visually appealing without being distracting
- **Layout Adjustments**: Improved spacing and positioning of UI elements for better visual hierarchy
- **Enhanced Contrast**: Adjusted opacity and color values to ensure text remains readable against animated backgrounds
- **Responsive Improvements**: Optimized layout for various screen sizes with better component positioning
- **Reorganized Information Architecture**: Prioritized critical information like Recent Activity for better user workflow

## Acknowledgements

- [Civic Auth](https://auth.civic.com) for providing the authentication SDK
- [Create React App](https://create-react-app.dev/) for the project setup
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) for the comprehensive icon library
