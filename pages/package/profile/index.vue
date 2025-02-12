<script setup lang="ts">
import Button from "@/components/Button.vue"
import plusIcon from "@/assets/icons/plus.svg"
import profilePic from "@/assets/profilePicture.png"
</script>

<template>
    <div class="mt-10">
        <div class="flex flex-row items-center">
            <img :src="profilePic" class="rounded-full"/>
        </div>
        <WorkList/>
    </div>
</template>