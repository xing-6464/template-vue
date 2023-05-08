import { useRoute } from 'vue-router';
import router from '@/router';
<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRightClick">关闭右侧</li>
    <li @click="onCloseOtherClick">关闭其他</li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app';


type ContextMenuProps = {
  index: number
}

const props = defineProps<ContextMenuProps>()
const router = useRouter()

function onRefreshClick() {
  router.go(0)
}
function onCloseRightClick() {
  console.log(props.index)
  useAppStore().removeTagsView({
    type: 'right',
    index: props.index
  })
}

function onCloseOtherClick() {
  console.log(props.index)
  useAppStore().removeTagsView({
    type: 'other',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>