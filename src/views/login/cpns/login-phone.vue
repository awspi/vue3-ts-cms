<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phone" :rules="rules">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    const store = useStore()
    const loginAction = () => {
      console.log('phone login')
      store.dispatch('login/phoneLoginAction', { ...phone })
    }
    return {
      rules,
      phone,
      loginAction
    }
  }
})
</script>
<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
