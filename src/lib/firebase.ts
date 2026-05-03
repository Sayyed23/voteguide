/**
 * @fileoverview Firebase initialization module for VoteGuide.
 * Configures Firebase Auth (Google Sign-In) and Cloud Firestore
 * for persistent, per-user checklist state management.
 *
 * @security
 * - Environment variables are used for all Firebase credentials
 * - Graceful fallback when API keys are missing (features disabled, no crashes)
 * - Singleton pattern prevents duplicate Firebase app initialization
 *
 * @see https://firebase.google.com/docs/web/setup
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

/**
 * Firebase configuration object populated from environment variables.
 * All values use the NEXT_PUBLIC_ prefix for client-side availability.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

/**
 * Firebase App instance. Null when config is missing.
 */
let app: FirebaseApp | null = null;

/**
 * Firebase Auth instance for Google Sign-In. Null when config is missing.
 */
let auth: Auth | null = null;

/**
 * Cloud Firestore instance for checklist persistence. Null when config is missing.
 */
let db: Firestore | null = null;

// Initialize Firebase only if we have the config
// Uses singleton pattern to prevent duplicate initialization in Next.js
if (firebaseConfig.apiKey) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn(
    "Firebase config is missing. Firebase features (Auth, Firestore) will be disabled. " +
    "The app will continue to work with local-only functionality."
  );
}

export { app, auth, db };
