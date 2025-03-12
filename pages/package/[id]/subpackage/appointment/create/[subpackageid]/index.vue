<script setup lang="ts">
import { ref, computed } from "vue";
import type {  DayName, SubpackageResponse } from "~/types/api";

const route = useRoute();
let {date, start, end} = route.query;
date = date as string;
start = start as string;
end = end as string;
const api = useApiStore();

const id = route.params.id as string;
const subpackageid = route.params.subpackageid as string;
const packageName = ref("");
const subpackageName = ref("");

onMounted(async () => {
    console.log({id, subpackageid, date, start, end});
    const response1 = await api.fetchPackage(id);
    packageName.value = response1.title;
    
    const response2 = await api.fetchSubpackage(subpackageid);
    subpackageName.value = response2.title;
})

</script>

<template>
    <AppointmentForm :subpackageId="subpackageid" :packageName="packageName" :subpackageName="subpackageName" :date="date" :startTime="start" :endTime="end" />
</template>