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

    // onAuthStateChanged($auth, (u) => user.value = u);
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
                console.error('No user logged in.');
                throw new Error('No user logged in.');
            }
        }
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
