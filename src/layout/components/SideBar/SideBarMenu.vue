<template>
  <el-menu :unique-opened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <SideBarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import SideBarItem from './SideBarItem.vue'
import { generateMenus } from '@/utils/router'

const router = useRouter()
const routes = computed(() => {
  return generateMenus(router.options.routes)
})

</script>

<style lang="scss"></style>
