<template>
  <div class="login-pannel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox label="记住密码" size="large" v-model="isKeepPassword" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handelLoginCLick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    //1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>() //ref组件
    const phoneRef = ref<InstanceType<typeof LoginPhone>>() //ref组件
    const currentTab = ref<string>('account')

    //2.定义方法
    const handelLoginCLick = () => {
      if (currentTab.value == 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      handelLoginCLick,
      accountRef,
      currentTab,
      phoneRef
    }
  }
})
</script>

<style lang="less" scoped>
.login-pannel {
  width: 320px;
  padding-bottom: 120px;
}
.title {
  text-align: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
