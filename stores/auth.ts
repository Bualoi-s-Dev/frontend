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
    setPersistence,
    browserLocalPersistence
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const { $auth, $facebookProvider, $googleProvider } = useNuxtApp();

    const handleRegister = async (email: string, password: string,): Promise<void> => {
        await setPersistence($auth, browserLocalPersistence);
        const userCredential = await createUserWithEmailAndPassword($auth, email, password);
    };

    const handleLogin = async (email: string, password: string): Promise<void> => {
        await setPersistence($auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword($auth, email, password);
    };

    const handleGoogleLogin = async (): Promise<void> => {
        await setPersistence($auth, browserLocalPersistence);
        const userCredential = await signInWithPopup($auth, $googleProvider);
    };

    const handleFacebookLogin = async (): Promise<void> => {
        await setPersistence($auth, browserLocalPersistence);
        const userCredential = await signInWithPopup($auth, $facebookProvider);
    };


    const actionCodeSettings = {
        url: `${window.location.origin}/user/login/reset/success`,
        handleCodeInApp: false, // Ensures the action is handled in your app
    };

    const handleForgotPassword = async (email: string): Promise<void> => {
        if (!email) return;
        await sendPasswordResetEmail($auth, email, actionCodeSettings);
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
        if (!user.value) {
            await $auth.authStateReady();
            if ($auth.currentUser) {
                user.value = $auth.currentUser;
            } else {
                throw new Error('No user logged in.');
            }
        }
        const token = await getIdToken(user.value);
        return token;
    };

    /**
     * Checks if the user is currently signed in.
     * 
     * @returns {Promise<boolean>} A promise that resolves to true if the user is signed in, false otherwise.
     */
    const isSignedIn = async () => {
        try { await fetchToken(); return true; } catch (e) { return false; }
    }

    return {
        user,
        fetchToken,
        isSignedIn,
        handleRegister,
        handleLogin,
        handleGoogleLogin,
        handleFacebookLogin,
        handleLogout,
        handleForgotPassword
    };
});
