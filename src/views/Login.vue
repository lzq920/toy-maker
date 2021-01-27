<template>
  <div class="h-screen w-screen flex justify-center items-center random-bg">
    <el-card class="w-96 h-96">
      <template #header>
        <div>个人登录</div>
      </template>
      <el-form :model="account" ref="accountRef" :rules="loginRules">
        <el-form-item label="" prop="email">
          <el-input v-model="account.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="account.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, inject, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  setup () {
    const cloud = inject('cloud')
    const isLogin = ref(false)
    const accountRef = ref(null)
    const router = useRouter()
    const account = reactive({
      email: '',
      password: ''
    })
    const loginRules = {
      email: [
        {
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    }
    const login = async () => {
      accountRef.value.validate(async (valid) => {
        if (valid) {
          try {
            const user = await cloud
              .auth()
              .signInWithEmailAndPassword(account.email, account.password)
            if (user) {
              isLogin.value = await cloud.auth().getLoginState()
              router.push({
                name: 'Home'
              })
            }
          } catch (error) {
            ElMessage.error('邮箱地址或密码不正确')
          }
        }
      })
    }
    onMounted(async () => {
      isLogin.value = await cloud.auth().getLoginState()
    })
    return {
      isLogin,
      account,
      login,
      loginRules,
      accountRef
    }
  }
}
</script>

<style lang="scss" scoped>
.random-bg {
  background: url(https://source.unsplash.com/random);
  background-size: cover;
}
</style>
