<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30">PI</el-avatar>
        <span class="name">{{ userName }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Lock /></el-icon>
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click="quitClick">
            <el-icon><CircleClose /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import LocalCache from '@/utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const userName = computed(() => store.state.login.userInfo.name)

    const router = useRouter()
    const quitClick = () => {
      LocalCache.deleteCache('token')
      router.push('/main')
    }
    return { userName, quitClick }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.name {
  padding: 0 10px;
}
</style>
