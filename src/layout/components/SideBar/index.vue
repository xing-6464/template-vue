<template>
  <div class="">
    <div class="logo-container">
      <!-- <el-avatar :size="44" shape="square" src=""></el-avatar> -->
      <h1 style="color: aliceblue;">后台管理系统</h1>
    </div>
    <el-scrollbar>
      <SideBarMenu></SideBarMenu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SideBarMenu from './SideBarMenu.vue'

</script>

<style lang="scss" scoped>
.logo-container {
  text-align: center;
  margin: 16px 0;
}
</style>