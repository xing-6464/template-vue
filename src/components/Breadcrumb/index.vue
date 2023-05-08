<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <TransitionGroup name="breadcrumb">

      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{ item.meta.title }}</span>
        <!-- 可以点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{ item.meta.title }}</span>

      </el-breadcrumb-item>

    </TransitionGroup>
  </el-breadcrumb>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue'
import { useRoute, type RouteLocationMatched, useRouter } from 'vue-router';
import { useGetters } from '../../stores/getter';
import { storeToRefs } from 'pinia';

const breadcrumbData = ref<Array<RouteLocationMatched>>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}
const getters = useGetters()
const { styleVal } = storeToRefs(getters)
const linkHoverColor = ref(styleVal.value.menuBg)

// 监听 路由变化
const route = useRoute()
watch(route, () => {
  getBreadcrumbData()
}, {
  immediate: true
})

const router = useRouter()
function onLinkClick(item: RouteLocationMatched) {
  router.push(item.path)
}


</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 30px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }

  .redirect:hover {
    color: v-bind(linkHoverColor);
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>