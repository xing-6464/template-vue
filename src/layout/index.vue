<template>
  <div class="app-wrapper">
    <!-- 左侧 -->
    <SideBar class="sidebar-container" :style="{ backgroundColor: '#304156' }"></SideBar>
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
      </div>
      <!-- 内容区 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
import AppMain from './components/AppMain.vue'
import SideBar from './components/SideBar/index.vue'

</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>