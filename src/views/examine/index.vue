<template>
  <Examine v-if="route.path === '/examine/volunteer'" />
  <PetExamine v-else-if="route.path === '/examine/pet'" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import Examine from './Examine.vue'
import PetExamine from './pet-examine.vue'

const route = useRoute()
</script>

<style lang="scss" scoped></style>
