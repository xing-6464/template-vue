<template>
  <div class="profile-container">
    <el-card class="card">
      <template #header>
        管理员信息
      </template>
      <div class="card-body">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-avatar shape="square" :size="100" :src="(userInfo.photo as string)" />
          </el-col>
          <el-col :span="16">
            <div class="box-center">
              <div>{{ userInfo.sex === 0 ? '男' : '女' }}</div>
              <div>{{ userInfo.name }}</div>
              <div>{{ userInfo.address }}</div>
              <div>{{ userInfo.email }}</div>
              <div>{{ userInfo.phone }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts' setup>
import { } from 'vue'
import { useUserStore } from '@/stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<style lang="scss" scoped>
.card {
  min-height: calc(100vh - 50px - 43px - 40px);
}

.box-center {
  div {
    margin-top: 16px;
    font-size: 20px;
    color: #666;
  }
}
</style>
