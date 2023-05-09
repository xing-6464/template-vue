<template>
  <div>
    <el-card>
      <template #header>
        轮播图添加
      </template>
      <div>
        <el-input label="图片名" v-model="name"></el-input>

        <el-button type="primary" @click="onSubmit">添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/request';
import { ref } from 'vue'
import { ElMessage } from 'element-plus';

const name = ref('')
const pictureData = ref({
  file: ''
})


function onSubmit() {
  http.post(`rchart/insert/${name.value}`, pictureData.value).then(res => {
    console.log(res)
    ElMessage.success('轮播图添加成功')
  }).catch(err => {
    ElMessage.error('轮播图添加失败')
  })
}

</script>

<style lang="scss" scoped>
.petForm {
  padding: 0 100px;
}
</style>