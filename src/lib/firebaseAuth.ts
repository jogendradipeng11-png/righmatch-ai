import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Configure App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Workspace Gmail Scope - Least Privilege
export const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
// Hint user account if available
provider.setCustomParameters({
  prompt: 'consent',
  login_hint: 'jogendra.dipeng11@gmail.com',
});

// Flag to indicate if we are in the middle of a sign-in flow
let isSigningIn = false;
// Cache the access token in memory (NEVER in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;
let cachedUser: any = null;

// Helpers for persistent connection state
export const getStoredConnectedEmail = (): string | null => {
  try {
    return localStorage.getItem('rigmatch_connected_gmail');
  } catch {
    return null;
  }
};

export const setStoredConnectedEmail = (email: string | null) => {
  try {
    if (email) {
      localStorage.setItem('rigmatch_connected_gmail', email);
    } else {
      localStorage.removeItem('rigmatch_connected_gmail');
    }
  } catch {}
};

export const createSimulatedUser = (email: string, displayName = 'Jogendra Patel'): any => {
  return {
    email,
    displayName,
    uid: `gmail_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
    photoURL: null,
    emailVerified: true,
  };
};

export const connectDirectEmail = (
  email: string,
  displayName = 'Jogendra Patel'
): { user: any; accessToken: string | null } => {
  const cleanEmail = email.trim();
  setStoredConnectedEmail(cleanEmail);
  const simUser = createSimulatedUser(cleanEmail, displayName);
  cachedUser = simUser;
  return { user: simUser, accessToken: cachedAccessToken };
};

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: (user: any, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  // Pre-seed with stored email if available
  const storedEmail = getStoredConnectedEmail();
  if (storedEmail && !auth.currentUser) {
    const simUser = createSimulatedUser(storedEmail);
    cachedUser = simUser;
    if (onAuthSuccess) onAuthSuccess(simUser, cachedAccessToken);
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedUser = user;
      if (user.email) setStoredConnectedEmail(user.email);
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      const persistedEmail = getStoredConnectedEmail();
      if (persistedEmail) {
        const simUser = createSimulatedUser(persistedEmail);
        cachedUser = simUser;
        if (onAuthSuccess) onAuthSuccess(simUser, cachedAccessToken);
      } else {
        cachedAccessToken = null;
        cachedUser = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: any; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get Gmail access token from Google sign-in');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    if (result.user.email) {
      setStoredConnectedEmail(result.user.email);
    }
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
    console.warn('Google Sign-in error details:', error);

    if (error.code === 'auth/unauthorized-domain') {
      error.friendlyMessage = `Your domain (${currentDomain}) is not authorized in Firebase Console. Add "${currentDomain}" to Firebase Console > Authentication > Settings > Authorized domains.`;
    } else if (error.code === 'auth/popup-blocked') {
      error.friendlyMessage = `Google sign-in popup was blocked by browser security. You can either allow popups for ${currentDomain} or connect directly below.`;
    } else if (error.code === 'auth/cancelled-popup-request') {
      error.friendlyMessage = 'Authentication popup request was cancelled or replaced by another request.';
    }

    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const getCurrentUser = (): any => {
  return cachedUser || auth.currentUser;
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Firebase sign out error:', e);
  }
  setStoredConnectedEmail(null);
  cachedAccessToken = null;
  cachedUser = null;
};

export const googleSignOut = logout;
