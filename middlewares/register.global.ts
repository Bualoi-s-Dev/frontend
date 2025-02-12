export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore();

    if(user.profile === null) {
        return navigateTo('/user/register/role');
    }
})
