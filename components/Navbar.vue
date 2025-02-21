<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const auth = useAuthStore();
const menuOpen = ref(false);
const router = useRouter();
const errorMessage = ref('');
const api = useApiStore();
const config = useRuntimeConfig();

const user = ref({ name: '', description: '', location: '', profile: '', id: '' });

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();
    user.value.name = response.name
    user.value.profile = config.public.s3URL + response.profile
    user.value.location = response.location
    user.value.id = response.id;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}

console.log(fetchUserProfile());

const toggleMenu = async () => {
    menuOpen.value = !menuOpen.value;
    if(menuOpen.value) await fetchUserProfile();
};

const onLogoutSuccess = () => {
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

</script>

<template>
    <nav class="fixed w-full p-6 bg-transparent">
        <div class="flex items-center justify-end mr-5">

            <!-- Mobile toggle -->
            <button class="md:hidden" @click="toggleMenu">
                <Icon icon="line-md:align-right" style="width: 30; height: inherit;" />
            </button>

            <!-- For Desktop -->
            <!-- <div class="hidden md:block">
                <ul class="flex space-x-8 text-sm font-sans">
                    <li><a href="#" class="active border-b-2 border-black-500 pb-1">Home</a></li>
                    <li><a href="#" class="">Services</a></li>
                    <li><a href="#" class="">Features</a></li>
                    <li><a href="#" class="">FAQ</a></li>
                    <li><a href="#" class="">Contact</a></li>
                    <li>
                        <NuxtLink class="w-full text-center font-semibold cta inline-block bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white" @click="handleLogout">Logout</NuxtLink>
                    </li>
                </ul>
            </div> -->

            <!-- Dark Background Transition -->
            <!-- <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium"
                enter-to-class="opacity-100" leave-class="opacity-100" leave-active-class="ease-out transition-medium"
                leave-to-class="opacity-0">
                <div @keydown.esc="menuOpen = false" v-show="menuOpen" class="z-10 fixed inset-0 transition-opacity">
                    <div @click="menuOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
                </div>
            </transition> -->

            <!-- Drawer Menu -->
            <aside
                class="p-5 transform drop-shadow-xl top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
                :class="menuOpen ? 'translate-x-0' : '-translate-x-full'">

                <div class="flex flex-col justify-center items-center">
                    <img :src=user.profile alt="Profile Image" class="w-30 h-30 rounded-full object-cover">
                    <p class="pt-5">{{ user.name }}</p>
                    <!-- <img src="/assets/userpf.jpg" alt="Profile Image" class="w-30 h-30 rounded-full object-cover">
                    <p class="pt-5">Kang</p> -->
                </div>

                <ul class="divide-y-1 mx-3">
                    <li><a href="/" @click="toggleMenu" class="my-4 inline-block text-red-300">Home</a></li>
                    <li><a href="#" @click="toggleMenu" class="my-4 inline-block">Appointments</a></li>
                    <li><a href="#" @click="toggleMenu" class="my-4 inline-block">Create new package</a></li>
                    <li><a href="/profile" @click="toggleMenu" class="my-4 inline-block">Profile</a></li>
                    <li>
                        <NuxtLink class="my-8 w-full text-center cta inline-block bg-black hover:bg-black px-3 py-2 rounded text-white" @click="handleLogout">Logout</NuxtLink>
                    </li>
                </ul>
            </aside>

        </div>
    </nav>
</template>