<template>
  <div>
    <el-card>
      <template #header>
        修改宠物信息
      </template>
      <el-form :model="petForm" :rules="rules" ref="petFormRef" label-width="100" class="petForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="petForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="petForm.type" placeholder="请选择角色宠物类型">
            <el-option label="猫" value="猫" />
            <el-option label="狗" value="狗" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="petForm.sex">
            <el-radio :label="0">雄性</el-radio>
            <el-radio :label="1">雌性</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="评论" prop="remark">
          <el-input v-model="petForm.remark" :row="2" type="textarea"></el-input>
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
import { useRouter } from 'vue-router';

// {
//     "name":"小猫猫",
//     "type":"猫",
//     "sex": 0,
//     "remark":"备注",
//     "state": 0
// }

const props = defineProps<{
  id: string
}>()

const petForm = ref({
  name: '',
  type: '猫',
  sex: 0,
  remark: '',
})
const petFormRef = ref<FormInstance>()
const router = useRouter()

const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blue'
    }
  ],
})

function getInitData() {
  http.get(`pet/find/${props.id}`).then((res) => {
    petForm.value.type = res.data.type
    petForm.value.name = res.data.name
    petForm.value.sex = res.data.sex
    petForm.value.remark = res.data.remark
  })
}

getInitData()

function onSubmit() {
  petFormRef.value?.validate(valid => {
    if (!valid) return
    http.put(`pet/update/${props.id}`, petForm.value).then(res => {
      console.log(res)
      ElMessage.success('宠物修改成功')
      router.push('/pet/manage')
    }).catch(err => {
      ElMessage.error('宠物修改失败')
    })
  })
}


</script>

<style lang="scss" scoped>
.petForm {
  padding: 0 100px;
}
</style>