<template>
  <div class="pet-info-container">
    <el-card class="pet-info-box">
      <template #header>
        <h2 class="title">宠物信息</h2>
      </template>
      <div class="header">
        <el-descriptions :column="2" border class="">
          <el-descriptions-item label="id">
            {{ detailData.id }}
          </el-descriptions-item>
          <el-descriptions-item label="昵称">
            {{ detailData.name }}
          </el-descriptions-item>
          <el-descriptions-item label="类型">
            {{ detailData.type }}
          </el-descriptions-item>
          <el-descriptions-item label="性别">
            {{ detailData.sex === 0 ? '雄性' : '雌性' }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            {{ detailData.state }}
          </el-descriptions-item>
          <el-descriptions-item label="remark" :span="2">
            {{ detailData.remark }}
          </el-descriptions-item>

        </el-descriptions>
        <el-image class="image" :src="(detailData.photo as string)"></el-image>
      </div>

      <div class="body">

        <el-image class="image image-icon" v-for="item in detailData.photos" :key="item.photo"
          :src="item.photo"></el-image>
      </div>
      <!-- 尾部  -->
    </el-card>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/request'
import { ref } from 'vue'


const props = defineProps<{
  id: string
}>()

const detailData = ref<{
  photos?: any[]
  [index: string]: string | number | any[] | undefined
}>({})
async function getUserDetail() {
  const res = await http.get(`pet/find/${props.id}`)
  detailData.value = res.data
  console.log(res)
}
getUserDetail()

</script>

<style lang="scss" scoped>
.pet-info-box {
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

    .image {
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
    display: flex;
    margin-top: 20px;

    ::v-deep .el-image__inner {
      width: 73% !important;
    }
  }

}
</style>