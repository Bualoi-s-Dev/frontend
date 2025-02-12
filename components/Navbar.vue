<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const auth = useAuthStore();
const router = useRouter();

const errorMessage = ref("");

const menuOpen = ref(false);
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const onLogoutSuccess = () => {
    toggleMenu();
  router.push("/user/login");
}

const handleLogout = async () => {
    try {
      await auth.handleLogout();
      onLogoutSuccess();
    } catch (error: any) {
      errorMessage.value = error.message;
    }
}

const handleProfileTravel = async () => {
    toggleMenu();
    router.push("/profile")
}
</script>

<template>
    <nav>
        <div class="container m-auto flex justify-between items-end">
            <button class="md:hidden" @click="toggleMenu">
                <Icon icon="line-md:align-right" style="width: 30; height: inherit;" />
            </button>
        </div>

        <div v-if="menuOpen" :class="[
            menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
            'md:hidden mt-4 bg-gray-100 p-4 rounded-lg absolute transition-all duration-300 ease-in-out right-5'
        ]"
        >
            <ul class="space-y-4">
                <li>
                    <NuxtLink to="/" class="block" @click="toggleMenu">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/profile" class="block" @click="handleProfileTravel">Profile</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/user/login" class="block text-red-500" @click="handleLogout">Logout</NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>