<template>
  <el-menu :unique-opened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Location />
        </el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon>
        <Location />
      </el-icon>
      <template #title>导航4</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
