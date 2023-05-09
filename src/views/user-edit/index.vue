<template>
  <div class="user-edit-container">
    <el-card>
      <template #header>
        用户修改
      </template>
      <el-form :model="form" :rules="rules" ref="userEditForm" label-width="120px" class="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birthDate">
          <el-date-picker v-model="form.birthDate" type="date" placeholder="选择生日" style="width: 100%" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
            <el-option label="志愿者" value="volunteer" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/request';
import { formatDate } from '@/utils/utils';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  id: string
}>()

const initData = ref<{
  [index: string]: string | number
}>({})
const form = ref({
  username: initData.value.username,
  password: initData.value.password,
  name: initData.value.name,
  sex: initData.value.sex,
  birthDate: initData.value.birthDate,
  phone: initData.value.phone,
  email: initData.value.email,
  address: initData.value.address,
  role: initData.value.role
})
const userEditForm = ref<FormInstance>()

const rules = ref<FormRules>({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: 'blue'
    }
  ],
  name: [
    {
      required: true,
      message: "姓名不能为空",
      trigger: 'blue'
    }
  ],
  birthDate: [
    {
      required: true,
      message: "生日不能为空",
      trigger: 'blue'
    }
  ],
  phone: [
    {
      required: true,
      message: "手机号码不能为空",
      trigger: 'blue'
    }
  ],
  email: [
    {
      required: true,
      message: "邮箱不能为空",
      trigger: 'blue'
    }
  ],
  address: [
    {
      required: true,
      message: "地址不能为空",
      trigger: 'blue'
    }
  ]
})

function getInitData() {
  http.get(`sys/user/find/${props.id}`).then((res) => {
    initData.value = res.data
    form.value.username = initData.value.username
    form.value.name = initData.value.name
    form.value.sex = initData.value.sex
    form.value.birthDate = initData.value.birthDate
    form.value.phone = initData.value.phone
    form.value.email = initData.value.email
    form.value.address = initData.value.address
    form.value.role = initData.value.role
  })
}

getInitData()

function onSubmit() {
  userEditForm.value?.validate(vaild => {
    if (!vaild) return
    console.log(form.value)
    const submitForm = {
      ...form.value,
      birthDate: formatDate(form.value.birthDate)
    }
    http.put(`sys/user/update/${props.id}`, submitForm).then((res) => {
      console.log(res)
      ElMessage.success('修改成功')
    }).catch(err => {
      console.log(err)
      ElMessage.error('修改失败')
    })
  })
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 200px;
}
</style>