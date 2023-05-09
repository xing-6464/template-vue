<template>
  <div>
    <el-card>
      <template #header>
        活动修改
      </template>
      <el-form :model="volunteerForm" :rules="rules" ref="volunteerFormRef" label-width="100" class="petForm">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="volunteerForm.activityName"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="activityTime">
          <el-date-picker v-model="volunteerForm.activityTime" type="date" placeholder="选择生日" style="width: 100%" />
        </el-form-item>
        <el-form-item label="活动地址" prop="address">
          <el-input v-model="volunteerForm.address"></el-input>
        </el-form-item>
        <el-form-item label="活动评价" prop="remark">
          <el-input v-model="volunteerForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/request';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { formatDate } from '@/utils/utils'
import { useRouter } from 'vue-router';
import { useAppStore } from '../../stores/app';


const props = defineProps<{
  id: string
}>()
// {
//     "activityName": "活动1",
//     "activityTime": "2023-05-03",
//     "address": "活动地址",
//     "remark": "活动说明"
// }

const volunteerForm = ref({
  activityName: '',
  activityTime: new Date(),
  address: '',
  remark: '',
})
const volunteerFormRef = ref<FormInstance>()

const rules = ref<FormRules>({
  activityName: [
    {
      required: true,
      message: '活动名称不能为空',
      trigger: 'blue'
    }
  ],
  activityTime: [
    {
      required: true,
      message: '活动时间不能为空',
      trigger: 'blue'
    }
  ],
  address: [
    {
      required: true,
      message: '活动地址不能为空',
      trigger: 'blue'
    }
  ],
  remark: [
    {
      required: true,
      message: '活动评论不能为空',
      trigger: 'blue'
    }
  ],
})
const router = useRouter()
const appStore = useAppStore()

function initData() {
  http.get(`activity/find/${props.id}`).then(res => {
    volunteerForm.value.activityName = res.data.activityName
    volunteerForm.value.activityTime = res.data.activityTime
    volunteerForm.value.address = res.data.address
    volunteerForm.value.remark = res.data.remark
  })
}

initData()

function onSubmit() {
  volunteerFormRef.value?.validate(valid => {
    if (!valid) return
    const form = {
      ...volunteerForm.value,
      activityTime: formatDate(volunteerForm.value.activityTime)
    }
    http.put(`activity/update/${props.id}`, form).then(res => {
      console.log(res)
      ElMessage.success('活动修改成功')

      router.push('/volunteer/manage')
    }).catch(err => {
      ElMessage.error('活动修改失败')
    })
  })
}

</script>

<style lang="scss" scoped>
.petForm {
  padding: 0 100px;
}
</style>
