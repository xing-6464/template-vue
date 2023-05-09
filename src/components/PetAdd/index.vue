<template>
  <div>
    <el-card>
      <template #header>
        添加宠物
      </template>
      <el-form :model="petForm" :rules="rules" ref="petFormRef" label-width="100" class="petForm">
        <el-form-item label="名字" prop="name">
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
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="onReset">重置</el-button>
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

// {
//     "name":"小猫猫",
//     "type":"猫",
//     "sex": 0,
//     "remark":"备注",
//     "state": 0
// }

const petForm = ref({
  name: '',
  type: '猫',
  sex: 0,
  remark: '',
  state: 0
})
const petFormRef = ref<FormInstance>()

const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blue'
    }
  ],
})

function onSubmit() {
  petFormRef.value?.validate(valid => {
    if (!valid) return
    http.post('pet/insert', petForm.value).then(res => {
      console.log(res)
      ElMessage.success('宠物添加成功')
      petFormRef.value?.resetFields()
    }).catch(err => {
      ElMessage.error('宠物添加失败')
    })
  })
}

function onReset() {
  petFormRef.value?.resetFields()
}

</script>

<style lang="scss" scoped>
.petForm {
  padding: 0 100px;
}
</style>