export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore();

    // TODO: implement register guarding
    if(user.profile === null) {
        return navigateTo('/user/register/role');
    }
})
