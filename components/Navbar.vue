<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const auth = useAuthStore();
const menuOpen = ref(false);
const router = useRouter();
const route = useRoute();
const errorMessage = ref("");
const api = useApiStore();
const config = useRuntimeConfig();
const firstSegment = ref("");
const secondSegment = ref("");

const user = ref({
  name: "",
  description: "",
  location: "",
  profile: "",
  id: "",
  role: "",
});

const fetchUserProfile = async () => {
  try {
    const response = await api.fetchUserProfile();
    user.value.name = response.name;
    user.value.profile = config.public.s3URL + response.profile;
    user.value.location = response.location;
    user.value.id = response.id;
    user.value.role = response.role;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

const toggleMenu = async () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    firstSegment.value = route.path.split("/")[1];
    secondSegment.value = route.path.split("/")[2];
    await fetchUserProfile();
  }
};

const onLogoutSuccess = () => {
  router.push("/user/login");
};

const onPhotographer = async () => {
  await toggleMenu();
  router.push("/photographers");
};

const onHome = async () => {
  await toggleMenu();
  router.push("/");
};

const onAppointment = async () => {
  await toggleMenu();
  router.push("/appointment/list");
}

const onToPay = async () => {
  await toggleMenu();
  router.push("/payment/topay");
}

const onTransaction = async () => {
  await toggleMenu();
  router.push("/payment/transaction");
}

const onProfile = async () => {
  await toggleMenu();
  router.push(`/profile/${user.value.id}`);
};

const onBusy = async () => {
  await toggleMenu();
  router.push("/profile/schedule");
};

const onCompleted = async () => {
  await toggleMenu();
  router.push("/appointment/complete");
};

const onStripe = async () => {
  window.location.href = "https://dashboard.stripe.com";
};

const handleLogout = async () => {
  try {
    await auth.handleLogout();
    onLogoutSuccess();
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div v-if="menuOpen" @click="toggleMenu" onc class="bg-black absolute top-0 left-0 w-screen h-screen"
    :class="menuOpen ? 'opacity-50' : 'opacity-0'"></div>
  <nav class="fixed w-full p-6 bg-transparent">
    <div class="flex items-center justify-end mr-5">
      <!-- Mobile toggle -->
      <button class="md:hidden" @click="toggleMenu">
        <Icon icon="line-md:align-right" style="width: 30; height: inherit" />
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
          <img :src="user.profile" alt="Profile Image" class="w-30 h-30 rounded-full object-cover" />
          <p class="pt-5 text-xl">{{ user.name }}</p>
          <p style="color: #666666">{{ user.role }}</p>
          <!-- <img src="/assets/userpf.jpg" alt="Profile Image" class="w-30 h-30 rounded-full object-cover">
                    <p class="pt-5">Kang</p> -->
        </div>

        <ul class="divide-y-1 mx-3">
          <li>
            <a @click="onHome" class="my-4 inline-block"
              :class="firstSegment == '' ? 'text-red-300' : 'text-black'">Home</a>
          </li>
          <li>
            <a @click="onAppointment" class="my-4 inline-block" :class="firstSegment == 'appointment' && secondSegment != 'complete'
                ? 'text-red-300'
                : 'text-black'
              ">Appointments</a>
          </li>
          <li v-if="user.role == 'Photographer'">
            <a @click="onBusy" class="my-4 inline-block" :class="firstSegment == 'profile' && secondSegment == 'schedule'
                ? 'text-red-300'
                : 'text-black'
              ">My busy time</a>
          </li>
          <li v-if="user.role == 'Photographer'">
            <a @click="onCompleted" class="my-4 inline-block" :class="firstSegment == 'appointment' && secondSegment == 'complete'
                ? 'text-red-300'
                : 'text-black'
              ">History</a>
          </li>
          <li v-if="user.role == 'Photographer'" class="flex flex-row">
            <a @click="onStripe" class="my-4 inline-block"
            >Payment acc.</a>
            <Icon icon="tabler:external-link" style="width: 25; height: inherit" />
          </li>
          <li v-if="user.role == 'Customer'"><a @click="onPhotographer" class="my-4 inline-block"
              :class="firstSegment == 'photographers' ? 'text-red-300' : 'text-black'">Photographers</a>
          </li>
          <li v-if="user.role == 'Customer'"><a @click="onToPay" class="my-4 inline-block"
              :class="firstSegment == 'payment' && secondSegment != 'transaction' ? 'text-red-300' : 'text-black'">To
              Pay</a></li>
          <li><a @click="onTransaction" class="my-4 inline-block"
              :class="firstSegment == 'payment' && secondSegment == 'transaction' ? 'text-red-300' : 'text-black'">Transactions</a>
          </li>
          <li>
            <a @click="onProfile" class="my-4 inline-block" :class="firstSegment == 'profile' && secondSegment != 'schedule'
                ? 'text-red-300'
                : 'text-black'
              ">Profile</a>
          </li>
          <li>
            <NuxtLink
              class="my-8 w-full text-center cta inline-block bg-black hover:bg-black px-3 py-2 rounded text-white"
              @click="handleLogout">Logout</NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </nav>
</template>
