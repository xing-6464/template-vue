<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import { isTags } from '../../utils/tags';
import { useAppStore } from '@/stores/app';

const route = useRoute()
watch(route, (to, form) => {
  if (!isTags(to.path)) return
  const { fullPath, meta, name, params, path, query } = to
  useAppStore().addTagsViewList({
    fullPath,
    meta,
    name,
    params,
    path,
    query,
    title: getTitle(to)
  })
}, {
  immediate: true,
})

function getTitle(route: RouteLocationNormalizedLoaded) {
  let title = ''

  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title!
  }

  return title
}

</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>