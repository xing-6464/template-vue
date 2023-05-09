<template>
  <UserAdd v-if="route.path === '/user/import'" />
  <PetAdd v-else-if="route.path === '/pet/import'" />
  <VolunteerAdd v-else-if="route.path === '/volunteer/import'" />
  <PictureAdd v-else-if="route.path === '/picture/import'" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import UserAdd from '@/components/UserAdd/index.vue';
import PetAdd from '@/components/PetAdd/index.vue';
import VolunteerAdd from '@/components/VolunteerAdd/index.vue';
import PictureAdd from '@/components/PictureAdd/index.vue';

const route = useRoute()
console.log(route.path)
</script>

<style lang="scss" scoped></style>