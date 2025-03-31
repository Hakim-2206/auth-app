import {create} from "zustand";

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: true,
    error: null,

    fetchUser: async () => {
        try {
            console.log("Fetching user...")
            const res = await fetch(`${API_URL}/auth/me`, {
                credentials: "include",
            });

            if (res.ok) {
                const userData = await res.json();
                set({user: userData, isLoading: false});
            } else {
                set({user: null, isLoading: false});
            }
        } catch (err) {
            set({user: null, isLoading: false});
        }
    },
    register: async (name, email, password) => {
        set({error: null});
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, password}),
                credentials: 'include'
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.message)
        } catch (err) {
            set({error: err.message})
        }
    },
    login: async (email, password) => {
        set({error: null});
        console.log("Attempting login with:", email, password);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
                credentials: "include",
            });
            console.log("Response received:", res);

            const data = await res.json();
            console.log("Data received:", data);

            if (!res.ok) throw new Error(data.message)

            set({user: data.user, error: null})
            console.log("User set in store:", data.user)
        } catch (err) {
            set({error: err.message})
        }
    },
    logout: async () => {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        set({user: null})
    },
}))