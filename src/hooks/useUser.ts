import { useState, useEffect } from 'react';
import supabaseBrowserClient from '@/utils/supabase/client/client';
import { User } from '@supabase/supabase-js';

const fetchSession = async (): Promise<User | null> => {
    const { data: { session }, error } = await supabaseBrowserClient.auth.getSession();
    if (error) {
        console.error('Error fetching session:', error.message);
        return null;
    }
    return session?.user ?? null;
};

export const useUser = (): User | null => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await fetchSession();
            setUser(currentUser);
        }        
        loadUser();

        const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => { 
            authListener?.subscription.unsubscribe();
        }
    }, []);

    return user;
}