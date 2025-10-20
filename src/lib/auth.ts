export function validateApiKey(apiKey: string | null): boolean {
  if (!apiKey) return false;
  
  const validApiKey = process.env.API_KEY;
  if (!validApiKey) {
    // If no API key is configured, allow all requests (for development)
    console.warn('No API_KEY configured - allowing all requests!');
    return true;
  }
  
  return apiKey === validApiKey;
}