'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface ChecklistItem {
  id: number;
  label: string;
  checked: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  stageId: number; // Need stage ID to namespace the checklist in DB
}

export const Checklist = ({ items, stageId }: ChecklistProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        // Reset to default if logged out
        const defaultState: Record<number, boolean> = {};
        items.forEach(i => defaultState[i.id] = i.checked);
        setCheckedItems(defaultState);
      }
    });
    return () => unsubscribe();
  }, [items]);

  // Fetch data from Firestore when user logs in
  useEffect(() => {
    async function fetchChecklist() {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid, 'checklists', `stage_${stageId}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCheckedItems(docSnap.data().items || {});
          } else {
             // init default
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

  // Handle Checkbox Change
  const handleToggle = async (itemId: number) => {
    const newState = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId]
    };
    
    setCheckedItems(newState);

    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'checklists', `stage_${stageId}`);
        await setDoc(docRef, { items: newState }, { merge: true });
      } catch (error) {
        console.error("Error saving checklist:", error);
      }
    }
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error", error);
    }
  }

  if (!items || items.length === 0) return null;

  return (
    <section className="px-8 mt-24 max-w-7xl mx-auto w-full">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        
        {/* Sign In Overlay for Guest Users */}
        {!user && !loading && (
           <div className="absolute top-4 right-4 z-10">
             <button onClick={handleSignIn} className="bg-white/10 hover:bg-white/20 text-xs text-white px-3 py-1.5 rounded-lg font-medium transition-colors border border-white/10 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign In to Save
             </button>
           </div>
        )}

        <div className="flex items-center gap-3 mb-8">
          <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-extrabold">Your Checklist</h2>
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-14 bg-white/5 rounded-xl w-full"></div>
             <div className="h-14 bg-white/5 rounded-xl w-full"></div>
          </div>
        ) : (
          <div className="grid gap-4">
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
