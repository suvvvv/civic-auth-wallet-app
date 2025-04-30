// Mock implementation for NFT.Storage
// This simulates IPFS uploads without requiring an API key

/**
 * Converts a data URL to a File object
 */
export const dataURLToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Uploads an NFT to IPFS via NFT.Storage
 */
export const uploadNFT = async (
  imageFile: File,
  name: string,
  description: string,
  creator: string
): Promise<string> => {
  try {
    console.log('Simulating NFT upload to IPFS...');
    
    // Generate a random CID to simulate IPFS
    const randomCID = 'bafybeih' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Create a mock IPFS URL
    const mockIpfsUrl = `ipfs://${randomCID}`;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('NFT uploaded successfully (simulated)!');
    console.log('Mock IPFS URL:', mockIpfsUrl);
    
    // Return a mock IPFS URL
    return mockIpfsUrl;
  } catch (error) {
    console.error('Error in mock NFT upload:', error);
    throw error;
  }
};

/**
 * Retrieves NFT metadata from IPFS
 */
export const getNFTMetadata = async (ipfsUrl: string) => {
  try {
    const response = await fetch(ipfsUrl);
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error('Error retrieving NFT metadata:', error);
    throw error;
  }
};
