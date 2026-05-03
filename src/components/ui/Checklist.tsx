/**
 * @fileoverview Interactive checklist component with Firebase persistence.
 * Renders a list of preparation tasks for a given election stage.
 * When the user is authenticated via Firebase Auth, checklist state
 * is persisted to Cloud Firestore and synced across devices.
 * Uses useCallback for stable event handlers.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

/** Shape of a single checklist item */
interface ChecklistItem {
  /** Unique numeric ID */
  id: number;
  /** Display label text */
  label: string;
  /** Default checked state */
  checked: boolean;
}

/** Props for the Checklist component */
interface ChecklistProps {
  /** Array of checklist items to display */
  items: ChecklistItem[];
  /** Stage ID used to namespace Firestore documents */
  stageId: number;
}

/**
 * Checklist component renders an interactive preparation checklist.
 * Supports anonymous local-only usage and authenticated Firestore persistence.
 */
export const Checklist = ({ items, stageId }: ChecklistProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Auth Listener — subscribes to Firebase auth state changes
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        const defaultState: Record<number, boolean> = {};
        items.forEach(i => defaultState[i.id] = i.checked);
        setCheckedItems(defaultState);
      }
    });
    return () => unsubscribe();
  }, [items]);

  // Fetch checklist data from Firestore when user logs in
  useEffect(() => {
    async function fetchChecklist(): Promise<void> {
      if (user && db) {
        try {
          const docRef = doc(db, 'users', user.uid, 'checklists', `stage_${stageId}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCheckedItems(docSnap.data().items || {});
          } else {
             const defaultState: Record<number, boolean> = {};
             items.forEach(i => defaultState[i.id] = i.checked);
             setCheckedItems(defaultState);
          }
        } catch (error) {
          console.error("Error fetching checklist:", error);
        }
      }
      setLoading(false);
    }
    fetchChecklist();
  }, [user, stageId, items]);

  /**
   * Toggle a checklist item and persist to Firestore if authenticated.
   * Uses optimistic UI update — state is set immediately before the
   * async write completes.
   */
  const handleToggle = useCallback(async (itemId: number) => {
    const newState = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId]
    };
    
    setCheckedItems(newState);

    if (user && db) {
      try {
        const docRef = doc(db, 'users', user.uid, 'checklists', `stage_${stageId}`);
        await setDoc(docRef, { items: newState }, { merge: true });
      } catch (error) {
        console.error("Error saving checklist:", error);
      }
    }
  }, [checkedItems, user, stageId]);

  /** Initiate Google Sign-In via Firebase popup */
  const handleSignIn = useCallback(async () => {
    if (!auth) {
      console.error("Auth is not initialized");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error", error);
    }
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="px-8 mt-24 max-w-7xl mx-auto w-full" aria-label="Preparation checklist">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        
        {/* Sign In Overlay for Guest Users */}
        {!user && !loading && (
           <div className="absolute top-4 right-4 z-10">
             <button onClick={handleSignIn} className="bg-white/10 hover:bg-white/20 text-xs text-white px-3 py-1.5 rounded-lg font-medium transition-colors border border-white/10 flex items-center gap-2" type="button">
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign In to Save
             </button>
           </div>
        )}

        <div className="flex items-center gap-3 mb-8">
          <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-extrabold">Your Checklist</h2>
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-4" aria-label="Loading checklist">
             <div className="h-14 bg-white/5 rounded-xl w-full"></div>
             <div className="h-14 bg-white/5 rounded-xl w-full"></div>
          </div>
        ) : (
          <div className="grid gap-4" role="group" aria-label="Checklist items">
            {items.map(item => (
              <label key={item.id} className="flex items-center gap-4 p-5 bg-brand-navy border border-white/5 rounded-xl cursor-pointer hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-all group">
                <input 
                  type="checkbox" 
                  checked={!!checkedItems[item.id]} 
                  onChange={() => handleToggle(item.id)}
                  className="w-5 h-5 rounded border-white/10 bg-transparent text-brand-teal focus:ring-brand-teal/50" 
                />
                <span className={`transition-colors ${checkedItems[item.id] ? 'text-brand-teal line-through opacity-70' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
