
import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();
    // console.log("init plugin", process.env.FIREBASE_API_KEY)
    const app = initializeApp(config.public.firebaseConfig);

    const auth = getAuth(app)
    const firestore = getFirestore(app)

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    return {
        provide: {
            auth, firestore, googleProvider, facebookProvider
        }
    };
})