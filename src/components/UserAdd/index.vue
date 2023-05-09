<template>
  <div class="user-add-container">
    <el-card>
      <el-form :model="form" :rules="rules" ref="userAddForm" label-width="120px" class="form">
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
            <el-option label="普通用户" value="user" />
            <el-option label="志愿者" value="volunteer" />
          </el-select>
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
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { useUserStore } from '../../stores/users';
import { formatDate } from '@/utils/utils'
import http from '@/utils/request';
import { ElMessage } from 'element-plus';

// {
//     "username":"test1",
//     "password": "123456",
//     "name":"测试1",
//     "sex":0,
//     "birthDate":"2010-01-01",
//     "phone": "13618584436",
//     "email": "yk123@qq.com",
//     "address": "贵州贵阳",
//     "role":"user"
// }

const initForm = {
  username: '',
  password: '123456',
  name: '',
  sex: 0,
  birthDate: new Date(),
  phone: '',
  email: '',
  address: '',
  role: 'user',
}
const userAddForm = ref<FormInstance>()
const form = ref(initForm)

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

function onSubmit() {
  userAddForm.value?.validate(vaild => {
    if (!vaild) return
    console.log(form.value)
    const submitForm = {
      ...form.value,
      birthDate: formatDate(form.value.birthDate)
    }
    http.post('sys/user/insert', submitForm).then((res) => {
      console.log(res)
      ElMessage.success('添加成功')
    }).catch((err) => {
      ElMessage.error('添加失败')
    })
  })
}

function onReset() {
  userAddForm.value?.resetFields()
}

</script>

<style lang="scss" scoped>
.form {
  padding: 0 100px;
}
</style>