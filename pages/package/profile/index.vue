<script setup lang="ts">
import Button from "@/components/Button.vue"
import plusIcon from "@/assets/icons/plus.svg"
</script>

<template>
    <div class="ml-6 mt-6 flex flex-row gap-3 text-xl">
        <Button :left-icon="plusIcon" :right-icon="plusIcon" >Primary</Button>
    </div>
</template>