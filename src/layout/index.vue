<template>
  <div class="app-wrapper">
    <!-- 左侧 -->
    <SideBar class="sidebar-container"></SideBar>
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

<style lang="scss" scoped></style>