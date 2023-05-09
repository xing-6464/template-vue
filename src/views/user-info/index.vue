<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printObj">打印</el-button>
    </el-card>
    <el-card class="user-info-box" id="userInfoBox">
      <!-- 标题 -->
      <h2 class="title">用户信息</h2>
      <!-- 头部 -->
      <div class="header">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="姓名">
            {{ detailData.name }}
          </el-descriptions-item>
          <el-descriptions-item label="性别">
            {{ detailData.sex === 0 ? '男' : '女' }}
          </el-descriptions-item>

          <el-descriptions-item label="生日">
            {{ detailData.birthDate }}
          </el-descriptions-item>

          <el-descriptions-item label="手机号">
            {{ detailData.phone }}
          </el-descriptions-item>

          <el-descriptions-item label="邮箱">
            {{ detailData.email }}
          </el-descriptions-item>

          <el-descriptions-item label="地址">
            {{ detailData.address }}
          </el-descriptions-item>

          <el-descriptions-item label="角色" :span="2">
            <el-tag>{{ detailData.role === 'admin' ? '管理员' : detailData.role === 'user' ? '普通用户' : '志愿者' }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-image class="avatar" :src="(detailData.photo as string)"></el-image>
      </div>

      <div class="body">
        <el-descriptions direction="vertical" border :column="2">
          <el-descriptions-item label="用户名">
            {{ detailData.username }}
          </el-descriptions-item>
          <el-descriptions-item label="密码">
            {{ detailData.password }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 尾部  -->
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import http from '@/utils/request';
import { ref } from 'vue';


const props = defineProps<{
  id: string
}>()

const detailData = ref<{
  [index: string]: string | number
}>({})
async function getUserDetail() {
  const res = await http.get(`sys/user/find/${props.id}`)
  detailData.value = res.data
  console.log(res)
}
getUserDetail()

// 打印
const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'user-info-admin',
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback() {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}

.user-info-box {
  width: 1024px;
  height: calc(100vh - 220px);
  margin: 0 auto;

  .title {
    text-align: center;
    margin-bottom: 18px;
  }

  .header {
    display: flex;

    ::v-deep .el-descriptions {
      flex-grow: 1;
    }

    .avatar {
      width: 133px;
      box-sizing: border-box;
      padding: 10px 10px;
      border: 1px solid #ebeef5;
      border-left: none;
    }

    .remark {
      margin-right: 12px;
    }
  }

  .body {
    ul {
      list-style: none;

      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }

  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
