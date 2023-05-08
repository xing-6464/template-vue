<template>
  <el-menu :default-active="activeMenu" :unique-opened="true" :background-color="styleVal.menuBg"
    :text-color="styleVal.menuText" :active-text-color="styleVal.menuActiveText" router>
    <SideBarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { generateMenus } from '@/utils/router'
import SideBarItem from './SideBarItem.vue'
import { useGetters } from '../../../stores/getter';

const router = useRouter()
const routes = computed(() => {
  return generateMenus(router.options.routes)
})
const { styleVal } = useGetters()

// 默认激活
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})


</script>

<style lang="scss"></style>
