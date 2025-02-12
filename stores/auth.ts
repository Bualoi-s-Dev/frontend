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
    const email = ref<string>('');
    const password = ref<string>('');
    const user = ref<User | null>(null);
    const jwtToken = ref<string>('');
    const error = ref<string>('');
    const message = ref<string>('');

    const { $auth, $facebookProvider, $googleProvider } = useNuxtApp();
    const config = useRuntimeConfig();

    const handleRegister = async (): Promise<void> => {
        try {
            const userCredential = await createUserWithEmailAndPassword($auth, email.value, password.value);
            user.value = userCredential.user;
            await fetchToken(userCredential.user);
        } catch (err: any) {
            error.value = err.message;
        }
    };

    const handleLogin = async (): Promise<void> => {
        try {
            const userCredential = await signInWithEmailAndPassword($auth, email.value, password.value);
            user.value = userCredential.user;
            await fetchToken(userCredential.user);
        } catch (err: any) {
            error.value = err.message;
        }
    };

    const handleGoogleLogin = async (): Promise<void> => {
        try {
            const userCredential = await signInWithPopup($auth, $googleProvider);
            user.value = userCredential.user;
            await fetchToken(userCredential.user);
        } catch (err: any) {
            error.value = err.message;
        }
    };

    const handleFacebookLogin = async (): Promise<void> => {
        try {
            const userCredential = await signInWithPopup($auth, $facebookProvider);
            user.value = userCredential.user;
            await fetchToken(userCredential.user);
        } catch (err: any) {
            error.value = err.message;
        }
    };

    const handleLogout = async (): Promise<void> => {
        await signOut($auth);
        user.value = null;
        jwtToken.value = '';
    };

    const fetchToken = async (firebaseUser: User | null): Promise<void> => {
        if (!firebaseUser) return;
        try {
            const token = await getIdToken(firebaseUser);
            jwtToken.value = token;
        } catch {
            error.value = 'Error getting token';
        }
    };

    const fetchUserProfile = async (): Promise<void> => {
        if (!jwtToken.value) {
            error.value = 'You need to log in first.';
            return;
        }
        try {
            const response = await axios.get(config.public.apiUrl, {
                headers: { Authorization: `Bearer ${jwtToken.value}` }
            });
            alert(`User Profile: ${JSON.stringify(response.data)}`);
        } catch {
            error.value = 'Failed to fetch profile.';
        }
    };

    const handleForgotPassword = async (): Promise<void> => {
        if (!email.value) {
            error.value = 'Please enter your email first.';
            return;
        }
        try {
            await sendPasswordResetEmail($auth, email.value);
            message.value = 'Password reset link sent to your email.';
            error.value = '';
        } catch (err: any) {
            error.value = err.message;
        }
    };

    return {
        email,
        password,
        user,
        jwtToken,
        error,
        message,
        handleRegister,
        handleLogin,
        handleGoogleLogin,
        handleFacebookLogin,
        handleLogout,
        fetchUserProfile,
        handleForgotPassword
    };
});
