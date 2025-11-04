// Generate or retrieve a unique session ID for tracking clicked words
export const getSessionId = (): string => {
  const STORAGE_KEY = 'portfolio_session_id';
  
  let sessionId = localStorage.getItem(STORAGE_KEY);
  
  if (!sessionId) {
    // Generate a new session ID
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  
  return sessionId;
};
