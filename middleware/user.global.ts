import { UserRole } from "~/types/api";

// Have to return in each condition if going to the same route to prevent infinite 
// loop, and return early so that it will not fall to other conditions if the
// first condition is met. 
export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore();
    const api = useApiStore();


    // User has not logged in
    const isSignedIn = await auth.isSignedIn();
    if (!isSignedIn) {
        if (to.path === '/user/login' || to.path === '/user/register' || to.path === '/user/login/reset/1' || to.path === '/user/login/reset/2' || to.path === '/user/login/reset/success') return;
        else return navigateTo('/user/login');
    }

    // User has already logged in but has incomplete profile
    const profile = await api.fetchUserProfile();
    if (profile.name === '') {
        // allow user to login to another account
        if (to.path === '/user/register/createUser' || to.path === '/user/register' || to.path === '/user/login') return;
        else return navigateTo('/user/register/createUser');
    }
    if (profile.role === UserRole.Guest) {
        // allow user to login to another account
        if (to.path === '/user/register/selectRole' || to.path === '/user/register' || to.path === '/user/login') return;
        else return navigateTo('/user/register/selectRole');
    }
    if (profile.role === UserRole.Photographer && !profile.bankAccount) {
        // allow user to login to another account
        if (to.path === '/user/register/createPhotographer' || to.path === '/user/register' || to.path === '/user/login') return;
        else return navigateTo('/user/register/createPhotographer');
    }

    // User has already registered profile and logged in, but is going to registration route, redirect to home
    if (to.path.startsWith('/user/register') || to.path.startsWith('/user/login')) return navigateTo('/');
})
