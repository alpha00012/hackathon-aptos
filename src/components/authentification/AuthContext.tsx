'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase/firebaseConfig';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const logout = async () => {
        try {
            await signOut(firebaseAuth);
            // The onAuthStateChanged listener will automatically update the user state
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading,logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);