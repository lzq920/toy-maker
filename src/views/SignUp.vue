<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <el-card class="w-96">
      <h1>ToyMaker Signup</h1>
      <el-form v-model="user">
        <el-form-item label="Email">
          <el-input type="text" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reactive } from 'vue'
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
    const router = useRouter()
    const login = async () => {
      try {
        const response = await signIn(user.email, user.password)
        if (response.user) {
          await router.replace({
            name: 'Index'
          })
        }
      } catch (error) {
        ElMessage.error(JSON.parse(error.message).msg)
      }
    }
    const register = async () => {
      try {
        const response = await signUp(user.email, user.password)
        if (response) {
          ElMessage.success(`注册邮件已发送到${user.email},请注意查收`)
        }
      } catch (error) {
        ElMessage.error(JSON.parse(error.message).msg)
      }
    }
    return {
      user,
      login,
      register
    }
  }
}
</script>

<style scoped>

</style>
