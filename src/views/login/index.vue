<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon>
            <User />
          </el-icon>
        </span>
        <el-input placeholder="username" v-model="loginForm.username" name="username" type="text"></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon>
            <Lock />
          </el-icon>
        </span>
        <el-input placeholder="password" v-model="loginForm.password" name="password" :type="passwordText"></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <i class="iconfont" :class="iconEyeClass"></i>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button :loading="loading" style="width: 100%; margin-bottom: 30px;" type="primary"
        @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'
import { validatePassword } from './rules'

export type LoginForm = {
  username: string
  password: string
}

// 数据源
const loginForm = ref<LoginForm>({
  username: 'admin',
  password: 'admin'
})
// 验证规则
const loginRules = ref<FormRules>({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
const router = useRouter()

// 处理密码框文本显示
const passwordText = ref<'password' | 'text'>('password')
const iconEyeClass = computed(() => {
  return passwordText.value === 'text' ? 'icon-eye' : 'icon-no_eye'
})
function onChangePwdType() {
  passwordText.value = passwordText.value === 'password' ? 'text' : 'password'
}

// 登录处理
const loading = ref(false)
const loginFormRef = ref<FormInstance>()
function handleLogin() {
  loginFormRef.value?.validate(valid => {
    if (!valid) return
    loading.value = true
    useUserStore().login(loginForm.value).then((res) => {
      console.log(res)
      useUserStore().setToken(res.data)
      // 跳转
      useUserStore().getUserInfo().then(() => {
        router.push('/')
        loading.value = false
      })
    }).catch(err => {
      console.log(err)
      loading.value = false
    })
  })

}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input__wrapper {
      box-shadow: none !important;
      --el-select-input-focus-border-color: none !important;
      background: transparent !important;
    }

    ::v-deep .el-input {
      height: 47px;
      width: 85%;
      // border: 1px solid rgba(255, 255, 255, 0.1);

      input {
        background: transparent;
        border: none;
        -webkit-appearance: none;
        // border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }

    }

  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>