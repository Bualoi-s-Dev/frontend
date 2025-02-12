<script setup lang="ts">
import Button from "@/components/Button.vue"
import profilePic from "@/assets/profilePicture.png"
import axios from "axios";
import workImage from "@/assets/workImage.png";
import workImage2 from "@/assets/workImage2.png";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue/dist/iconify.js";

const router = useRouter();
const user = ref({ name: '', description: '', location: '', profile: ''})
const data = ref<any>(null)
const packages = ref([])

const varToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMjUwZDIyYTkzODVmYzQ4NDJhYTU2YWJhZjUzZmU5NDcxNmVjNTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2UtMi03NmY2MiIsImF1ZCI6InNlLTItNzZmNjIiLCJhdXRoX3RpbWUiOjE3MzkzNjY1OTYsInVzZXJfaWQiOiJRbHVCQjNIdENlTVF5QldVTUtnNDVlbWxJREMzIiwic3ViIjoiUWx1QkIzSHRDZU1ReUJXVU1LZzQ1ZW1sSURDMyIsImlhdCI6MTczOTM2NjU5NiwiZXhwIjoxNzM5MzcwMTk2LCJlbWFpbCI6ImRldmR1YW5nZGFvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZXZkdWFuZ2Rhb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.XToKJg4Qh-uLRXD4-oyNMpIgFSDYCTWsSXYOTa2YPmZxX6RqmIgOUcPbBwAuCb0zNqekbTz1CjjgQx2WvnYP74r0BMVuQUMB5KdTT0lwBkJUL1Rs9Y-f-LCxelHyCC6BOf8W6Qp3LV9a0owrYdFjTH282pR2QClgHsFdoEF-2sLIz2SZyScGjFS434LEPVkeVFCC0pk_vMLwagy5IUDCC-TxbsqrIy1Umd4ZXdTmzEAwpNPCDnfPr_H-E71clGUc8BsTqOxGLrrth6MR3reUjMGkvbdhXtru2NwW-tovxEKS4WUxiar466BO4gscPFfCmFEOF1Z5Crqf5_eXzodXUg'
const fetchUserProfile = async() => {
    axios.get('http://localhost:8080/user/profile', {
      
        headers: {
          Authorization: 'Bearer ' + varToken
        }
      })
      .then(response => {
        console.log(response.data)
        user.value.name = response.data.name
        user.value.location = response.data.location
        user.value.profile = 'https://pub-58a5559d12b34ac5999431d8764da7fa.r2.dev' + response.data.profile
      })
      .catch(error => {
        error = error.response ? error.response.data : error.message;  // Storing error in data
      });
}

const fetchUserPackage = async() => {
    axios.get('http://localhost:8080/package/', {
        headers: {
          Authorization: 'Bearer ' + varToken
        }
      })
      .then(response => {
        packages.value = response.data;
        console.log(response.data)
      })
      .catch(error => {
        error = error.response ? error.response.data : error.message;  // Storing error in data
      });
}

onMounted(()=>{
  fetchUserPackage();
  fetchUserProfile();
})


</script>

<template>
    <div class="mt-10">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <ProfileImage :src="user.profile"/>
                <h2 class="text-xl font-semibold mt-4">{{ user.name }}</h2>
                <p class="text-sm text-red-900">{{ user.description }}</p>
                <p class="text-sm text-red-900 mb-2">{{ user.location }}</p>
                <Button @click="router.push('/package/editprofile')" width="w-80 h-10" text-options="text-white text-right text-sm">Edit Profile</Button>
                <Button width="w-80 h-10" text-options="mt-2 text-white text-right text-sm">View All Packages</Button>
            </div>
            <h2 class="ml-6 mt-6">Work showcase</h2>
            <WorkList :data="packages"/>
            <div>
                <div class="flex items-center ml-5 mb-3">
                    <Button middle-icon="material-symbols:mail-outline-sharp" icon-color="black" height="h-10" bg-color="bg-button-profile"></Button>
                    <div class="flex-col ml-4">
                        <p>Contact Information</p>
                        <p class="text-sm text-primary">Find their contact details!</p>
                    </div>
                </div>
                <div class="flex items-center ml-5">
                    <Button middleIcon="icon-park-twotone:thumbs-up" icon-color="black" height="h-10" bg-color="bg-button-profile"></Button>
                    <div class="flex-col ml-4">
                        <p>Review</p>
                        <p class="text-sm text-primary">Check their reviews now</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col m-6 gap-5">
              <h1 class="font-semibold">Other accessories</h1>
              <div class="flex flex-row justify-between">
                <p>More Information</p>
                <Icon icon="mingcute:right-line"/>
              </div>
              <div class="flex flex-row justify-between">
                <p>History</p>
                <Icon icon="mingcute:right-line"/>
              </div>
              <div class="flex flex-row justify-between">
                <p>Support</p>
                <Icon icon="mingcute:right-line"/>
              </div>
            </div>
        </div>
    </div>
</template>