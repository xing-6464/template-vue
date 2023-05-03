<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input placeholder="username" name="username" type="text"></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input placeholder="password" name="password"></el-input>
        <span class="svg-pwd">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button style="width: 100%; margin-bottom: 30px;" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Avatar } from '@element-plus/icons-vue'

</script>

<style lang="scss" scoped></style>