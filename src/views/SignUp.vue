<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <el-card class="w-96">
      <h1>用户登录注册</h1>
      <el-form ref="form" :model="user" :rules="rules" label-width="100px">
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loginLoading" type="primary" @click="login">登录</el-button>
          <el-button :loading="signLoading" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import useTencentCloud from '@/hooks/useTencentCloud'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: 'SignUp',
  setup () {
    const {
      signIn,
      signUp
    } = useTencentCloud()
    const user = reactive({
      email: '',
      password: ''
    })
    const signLoading = ref(false)
    const loginLoading = ref(false)
    const form = ref()
    const router = useRouter()
    const login = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          try {
            loginLoading.value = true
            const response = await signIn(user.email, user.password)
            if (response.user) {
              loginLoading.value = false
              await router.replace({
                name: 'Index'
              })
            }
          } catch (error) {
            loginLoading.value = false
            ElMessage.error(JSON.parse(error.message).msg)
          }
        }
      })
    }
    const register = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          try {
            signLoading.value = true
            const response = await signUp(user.email, user.password)
            if (response) {
              signLoading.value = false
              ElMessage.success(`注册邮件已发送到${user.email},请注意查收`)
            }
          } catch (error) {
            signLoading.value = false
            ElMessage.error(JSON.parse(error.message).msg)
          }
        }
      })
    }
    const rules = reactive({
      email: [{
        required: true,
        message: '邮件地址不能为空',
        trigger: 'blur'
      }, {
        type: 'email',
        message: '邮箱格式不正确',
        trigger: 'blur'
      }],
      password: [{
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }]
    })
    return {
      user,
      login,
      register,
      rules,
      form,
      loginLoading,
      signLoading
    }
  }
}
</script>

<style scoped>

</style>
