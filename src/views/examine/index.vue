<template>
  <div>
    <el-card>
      <template #header>
        {{ route.path === '/examine/volunteer' ? '志愿者审批' : '宠物领养审批' }}
      </template>
      <div class="body">
        <el-input label="审批id" placeholder="请输入审批的id" v-model="inputRef"
          style="width: 40%;margin-bottom: 20px;"></el-input>
        <el-radio-group v-model="radioRef" class="ml-4">
          <el-radio :label="0" size="large">通过</el-radio>
          <el-radio :label="1" size="large">不通过</el-radio>
        </el-radio-group>
        <el-button @click="onSubmit" style="width: 30%; margin: 40px;">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/request'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';

const route = useRoute()
const inputRef = ref('')
const radioRef = ref(0)

function onSubmit() {
  console.log(inputRef.value, radioRef.value)
  if (route.path === '/examine/volunteer') {
    http.put(`sys/approveVolunteerApply/${radioRef.value}`, {
      "uid": inputRef.value
    }).then((res) => {
      console.log(res)
      ElMessage.success('审批成功')
    }).catch((err) => {
      console.log(err)
      ElMessage.error('审批失败')
    })
  } else {
    http.put(`sys/approveAdoptApply/${radioRef.value}`, {
      "pid": inputRef.value
    }).then((res) => {
      console.log(res)
      ElMessage.success('审批成功')
    }).catch((err) => {
      console.log(err)
      ElMessage.error('审批失败')
    })
  }
}
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  align-items: center;
}
</style>
