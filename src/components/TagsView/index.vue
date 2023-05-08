<template>
  <div class="tags-view-container">
    <router-link v-for="(tag, index) in tagsViewList" :key="tag.fullPath" class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''" :to="{ path: tag.fullPath }" :style="{
        backgroundColor: isActive(tag) ? styleVal.menuBg : '',
        borderColor: isActive(tag) ? styleVal.menuBg : ''
      }" @contextmenu.prevent="openMenu($event, index)">
      {{ tag.title }}

      <el-icon v-show="!isActive(tag)" class="el-icon-close" @click.prevent.stop="onCloseClick">
        <Close />
      </el-icon>
    </router-link>

    <ContextMenu v-show="visible" :index="selectIndex" :style="menuStyle"></ContextMenu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useGetters } from '@/stores/getter';

import ContextMenu from './contextMenu.vue';

const visible = ref<boolean>(false)
const menuStyle = ref({
  left: '',
  top: ''
})
const selectIndex = ref(0)
const appStore = useAppStore()
const getter = useGetters()
const { tagsViewList } = storeToRefs(appStore)
const { styleVal } = storeToRefs(getter)
const route = useRoute()

function isActive(tag: any) {
  return tag.path === route.path
}

function onCloseClick() {

}

function openMenu(e: MouseEvent, index: number) {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  // .tags-view-wrapper {
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      color: #fff;

      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      // line-height: 10px;
      vertical-align: middle;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }

    // }
  }
}
</style>