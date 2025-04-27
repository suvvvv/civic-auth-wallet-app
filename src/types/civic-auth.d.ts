declare module '@civic/auth-web3/react' {
  export interface User {
    id: string;
    email?: string;
    name?: string;
    picture?: string;
    avatar?: string; // Added for compatibility
    given_name?: string;
    family_name?: string;
    updated_at?: Date;
    createWallet?: () => Promise<void>;
  }

  export interface LoginOptions {
    loginMethods?: string[];
  }

  export interface UserContext {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    login: (options?: LoginOptions) => Promise<void>;
    logout: () => Promise<void>;
  }

  export function useUser(): UserContext;
  
  export interface UserButtonProps {
    className?: string;
    style?: React.CSSProperties;
  }
  
  export function UserButton(props?: UserButtonProps): JSX.Element;
  
  export interface CivicAuthProviderProps {
    clientId: string;
    children: React.ReactNode;
    iframeMode?: 'embedded' | 'popup';
  }
  
  export function CivicAuthProvider(props: CivicAuthProviderProps): JSX.Element;
}

declare module '@civic/auth-web3/wagmi' {
  import { Connector } from 'wagmi';
  
  export function embeddedWallet(): Connector;
}
