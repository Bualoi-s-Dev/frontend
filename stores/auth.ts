import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getIdToken,
    sendPasswordResetEmail,
    type User,
    type Auth
} from 'firebase/auth';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const { $auth, $facebookProvider, $googleProvider } = useNuxtApp();
    // const config = useRuntimeConfig();

    const handleRegister = async (email: string, password: string,): Promise<void> => {
        const userCredential = await createUserWithEmailAndPassword($auth, email, password);
        user.value = userCredential.user;
    };

    const handleLogin = async (email: string, password: string): Promise<void> => {
        const userCredential = await signInWithEmailAndPassword($auth, email, password);
        user.value = userCredential.user;
    };

    const handleGoogleLogin = async (): Promise<void> => {
        const userCredential = await signInWithPopup($auth, $googleProvider);
        user.value = userCredential.user;
    };

    const handleFacebookLogin = async (): Promise<void> => {
        const userCredential = await signInWithPopup($auth, $facebookProvider);
        user.value = userCredential.user;
    };

    const handleForgotPassword = async (email: string): Promise<void> => {
        if(!email) return;
        await sendPasswordResetEmail($auth, email);
    };

    const handleLogout = async (): Promise<void> => {
        await signOut($auth);
        user.value = null;
    };

    /**
     * Fetches the ID token for the currently authenticated user. 
     * Call this every time before performing API requests that require authentication 
     * because this will automatically refresh the token.
     * 
     * @returns {Promise<string>} A promise that resolves to the user's ID token.
     * @throws Will throw an error if no user is currently logged in.
     */
    const fetchToken = async (): Promise<string> => {
        if (!user.value) throw Error("No user logged in.");
        const token = await getIdToken(user.value);
        return token;
    };

    // const fetchUserProfile = async (): Promise<void> => {
    //     if (!jwtToken.value) {
    //         error.value = 'You need to log in first.';
    //         return;
    //     }
    //     try {
    //         const response = await axios.get(config.public.apiUrl, {
    //             headers: { Authorization: `Bearer ${jwtToken.value}` }
    //         });
    //         alert(`User Profile: ${JSON.stringify(response.data)}`);
    //     } catch {
    //         error.value = 'Failed to fetch profile.';
    //     }
    // };

    return {
        user,
        fetchToken,
        handleRegister,
        handleLogin,
        handleGoogleLogin,
        handleFacebookLogin,
        handleLogout,
        handleForgotPassword
    };
});
